from flask import request
from flask import render_template

def login():
    #get
    # curl "http://127.0.0.1:5000"  
    query_string = request.query_string
    print(query_string, "query_string") 
    print(f"request.url={request.url}")
    return render_template('login.html')

#user_games.html, login.html: if username and password match, go to user games, if not go to login with some feedback 