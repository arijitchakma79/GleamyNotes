from flask import jsonify
from database.models import User  
from database.database import db  

class Handlers:
    def __init__(self):
        
        self.db = db

    def register_user(self):
        return jsonify(
            {'message': 'User registered!'}
        )
    
    def login_user(self):
        return jsonify(
            {'message': 'User logged in!'}
        )