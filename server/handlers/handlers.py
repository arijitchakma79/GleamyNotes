from flask import jsonify
from database.models import User  # Import your User model
from database.database import db  # Use the globally initialized db

class Handlers:
    def __init__(self):
        # No need to pass app or reinitialize db here
        self.db = db

    def register_user(self):
        return jsonify(
            {'message': 'User registered!'}
        )
    
    def login_user(self):
        return jsonify(
            {'message': 'User logged in!'}
        )

    def create_user(self):
        try:
            # Create a new user
            new_user = User(username='arijit69', email='arijitchakma@example.com', first_name='Arijit2', last_name='Chakma2', password='password123')
            self.db.session.add(new_user)
            self.db.session.commit()
            return jsonify({
                'message': 'User created successfully'
            }), 201
        except Exception as e:
            # Handle any errors that occur during the user creation process
            self.db.session.rollback()
            return jsonify({
                'error': 'Failed to create user',
                'message': str(e)
            }), 500

    def get_users(self):
        try:
            # Query all users
            users = User.query.all()
            return jsonify([{'username': user.username, 'email': user.email} for user in users]), 200
        except Exception as e:
            # Handle errors during the query
            return jsonify({
                'error': 'Failed to fetch users',
                'message': str(e)
            }), 500
