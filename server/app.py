from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from models import db, User, Article, Category

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///development.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app, origins=['*'])
migrate = Migrate(app, db)
db.init_app(app)

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

@app.post('/users')
def add_user():
    try:
        user = User(**request.json)
        db.session.add(user)
        db.session.commit()
        return jsonify(user.to_dict()), 201
    except ValueError:
        return {'Error': '400: Invalid input'}, 400
    except:
        return {'Error': '404: Request not found'}, 404

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

if __name__ == '__main__':
    app.run(port=3001, debug=True)