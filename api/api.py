import time
from flask import Flask

app = Flask(__name__)


@app.route('/time')
def time():
	return {"time":12}


if __name__ == '__main__':
	app.run(debug=True)