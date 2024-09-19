from handlers.handlers import Handlers

def setup_routes(app):
    user_handler = Handlers()

    app.route('/register', methods=['POST'])(user_handler.register_user)
    app.route('/login', methods=['POST'])(user_handler.login_user)
