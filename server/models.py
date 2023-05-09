from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy


db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    username = db.Column(db.String, nullable=False, unique=True)
    password = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

    articles = db.relationship('Article', backref='user')
    categories = association_proxy('articles', 'category')

    @validates('password')
    def validate(self, key, value):
        if value != value.capitalize() and len(value) < 8:
            raise ValueError('Password must be atleast 8 characters long and contain a capital letter')
        return value

    def __init__(self, name, username, password):
        self.name = name
        self.username = username
        self.password = password

    def __repr__(self):
        return f'<User id={self.id} name={self.name} username={self.username} password={self.password}>'

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "username": self.username,
            "password": self.password
        }
    
    def to_dict_2(self):
        return {
            "id": self.id,
            "name": self.name,
            "username": self.username,
            "password": self.password,
            "articles": [article.to_dict() for article in self.articles]
        }

class Article(db.Model):
    __tablename__ = 'articles'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    text = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

    def __init__(self, title, text, user_id, category_id):
        self.title = title
        self.text = text
        self.user_id = user_id
        self.category_id = category_id

    def __repr__(self):
        return f'<Article id={self.id} title={self.title} user_id={self.user_id} category_id={self.category_id}>'

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "user": self.user.name,
            "category": self.category.name,
            "text": self.text,
            "category_id": self.category_id
        }

class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

    articles = db.relationship('Article', backref='category')
    users = association_proxy('articles', 'user')

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return f'<Category id={self.id} name={self.name}>'

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name
        }

