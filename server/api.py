from flask import Blueprint, jsonify

api_bp = Blueprint('api', __name__)

@api_bp.route('/', methods=['GET'])
def get_data():
    return jsonify(
        {'message': 'Hello from Flask API!'}
    )
