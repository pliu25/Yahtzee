from flask import Flask
from flask import request
from flask import render_template
import os
import sys

fpath = os.path.join(os.path.dirname(__file__), '../models')
sys.path.append(fpath)

from models import User_Model 
User_DB_location = './models/yahtzeeDb.db'
User = User_Model.User(User_DB_location, "users")

def index():
    return render_template('login.html')

def login():
    #get
    # curl "http://127.0.0.1:5000"  
    query_string = request.query_string
    print(query_string, "query_string") 
    print(f"request.url={request.url}")

    submitted_username = request.args.get("username")
    submitted_password = request.args.get("password")
    user = User.get(username=submitted_username)
    #password = User.get(submitted_password)
    #print("eek", User.create(User.user_info[submitted_password]))
    if submitted_username:
        if user["status"] == "error":
            return render_template('login.html', feedback=user["data"])
        elif user["data"]["password"] != submitted_password:
            return render_template('login.html', feedback=user["data"])
        else:
            return render_template('user_details.html', feedback="")

#user_games.html, login.html: if username and password match, go to user games, if not go to login with some feedback 