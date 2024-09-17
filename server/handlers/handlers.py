from flask import jsonify


class Handlers:
    def register_user(self):
        return jsonify(
            {'message': 'User registered!'}
        )
    
    def login_user(self):
        return jsonify(
            {'message': 'User logged in!'}
        )