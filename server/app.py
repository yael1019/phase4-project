from flask import Flask, request, jsonify
from flask_cors import CORS
from config import Config
from models import db #Add classes

app = Flask(__name__)
CORS(app, origins=['*'])
app.config.from_Object(Config)
db.init_app(app)
migrate = Migrate(app, db)

if __name__ == '__main__':
    app.run(port=3001)