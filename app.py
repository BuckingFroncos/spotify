# Simple Flask Application for basic layout of our Project
# Must have Flask Module installed, pip intall Flask
from flask import Flask, render_template, url_for

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
def userProf():
    return "Settings Here"


if __name__ == "__main__":
    app.run(debug=True) # Debug=True, allows us to see the specific errors of the application
