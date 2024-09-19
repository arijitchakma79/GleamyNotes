import bcrypt



def hash_user_password(password):
    """
    Hash the password and return a string that can be stored in the database.
    """
    hashed_pass = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    return hashed_pass.decode('utf-8')  # Decode bytes to string for storage


def check_hashed_password(plain_password, hashed_password):
    """
    Compare the plain password with the hashed password stored in the database.
    The hashed_password should already be a decoded string from the database.
    """
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))