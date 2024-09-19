def is_email_or_username(input_str):
    if '@' in input_str:
        return "email"
    else:
        return "username"