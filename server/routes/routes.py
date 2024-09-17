from flask import Blueprint
from handlers.handlers import Handlers


def setup_routes(app):
    user_handler = Handlers()

    app.route('/register', methods=['GET'])(user_handler.register_user)

    app.route('/login', methods=['GET'])(user_handler.login_user)


    