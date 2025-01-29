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


def user_details():
    print(f"request.method= {request.method} request.url={request.url}")
    print(f"request.url={request.query_string}")
    print(f"request.url={request.args.get('index')}")
    print(f"request.url={request.args.get('name')}") #GET request & query string 
    print(f"request.url={request.form.get('name')}") #POST request & form name
   
    if request.method == "GET":
        return render_template("user_details.html", aim="new user")
    elif request.method == "POST":
        user_info = {
            "username": request.form.get("username"),
            "password": request.form.get("password"), 
            "email": request.form.get("email")
        }
        
        if (User.create(user_info)["status"] == "success"):
            return render_template("user_games.html", submitted_username=request.form["username"], aim="new user")
        else:
            return render_template("user_details.html", feedback=User.create(user_info)["data"], aim="new user")

def existing_user(username):
    if request.method == "GET":
        user_get = User.get(username=username)
        if user_get["status"] == "success":
            existing_username = user_get["data"]['username']
            existing_user_password = user_get["data"]['password']
            existing_user_email = user_get["data"]['email']
            existing_user_id = user_get["data"]['id']

            return render_template("user_details.html", aim="existing user", feedback=user_get["data"], 
                                   existing_username=existing_username, existing_user_password=existing_user_password, existing_user_email=existing_user_email,
                                   existing_user_id=existing_user_id, username=username)

        elif user_get["status"] == "error":
            return render_template("user_details.html", aim="existing user", feedback=user_get["data"])

    elif request.method == "POST":
        user_get_id = User.get(username=username)["data"]["id"]
        user_info = {
            "id": user_get_id,
            "email": request.form.get("email"),
            "username": request.form.get("username"), 
            "password": request.form.get("password")
            }
        
        update_user = User.update(user_info)
        if update_user["status"] == "success":
            user_get = User.get(id=user_get_id)
            existing_username = user_get["data"]['username']
            existing_user_password = user_get["data"]['password']
            existing_user_email = user_get["data"]['email']
            existing_user_id = user_get["data"]['id']

            return render_template("user_details.html", aim="existing user", feedback=user_get["data"], 
                                   existing_username=existing_username, existing_user_password=existing_user_password, existing_user_email=existing_user_email,
                                   existing_user_id=existing_user_id, username=username)
        else:
            return render_template('user_details.html', aim='existing user', username=username,
                                   feedback=update_user["data"])

def remove_user(username):
    if User.exists(username=username)["data"]==True:
        User.remove(username)
        return render_template('login.html', username=username)
    else:
        return render_template('user_details.html', feedback="user doesn't exist!")
    





