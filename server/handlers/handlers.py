from flask import jsonify, request
from database.models import User
from database.database import db
from utils.hash_password import check_hashed_password, hash_user_password
from utils.is_email import is_email_or_username
from utils.generateJWT import generate_jwt

class Handlers:
    def __init__(self):
        self.db = db

    def register_user(self):
        try:
            # Get JSON data from request
            data = request.get_json()

            # Extract user data from the request
            username = data.get('username')
            email = data.get('email')
            firstname = data.get('first_name')
            lastname = data.get('last_name')
            password = data.get('password')

            # Hash the password before storing it
            hashed_password = hash_user_password(password)

            # Payload for the JWT
            payload = {
                'username': username,
                'email': email,
                'first_name': firstname,
                'last_name': lastname
            }

            # Generate JWT token
            token = generate_jwt(payload)

            # Create a new User object
            new_user = User(
                username=username,
                email=email,
                first_name=firstname,
                last_name=lastname,
                password=hashed_password,
                token=token
            )

            # Add the user to the database
            self.db.session.add(new_user)
            self.db.session.commit()

            return jsonify({
                'message': 'User created successfully',
                'token': token
            }), 201

        except Exception as e:
            # Rollback in case of an error
            self.db.session.rollback()
            return jsonify({
                'error': 'Failed to create user',
                'message': str(e)
            }), 500

    def login_user(self):
        try:
            # Get JSON data from request
            data = request.get_json()

            username_or_email = data.get('username')
            password = data.get('password')

            user = None

            # Check if it's an email or a username
            if is_email_or_username(username_or_email) == "email":
                user = User.query.filter(User.email == username_or_email).first()
            else:
                user = User.query.filter(User.username == username_or_email).first()

            # If the user is not found
            if not user:
                return jsonify({
                    'error': 'Login failed',
                    'message': 'Invalid username or email'
                }), 401

            # Check if the provided password matches the hashed password
            if check_hashed_password(password, user.password):
                # Generate a new token after successful login (optional but common practice)
                payload = {
                    'username': user.username,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name
                }
                token = generate_jwt(payload)

                return jsonify({
                    'message': 'Login successful',
                    'token': token,  # Return the JWT token for further authenticated requests
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
