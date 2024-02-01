from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    #añadi dos registros
    name = db.Column(db.String(80), unique=False, nullable=False) 
    lastname= db.Column(db.String(80), unique=False, nullable=False)
    
    #Cuando se hace una modificacion en este archivo hat que bajar la termina y correr los siguientes comandos :
    #pipenv run migrate, pipenv run upgrade

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name, # serializar
            "lastname": self.lastname
            # do not serialize the password, its a security breach
        }