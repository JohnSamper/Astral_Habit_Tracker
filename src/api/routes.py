"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import timedelta
from dotenv import load_dotenv

USERS = {} 

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route("/signup", methods={"POST"})
def signup():
    data = request.get_json() or {}
    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""
    name = data.get("name") or "User"

    if not email or not password:
        return jsonify({"msg":"email and password reqired"}), 400 
    if email in USERS:
        return jsonify({"msg":"User alredy exists"}) , 409 
    
    hashed = generate_password_hash(password)
    new_user = User(email=email, password=hashed, is_active=True, name=name)
    db.session.add(new_user)
    db.session.commit()

    token = create_access_token(identity=email)

    return jsonify({
        "msg": "user created",
        "token": token,
        "user": new_user.serialize()
    }), 201

@api.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}  
    email = (data.get("email") or "").strip().lower() 
    password = data.get("password") or ""

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({"msg": "invalid credentials"}), 401

    token = create_access_token(identity=email)
    return jsonify({
        "msg": "ok",
        "token": token,
        "user": user.serialize()
    }), 200




@api.route("/user/dashboard", methods=["GET"])
@jwt_required()
def dashboard():
    current = get_jwt_identity()
    user = User.query.filter_by(email=current).first()

    if not user:
        return jsonify({"msg": "User not found"}), 404

    return jsonify({
        "msg": "protected content",
        "user": user.serialize()
    }), 200
