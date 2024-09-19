"""
    This function hashes the password for users
"""

import bcrypt


def hash_user_password(password):
    hashed_pass = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    return hashed_pass


def check_hashed_password(password, secure_password):
    if bcrypt.checkpw(password.encode('utf-8'), secure_password):
        return True
    else:
        return False
    
