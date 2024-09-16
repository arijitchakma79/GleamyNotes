from flask import Flask
from flask_cors import CORS
from api import api_bp

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.register_blueprint(api_bp, url_prefix='/api')

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
