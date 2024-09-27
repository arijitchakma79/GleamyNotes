import jwt
import datetime
from config.config import Config

SECRET_KEY = Config.SECRET_KEY

def generate_jwt(payload, expires_in=None):
   
    if expires_in is None:
        expires_in = datetime.timedelta(days=1)  

    payload['exp'] = datetime.datetime.utcnow() + expires_in
    
    return jwt.encode(payload, SECRET_KEY, algorithm='HS256')

def decode_jwt(token):
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        return {'error': 'Signature expired. Please log in again.'}
    except jwt.InvalidTokenError:
        return {'error': 'Invalid token. Please log in again.'}
