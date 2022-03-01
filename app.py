# Simple Flask Application for basic layout of our Project
# Must have Flask Module installed, pip intall Flask
from flask import Flask, render_template, url_for
from test3 import *
import requests
import json
import urllib # Used to get images from web using their url found in image html tags
from PIL import Image, ImageFilter # Used to manipulate images extraction from webpage

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


@app.route('/Pillow/')
def apiPillow():
    """Function uses module Pillow. Pillow allows to manipulate images and save them to our computer.
    This method will parse through html of allrecipes.com and save all images' url if it begins with 'https'
    FOUR images will be filtered with Sharpen and downloaded and saved onto the users computer. The orginal images
    will also be displayed on the url"""
    page = requests.get("https://www.allrecipes.com")
    soup = BeautifulSoup(page.content, "html.parser")
    urls = soup.findAll('img')
    images = [] # Holds the names of images that have been retrieved
    image_urls = [] # Holds the urls of images 
    img_num = 1 # Counter
    for i in urls[30:]:
        pic = i.attrs['src']
        if pic[0:5] == "https":
            extension = pic[-4:] if pic[-4:] == ".png" or pic[-4:] == '.jpg' else pic[-5:]
            name = str(img_num) + extension
            images.append(urllib.request.urlretrieve(pic,name)[0]) # Save image as counter + entension
            image_urls.append(pic) # saves image url to display on the web page
            img_num += 1
        if img_num == 5:
            break

    for i in images: # Module Pillow, PIL USED: Adds a filter to increase sharpness for each image and saves the image
        img = Image.open(i)
        out = img.filter(ImageFilter.SHARPEN)
        out.save(i)
    
    return render_template('extraction.html', images = image_urls) # Passes image urls to display each image on the webpage


if __name__ == "__main__":
    app.run(debug=True) # Debug=True, allows us to see the specific errors of the application
