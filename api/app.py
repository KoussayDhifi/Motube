from flask import Flask,request,jsonify,json
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from werkzeug.utils import secure_filename
import random
import os
import datetime
from flask_migrate import Migrate

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///newdata1.db"
app.config['JWT_SECRET_KEY'] = "fdelfjdsopgjdlskejgiew"
app.config['PROPAGATE_EXCEPTIONS'] = True

jwt = JWTManager(app)


db = SQLAlchemy(app)

migrate = Migrate(app,db)

UPLOAD_FOLDER = "../public/Videos"

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

allowed_files = {'mp4','ogg'}

class Users (db.Model):
	_id = db.Column(db.Integer,primary_key=True)
	name = db.Column(db.String(15),nullable=False)
	email = db.Column(db.String(30),nullable=False,unique=True)
	password = db.Column(db.String(12),nullable=False)
	videos=db.relationship('Videos',backref='poster')


class Videos(db.Model):
	_id=db.Column(db.Integer,primary_key=True)
	title=db.Column(db.String(12))
	description=db.Column(db.String(300))
	release_date=db.Column(db.String(10))
	views = db.Column(db.Integer,default=0,nullable=False)
	poster_id=db.Column(db.Integer,db.ForeignKey('users._id'))
	likers = db.Column(db.PickleType)








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



@app.route("/releaseVideo",methods=["POST"])
@jwt_required()
def release():

	request_data = request.files["file"]
	new_title = request.form['title']
	print(new_title)
	description = request.form['description']
	current_user = Users.query.filter_by(email=get_jwt_identity()).first()
	new_Video = Videos(title=new_title,description=description,release_date=datetime.datetime.now(),poster=current_user)
	db.session.add(new_Video)
	db.session.commit()



	request_data.save(os.path.join(app.config['UPLOAD_FOLDER'],secure_filename(new_title)))


	return {"msg":"Video Uploaded successfully"},200


def views_videos (v):
	return {
		'id':v._id,
		'title':v.title,
		'description':v.description,
		'release_date':v.release_date,
		'poster_id':v.poster_id,
		'views':v.views,
		'likers':v.likers

	}

@app.route('/videos',methods=['GET'])
def videos():
	print(Videos.query.all())

	return jsonify([*map(views_videos,Videos.query.all())]),200



@app.route('/view/<int:id>',methods=['POST'])
@jwt_required()
def view(id):

	specefic_video = Videos.query.filter_by(_id=id).first()
	number = int(specefic_video.views)
	number=number+1
	specefic_video.views=number
	print(specefic_video.views)
	db.session.commit()
	return {'Views':specefic_video.views},201



@app.route('/like/<int:id1>',methods=['POST'])
@jwt_required()
def like(id1):
	current_user=Users.query.filter_by(email=get_jwt_identity()).first()

	video = Videos.query.filter_by(_id=id1).first()
	print(video.likers)
	liked_user = {'id':current_user._id,'name':current_user.name,'email':current_user.email,'password':current_user.password}

	video.likers.append(liked_user)
	likers = video.likers
	db.session.commit()

	return {'Likers':likers},200




if __name__ == '__main__':
	app.run(debug=True)
