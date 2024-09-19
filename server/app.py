from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from routes.routes import setup_routes  
from database.database import db  
from config.config import Config

def create_app():
    app = Flask(__name__)
    


    app.config['SQLALCHEMY_DATABASE_URI'] = Config.DATABASE_URL
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    CORS(app)

    # Initialize the database
    db.init_app(app)  

    # Set up routes
    setup_routes(app)

    # Create tables before the first request if they don't exist
    with app.app_context():
        db.create_all()

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
