from flask import Flask
from flask import request
from flask import render_template
import os
import sys


fpath = os.path.join(os.path.dirname(__file__), '../models')
sys.path.append(fpath)

import User_Model 
User_DB_location = './models/yahtzeeDb.db/users'
User = User_Model.User(User_DB_location, "users")

def user_details():
    print(f"request.method= {request.method} request.url={request.url}")
    print(f"request.url={request.query_string}")
    print(f"request.url={request.args.get('index')}")
    print(f"request.url={request.args.get('name')}") #GET request & query string 
    print(f"request.url={request.form.get('name')}") #POST request & form name

    if request.method == 'GET':
        return User.get()
    
    if request.method == 'POST':
        return User.create()

    return render_template('user_details.html')

def update():
   return User.update() 
def delete():
    return User.remove()




