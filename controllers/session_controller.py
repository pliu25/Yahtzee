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
    
    #submitted_id = request.args.get("id")
    #submitted_email = request.args.get("email")
    submitted_username = request.args.get("username")
    submitted_password = request.args.get("password")
    '''
    submitted_user_info = {
        "id": submitted_id, 
        "email": submitted_email,
        "username": submitted_username,
        "password": submitted_password
    }
    '''
    user = User.get(username=submitted_username)
    #user_create = User.create(user_info = submitted_user_info)
    #password = User.get(submitted_password)
    #print("eek", User.create(User.user_info[submitted_password]))
    if submitted_username:
        if user["status"] == "error":
            return render_template('login.html', feedback=user["data"])
        #elif user_create["status"] == "error":
            #return render_template('login.html', feedback=user_create["data"])
        elif user["data"]["password"] != submitted_password:
            return render_template('login.html', feedback="wrong password!")
        else:
            return render_template('user_games.html', feedback="")

#user_games.html, login.html: if username and password match, go to user games, if not go to login with some feedback 