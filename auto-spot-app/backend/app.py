from flask import Flask
import requests
import json

app = Flask(__name__)

@app.route("/test")
def test():
    return {"members": ["Member1", "Member2", "Member3"]}

@app.route('/artists')
def artists():
    return "artist data should be here"

@app.route('/profile')
def userprofile():
    return "display user profile with this function"

@app.route('/settings')
def settings():
    return 'should allow updates to account or page'

@app.route('/getallurl')
def urlgrabber():
    return 'will add soon'

@app.route('/searching')
def search():
    return "search should call for an api with specifications and return data"

if __name__ == "__main__":
    app.run(debug=True)