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

def users():
    if request.method == 'GET':
        return render_template('user_details.html')
    
    if request.method == 'POST':
        if User.create()["data"]["status"] != "error":
            return render_template('user_games.html', request.form.get('username'), request.form.get('password'), request.form.get('email'))

def user_details():
    
    print(f"request.method= {request.method} request.url={request.url}")
    print(f"request.url={request.query_string}")
    print(f"request.url={request.args.get('index')}")
    print(f"request.url={request.args.get('name')}") #GET request & query string 
    print(f"request.url={request.form.get('name')}") #POST request & form name

    user_info = {
        "id": "", 
        "email": "", 
        "username": "", 
        "password": ""
    }
    #get current user details
    if request.method == 'GET':
        return render_template('user_details.html',feedback = "", user_info = user_info)
    
    if request.method == 'POST':
        if User.create()["data"]["status"] != "error":
            return render_template('user_details.html', feedback = "", user_info = user_info)
    '''
    #update user details
    if request.method == 'POST':
        return render_template('user_details.html',request.args.get(User.update()["data"]["username"]))
    request.args.get(User.update()["data"]["password"]), request.args.get(User.update()["data"]["email"]))
    
    return render_template('user_details.html')
    '''

def update():
   return User.update() 

def delete():
    return User.remove()




