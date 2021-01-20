import os
from flask import Flask, jsonify
from flask import request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from geoalchemy2 import Geometry

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DB_PATH')
db = SQLAlchemy(app)

class PointsModel(db.Model):
    __tablename__ = 'points'

    id = db.Column(db.Integer, primary_key=True)
    tipo = db.Column(db.String())
    latitude = db.Column(db.Float())
    longitude = db.Column(db.Float())
    color = db.Column(db.String())
    the_geom = db.Column(Geometry('POINT'))

    def __init__(self, name, model, doors):
        self.name = name
        self.model = model
        self.doors = doors

    def __repr__(self):
        return f"<Point {self.name}>"

@app.route('/')
def welcome():
    return jsonify({'status': 'api working'})

@app.route('/points', methods=['GET'])
def handle_points():
    if request.method == 'GET':
        points = PointsModel.query.all()
        results = [
            {
                "latitude": point.latitude,
                "longitude": point.longitude,
            } for point in points]

        return {"rows": results}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=os.getenv('PORT'))