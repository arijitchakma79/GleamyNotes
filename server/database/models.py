from database.database import db
from utils.hash_password import hash_user_password
from sqlalchemy.sql import func

class User(db.Model):
    __tablename__ = 'users'

    # User basic information
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(255), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    password = db.Column(db.String(255), nullable=False)

    # Timestamps
    createdAt = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updatedAt = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    # User status flags
    isVerified = db.Column(db.Boolean, default=False, nullable=False)
    verificationCode = db.Column(db.String(10), nullable=True)
    isDeleted = db.Column(db.Boolean, default=False, nullable=False)
    deletionDate = db.Column(db.DateTime(timezone=True), nullable=True)

    # Token (e.g., refresh token or JWT storage)
    token = db.Column(db.String(255), nullable=True)

    def __init__(self, username, email, first_name, last_name, password, token):
        self.username = username
        self.email = email
        self.first_name = first_name
        self.last_name = last_name
        self.password = hash_user_password(password)
        self.token = token

    def mark_as_deleted(self):
        """Marks the user as deleted and sets the deletion date."""
        self.isDeleted = True
        self.deletionDate = func.now()

    def __repr__(self):
        return f"<User(username={self.username}, email={self.email})>"
