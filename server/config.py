import os

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'burntheboats')
    SQLALCHEMY_DATABASE_URI = os.getenv('SQLALCHEMY_DATABASE_URI', 'sqlite:///development.sqlite3')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    DEBUG = True
    