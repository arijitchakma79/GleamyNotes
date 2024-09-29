import bcrypt

def hash_user_password(password):
    """
    Hash the password and return a string that can be stored in the database.
    """
    if isinstance(password, str):
        password = password.encode('utf-8')
    hashed_pass = bcrypt.hashpw(password, bcrypt.gensalt())
    return hashed_pass.decode('utf-8')

def check_hashed_password(plain_password, hashed_password):
    """
    Compare the plain password with the hashed password stored in the database.
    The hashed_password should already be in bytes from the database (not decoded to string).
    """
    if isinstance(hashed_password, str):
        hashed_password = hashed_password.encode('utf-8')
    
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password)