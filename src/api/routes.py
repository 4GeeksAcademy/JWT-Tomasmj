"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import json

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200


@api.route('/user', methods=['POST'])
def new_user():
    body = json.loads(request.data) #pidiendo informacion por body e importar json
    nuevo_usuario = User.query.filter_by(email = body['email']).first() #checkear si existe el email
    if nuevo_usuario is None: #si no existe lo guardo
        usuario = User(
            email = body['email'], #email pasado por body
            password = body['password'], #lo naranja viene de la tabla
            name = body['name'], 
            lastname = body['lastname']
        )
        db.session.add(usuario) #como en en la 30
        db.session.commit()
        # return jsonify({"msg": "Usuario creado"}), 200
        #traer los datos de este usuario como respuesta
        return jsonify(usuario.serialize()), 200   
    return jsonify({"msg": "Ya existe el usuario"}), 404

