"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import json

#documentacion
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager # importarlo en app.py
#instalar JWT primero que todo


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

# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/login", methods=["POST"]) #cambiar app por api
def login():
    #esto es lo que esta esperando recibir. puedo porbar con esto en posman email, password
    email = request.json.get("email", None) #cambiar por email que es lo que tenemos en la tabla
    password = request.json.get("password", None)
    usuario = User.query.filter_by(email=email).first()
    if usuario is None:
        return jsonify({"msg": "No existe el usuario"}), 404

    if email != usuario.email or password != usuario.password: #chequear email y password este bien
        return jsonify({"msg": "Bad email or password"}), 401
    #si no se cumple lina 58 o 64
    access_token = create_access_token(identity=email) # da el token para el email
    return jsonify(access_token=access_token)
    #conectar el frontend, a traves del flux

#
@api.route("/profile", methods=["GET"])
@jwt_required() #a fuegoooooo me obliga a estar loggeado
def protected():
    current_user = get_jwt_identity() #saber que usuario es?
    user = User.query.filter_by(email=current_user).first() #check la identidad y aqui obtiene el email
    if user is None:
        return jsonify({"msg": "No existe el usuario"}), 401
    response_body = {"user": user.serialize()}
    return jsonify(response_body), 200
#Para probar esto: necesito estar loggeado
#postan a la ruta login, pasar por body email y password [post]
#obtener el token 
#hacer un profile en postman ir autorizathons bearer token y pehar el token


# despues de crear usa el useNavigate para dirigir al login CREAR RUTA PRIVADA



#importar esto en en el archivo app.py
# Setup the Flask-JWT-Extended extension
#app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
#jwt = JWTManager(app)

