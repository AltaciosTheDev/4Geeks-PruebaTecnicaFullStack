from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    avatar = db.Column(db.String(500), nullable=True)
    name = db.Column(db.String(20), nullable=False)
    surname = db.Column(db.String(20), nullable=False)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(10), nullable=False)
    
    posts = db.relationship('Post', backref='author', lazy=True)
    likes = db.relationship('Like', backref='user', lazy=True)

    def __repr__(self):
        return f'<User {self.username}>'

    def __init__(self, avatar, name, surname, username, password):
        self.avatar = avatar
        self.name = name
        self.surname = surname
        self.username = username
        self.password = password

    def serialize(self):
        return {
            "id": self.id,
            "avatar": self.avatar if self.avatar else None,
            "name": self.name,
            "surname": self.surname,
            "username": self.username
        }

class Post(db.Model):
    __tablename__ = 'post'
    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String(500), nullable=True)
    message = db.Column(db.String(500), nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    location = db.Column(db.String(30), nullable=False)
    status = db.Column(db.String(10), nullable=False)
    
    likes = db.relationship('Like', backref='post', lazy=True)

    def __repr__(self):
        return f'<Post {self.id} by User {self.author_id}>'

    def __init__(self, image, message, author_id, location, status):
        self.image = image
        self.message = message
        self.author_id = author_id
        self.location = location
        self.status = status

    def serialize(self):
        return {
            "id": self.id,
            "image": self.image if self.image else None,
            "message": self.message,
            "author_id": self.author_id,
            "author_name": f"{self.author.name} {self.author.surname}" if self.author else None,
            "created_at": self.created_at,
            "location": self.location,
            "status": self.status,
            "likes": [like.serialize() for like in self.likes] if self.likes else None
        }

class Like(db.Model):
    __tablename__ = 'like'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'), nullable=False)

    def __repr__(self):
        return f'<Like {self.id} by User {self.user_id} on Post {self.post_id}>'

    def __init__(self, user_id, post_id):
        self.user_id = user_id
        self.post_id = post_id

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "post_id": self.post_id
        }