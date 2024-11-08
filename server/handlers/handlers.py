from flask import jsonify, request
from database.models import User
from database.database import db
from utils.hash_password import check_hashed_password, hash_user_password
from utils.is_email import is_email_or_username
from utils.generateJWT import generate_jwt
from utils.verification_email import send_verification_code, generate_verification_code

class Handlers:
    def __init__(self):
        self.db = db

    def register_user(self):
        try:
            data = request.get_json()
            
            required_fields = ['username', 'email', 'firstname', 'lastname', 'password']
            for field in required_fields:
                if field not in data or not data[field]:
                    return jsonify({
                        'error': 'Missing required field',
                        'message': f'{field} is required'
                    }), 400

            username = data['username']
            email = data['email']
            firstname = data['firstname']
            lastname = data['lastname']
            password = data['password']
            print(data)

            # Check if username or email already exists
            if User.query.filter((User.username == username) | (User.email == email)).first():
                return jsonify({
                    'error': 'User already exists',
                    'message': 'Username or email is already in use'
                }), 409

            # Generate JWT token
            payload = {
                'username': username,
                'email': email,
                'first_name': firstname,
                'last_name': lastname
            }
            token = generate_jwt(payload)

            # Create a new User object
            new_user = User(
                username=username,
                email=email,
                first_name=firstname,
                last_name=lastname,
                password=password,  
                token=token
            )

            # Add the user to the database
            self.db.session.add(new_user)
            self.db.session.commit()

            return jsonify({
                'message': 'User created successfully',
                'token': token,
                'user': {
                    'username': username,
                    'email': email,
                    'first_name': firstname,
                    'last_name': lastname
                }
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

            username_or_email = data.get('email')
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
        
    def send_verification_code_email(self):
        try:
            data = request.get_json()
            email = data.get('email')
            if not email:
                return jsonify({'error': 'Email is required'}), 400
        
            verification_code = generate_verification_code()

           

            send_verification_code(email, verification_code)

            user = User.query.filter_by(email=email).first()

            if user:

                user.verificationCode = verification_code

                self.db.session.commit()

                return jsonify({
                    'message': 'Verification email sent successfully'
                }), 200
            else:
                return jsonify({
                    'error': 'User not found'
                }), 404

        except Exception as e:
            self.db.session.rollback()
            return jsonify({
                'error': 'Failed to send verification email',
                'message': str(e)
            }), 500

    def check_verification_code(self):
        try:
           
            data = request.get_json()
            code = data.get('code')
            email = data.get('email')

            if not email or not code:
                return jsonify({'error': 'Email and verification code are required'}), 400

            user = User.query.filter_by(email=email).first()

            if user and user.verificationCode == code:
                user.isVerified = True
                self.db.session.commit()
                return jsonify({
                    'message': 'Verification successful'
                }), 200
            else:
                return jsonify({
                    'error': 'Invalid verification code'
                }), 400

        except Exception as e:
            return jsonify({
                'error': 'An error occurred',
                'message': str(e)
            }), 500

    def check_user_is_verified(self):
        try:
            data = request.get_json()
            email = data.get('email')

            if not email:
                return jsonify({'error': 'Email is required'}), 400
            
            user = User.query.filter_by(email=email).first()

            if user:
                if user.isVerified:
                    return jsonify({'message': 'User is verified'}), 200
                else:
                    return jsonify({'error': 'User is not verified'}), 400
            else:
                return jsonify({'error': 'User not found'}), 404

        except Exception as e:
            return jsonify({'error': 'An error occurred', 'message': str(e)}), 500

        
    def reset_password(self):
        try:

            data = request.get_json()
            
            email = data.get('email') 
            password = data.get('password') 
            confirm_password = data.get('confirm_password')  
            
            print(f"Email: {email}, Password: {password}, Confirm Password: {confirm_password}")

            if password != confirm_password:
                return jsonify({'error': 'Passwords do not match'}), 400

            if not email or not password:
                return jsonify({'error': 'Email and password are required'}), 400

            user = User.query.filter_by(email=email).first()

            if user:
                user.password = hash_user_password(password)
                self.db.session.commit()
                return jsonify({
                    'message': 'Password changed successfully'
                }), 200
            else:
                return jsonify({
                    'error': 'User not found'
                }), 404

        except Exception as e:
            return jsonify({
                'error': 'An error occurred',
                'message': str(e)
            }), 500
