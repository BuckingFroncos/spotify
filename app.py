# Simple Flask Application for basic layout of our Project
# Must have Flask Module installed, pip intall Flask
from flask import Flask, render_template, url_for
from test3 import *
import requests
import json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/artists/')
def test():
    return render_template('artists.html')


@app.route('/profile/')
def userProf():
    return "User Profile Here"

@app.route('/settings/')
def settings():
    return "Settings Here"

@app.route('/getallurl/')
def urlgrabber():
    list = get_all_url()
    str = ''
    for x in list:
        str += x + "<br>"
    return "Returning all urls:<br>" + str

@app.route('/searching/')
def search():
    return "When users search songs. This page will provide the result"

@app.route("/apiTest/")
def apiTest():
    req = requests.get("https://v2.jokeapi.dev/joke/Any?type=single&contains=programming")
    data = json.loads(req.content)
    return render_template("apiTest.html", data=data["joke"])


if __name__ == "__main__":
    app.run(debug=True) # Debug=True, allows us to see the specific errors of the application
