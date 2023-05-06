from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db #Add classes

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///development.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app, origins=['*'])
migrate = Migrate(app, db)
db.init_app(app)

if __name__ == '__main__':
    app.run(port=3001, debug=True)