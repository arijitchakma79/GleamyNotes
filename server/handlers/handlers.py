from flask import jsonify, request
from database.models import User  
from database.database import db  
from utils.is_email import is_email_or_username
from utils.hash_password import check_hashed_password


class Handlers:
    def __init__(self):
        self.db = db

    def register_user(self):
        try:
            data = request.get_json()
            username = data.get('username')
            email = data.get('email')
            firstname = data.get('first_name')
            lastname = data.get('last_name')
            password = data.get('password')

            new_user = User(username=username, email=email, first_name=firstname, last_name=lastname, password=password)
            
            self.db.session.add(new_user)
            self.db.session.commit()

            return jsonify({
                'message': 'User created successfully'
            }), 201
        except Exception as e:
            self.db.session.rollback()
            return jsonify({
                'error': 'Failed to create user',
                'message': str(e)
            }), 500
    
    def login_user(self):
        try:
            data = request.get_json()

            username_or_email = data.get('username_or_email')
            password = data.get('password')
            
            user = None
            if is_email_or_username(username_or_email) == "email":
                user = User.query.filter(User.email == username_or_email).first()
            else:
                user = User.query.filter(User.username == username_or_email).first()

            if not user:
                return jsonify({
                    'error': 'Login failed',
                    'message': 'Invalid username or email'
                }), 401

            if check_hashed_password(password, user.password):
                return jsonify({
                    'message': 'Login successful',
                    'user': {
                        'username': user.username,
                        'email': user.email,
                        'first_name': user.first_name,
                        'last_name': user.last_name
                    }
                }), 200
            else:
                return jsonify({
                    'error': 'Login failed',
                    'message': 'Invalid password'
                }), 401

        except Exception as e:
            return jsonify({
                'error': 'An error occurred',
                'message': str(e)
            }), 500
        


   