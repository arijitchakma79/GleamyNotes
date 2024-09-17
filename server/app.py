from flask import Flask
from flask_cors import CORS
from routes.routes import setup_routes

def create_app():
    app = Flask(__name__)
    CORS(app)

    setup_routes(app)

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
