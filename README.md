# spotify
Spotify Collaboration Automation Tool

Compressed Down The files included are only the js, css, and py files

## To use
clone this repo and cd into the root of the project


### Project Structure
#### Frontend
* Head to /auto-spot-app/ for more instructions

#### Backend
* Flask server is at application.py
* Head to /auto-spot-app/backend for more instructions

### Install

* Backend

```pip freeze > requirements.txt``` 

* Frontend

```npm install```

### Run locally
```python3 application.py```

```npm run build```

### Heroku Deployment

1) Create a virtual environment:

```python3 -m venv venv```

2) Activate the virtual environment. If you're using a Unix-based OS, run:

```source venv/bin/activate```

If you're using Windows, run:

```venv\Scripts\activate```

3) Install the needed python dependencies:

```pip install -r requirements.txt``` 

4) Now enter the following command to install the required Node packages:

```npm install```

### Heroku Set up

1) Log in to Heroku if you're not already logged in:

```heroku login```

2) Create a new Heroku project with a unique name 

```heroku create [Your_App_name]```

3) Now push your code to Heroku:

```git push heroku master```


