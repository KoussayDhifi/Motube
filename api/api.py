from flask import Flask,request,jsonify,json
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager


app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.sqlite3"
app.config['JWT_SECRET_KEY'] = "fdelfjdsopgjdlskejgiew"

jwt = JWTManager(app)


db = SQLAlchemy(app)

UPLOAD_FOLDER = "../src/Videos"

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

allowed_files = {'mp4','ogg'}

class Users (db.Model):
	_id = db.Column(db.Integer,primary_key=True)
	name = db.Column(db.String(15),nullable=False)
	email = db.Column(db.String(30),nullable=False,unique=True)
	password = db.Column(db.String(12),nullable=False)
	videos=db.relationship('Videos',backref='poster')



class Videos(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    title=db.Column(db.String(12))
    description=db.Column(db.String(300))
    release_date=db.Column(db.String(10))
    poster_id=db.Column(db.Integer,db.ForeignKey('users._id'))




@app.route("/login",methods=["GET","POST"])
def users ():
	
	
	request_data = json.loads(request.data)
	email = request_data["email"]
	password = request_data["password"]
	email_exists = Users.query.filter_by(email=email).first()
	if (email_exists) and email_exists.password == password:
		token = create_access_token(identity=email)
		return {"Error":"You're Being Logged in...","Token":token},200
	
	return {"Error":"User Not found"},401

@app.route("/create",methods=["GET","POST"])
def create():
	request_data = json.loads(request.data)
	name = request_data["name"]
	email = request_data["email"]
	password = request_data["password"]
	new_user = Users(name=name,email=email,password=password)
	db.session.add(new_user)
	db.session.commit()
	return {"msg":"User Created successfully"}




if __name__ == '__main__':
	app.run(debug=True)
