import os
from dotenv import load_dotenv

# Load the environment variables from the .env file
load_dotenv()

class Config:
    DATABASE_URL = os.getenv('DB_URL')
    SECRET_KEY = os.getenv('SECRET_KEY')
