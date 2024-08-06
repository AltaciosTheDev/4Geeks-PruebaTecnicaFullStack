"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Post # Import the User and Post models
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from datetime import datetime, timedelta

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

#login a user 🦍
@api.route("/login", methods=["POST"])
def login():
    
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(username=username,password=password).one_or_none()
    if user is None:
        return jsonify({"msg": "User not Found"}), 404

    # decrypted_password = current_app.bcrypt.check_password_hash(user.password, password)

    # if email != user.email or decrypted_password is False:
    #     return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity = user.username, expires_delta=timedelta(hours=3))
    return jsonify(user=user.serialize(), access_token=access_token)

# create a post
@api.route("/create_post", methods=["POST"])
@jwt_required()
def create_post():
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).one_or_none()
    
    if user is None:
        return jsonify({"msg": "User not found"}), 404

    image = request.json.get("image", None)
    message = request.json.get("message", None)
    location = request.json.get("location", None)
    status = request.json.get("status", None)

    if not message or not location or not status:
        return jsonify({"msg": "Message, location, and status are required"}), 400

    # Explicitly set image to None if not provided
    if image is None:
        image = None

    new_post = Post(
        image=image,
        message=message,
        author_id=user.id,
        location=location,
        status=status
    )
    db.session.add(new_post)
    db.session.commit()

    return jsonify(new_post.serialize()), 201