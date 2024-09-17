from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# Initialize the db object globally, without passing the app immediately
db = SQLAlchemy()

def initialize_database(app):
    # Use init_app to bind the app to the db object
    db.init_app(app)
    return db
