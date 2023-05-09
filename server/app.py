from flask import Flask, request, jsonify, session
from flask_migrate import Migrate
from models import db, User, Article, Category
from flask_bcrypt import Bcrypt


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///development.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
migrate = Migrate(app, db)
db.init_app(app)
bcrypt = Bcrypt(app)

app.secret_key = b'Y\xf1Xz\x00\xad|eQ\x80t \xca\x1a\x10K'

def auth():
    user_id = session['user_id']
    user = User.query.get(user_id)
    if not user:
        return {'Error': 'Not logged in'}, 401
    return user

#! USER ROUTES

@app.get('/users')
def get_users():
    try:
        users = User.query.all()
        return jsonify([user.to_dict() for user in users]), 200
    except:
        return {'Error': '404: Request not found'}, 404

@app.get('/users/<int:id>')
def get_user(id):
    try:
        user = User.query.get(id)
        return jsonify(user.to_dict_2()), 200
    except:
        return {'Error': '404: Request not found'}, 404

@app.get('/check_session')
def check_session():
    user = auth()
    return jsonify(user.to_dict()), 200

@app.post('/users')
def add_user():
    try:
        data = request.json
        password_hash = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        user = User(
            name=data['name'],
            username=data['username'],
            password=password_hash
        )
        db.session.add(user)
        db.session.commit()
        session['user_id'] = user.id
        return jsonify(user.to_dict()), 201
    except ValueError:
        return {'Error': '400: Invalid input'}, 400
    except:
        return {'Error': '404: Request not found'}, 404

@app.post('/login')
def login():
    data = request.json
    user = User.query.where(User.username == data['username']).first()
    if user and bcrypt.check_password_hash(user.password, data['password']):
        session['user_id'] = user.id
        return user.to_dict(), 201
    else:
        return {'Message': "Invalid username or password"}, 401

@app.patch('/users/<int:id>')
def edit_user(id):
    try:
        data = request.json

        for key in data:
            if key == 'password':
                if data[key] != data[key].capitalize() or len(data[key]) < 8:
                    return {'Error': '400: Invalid input'}, 400

        User.query.where(User.id==id).update(data)
        user = User.query.get(id)
        db.session.commit()
        return jsonify(user.to_dict()), 200
    except:
        return {'Error': '404: Request not found'}, 404

@app.delete('/users/<int:id>')
def delete_user(id):
    try:
        user = User.query.get(id)
        user_name = user.name
        db.session.delete(user)
        db.session.commit()
        return jsonify(f'{user_name}\'s account was successfully deleted'), 200
    except:
        return {'Error': '404: Request not found'}, 404

@app.delete('/logout')
def logout():
    session.pop('user_id')
    return {}, 204

#! ARTICLE ROUTES

@app.get('/articles')
def get_articles():
    try:
        articles = Article.query.all()
        return jsonify([article.to_dict() for article in articles]), 200
    except:
        return {'Error': '404: Request not found'}, 404

@app.get('/articles/<int:id>')
def get_article(id):
    try:
        article = Article.query.get(id)
        return jsonify(article.to_dict()), 200
    except:
        return {'Error': '404: Request not found'}, 404

@app.post('/articles')
def add_article():
    try:
        article = Article(**request.json)
        db.session.add(article)
        db.session.commit()
        return jsonify(article.to_dict()), 201
    except ValueError:
        return {'Error': '400: Invalid input'}, 400
    except:
        return {'Error': '404: Request not found'}, 404

@app.patch('/articles/<int:id>')
def edit_article(id):
    try:
        data = request.json
        Article.query.where(Article.id==id).update(data)
        article = Article.query.get(id)
        db.session.commit()
        return jsonify(article.to_dict()), 200
    except:
        return {'Error': '404: Request not found'}, 404

@app.delete('/articles/<int:id>')
def delete_articles(id):
    try:
        article = Article.query.get(id)
        article_title = article.title
        db.session.delete(article)
        db.session.commit()
        return jsonify(f'{article_title} was successfully deleted'), 200
    except:
        return {'Error': '404: Request not found'}, 404

#! CATEGORY ROUTES

@app.get('/categories')
def get_categories():
    try:
        categories = Category.query.all()
        return jsonify([category.to_dict() for category in categories]), 200
    except:
        return {'Error': '404: Request not found'}, 404

@app.get('/categories/<int:id>')
def get_category(id):
    try:
        category = Category.query.get(id)
        return jsonify(category.to_dict_2()), 200
    except:
        return {'Error': '404: Request not found'}, 404

@app.post('/categories')
def add_category():
    try:
        category = Category(**request.json)

        categories = Category.query.all()
        for cat in categories:
            if cat.name == category.name:
                return {'Error': '400: Invalid input'}, 400

        db.session.add(category)
        db.session.commit()
        return jsonify(category.to_dict()), 201
    except ValueError:
        return {'Error': '400: Invalid input'}, 400
    except:
        return {'Error': '404: Request not found'}, 404

@app.patch('/categories/<int:id>')
def edit_category(id):
    try:
        data = request.json

        categories = Category.query.all()
        for cat in categories:
            if cat.name == data['name']:
                return {'Error': '400: Invalid input'}, 400
        if data['name'] == '':
            return {'Error': '400: Invalid input'}, 400

        Category.query.where(Category.id==id).update(data)
        category = Category.query.get(id)
        db.session.commit()
        return jsonify(category.to_dict()), 200
    except:
        return {'Error': '404: Request not found'}, 404

@app.delete('/categories/<int:id>')
def delete_category(id):
    try:
        category = Category.query.get(id)
        category_name = category.name
        db.session.delete(category)
        db.session.commit()
        return jsonify(f'{category_name} was successfully deleted'), 200
    except:
        return {'Error': '404: Request not found'}, 404

if __name__ == '__main__':
    app.run(port=3001, debug=True)