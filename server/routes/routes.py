from handlers.handlers import Handlers

def setup_routes(app):
    user_handler = Handlers()

    app.route('/register', methods=['POST'])(user_handler.register_user)
    app.route('/login', methods=['POST'])(user_handler.login_user)
    app.route('/send_verification_email', methods=['POST'])(user_handler.send_verification_code_email)
    app.route('/verify_email', methods=['POST'])(user_handler.check_verification_code)
    app.route('/reset_password', methods=['POST'])(user_handler.reset_password)
