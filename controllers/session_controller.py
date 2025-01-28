from flask import Flask
from flask import request, redirect
from flask import render_template
import os
import sys

fpath = os.path.join(os.path.dirname(__file__), '../models')
sys.path.append(fpath)

from models import User_Model, Game_Model, Scorecard_Model
User_DB_location = './models/yahtzeeDb.db'
User = User_Model.User(User_DB_location, "users")
Game = Game_Model.Game(User_DB_location, "games")
Scorecard = Scorecard_Model.Scorecard(User_DB_location, "scorecard", "users", "games")

def login():
    #get
    # curl "http://127.0.0.1:5000"  
    query_string = request.query_string
    print(query_string, "query_string") 
    print(f"request.url={request.url}")
    
    submitted_username = request.args.get("username")
    submitted_password = request.args.get("password")

    if submitted_username:
        user_get = User.get(username=submitted_username)
        if user_get["status"] == "success":
            if user_get["data"]["password"] == submitted_password:
                user_games = Scorecard.get_all_user_game_names(submitted_username)["data"]
                
                game_scores = {}
                for game_name in user_games:
                    game_score = Scorecard.tally_score(Scorecard.get(f"{game_name}|{submitted_username}")["data"]["categories"])
                    game_scores[game_name]=game_score

                    game_scores = {game_name: score for game_name, score in sorted(game_scores.items(), key=lambda item: item[1], reverse=True)}
                return render_template('user_games.html', submitted_username=submitted_username, user_games=user_games, game_scores=game_scores)
            else:
                return render_template('login.html', feedback="incorrect password!")
        else:
            return render_template('login.html', feedback="username doesnt exist!")
    else:
        return render_template('login.html')

    

'''
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
    submitted_action = request.args.get("action")
    print("submitted_action", submitted_action)
    
    if submitted_action == "Login":
        if User.get(username=submitted_username)["status"] == "error":
            return render_template('login.html', feedback="this user doesn't exist!")
        else:
            user_dict = User.get(username=submitted_username)["data"]
            print("user_dict", user_dict)
            if user_dict["password"] != submitted_password:
                return redirect(f'/games/{submitted_username}')
            else:
                return render_template('user_games.html', feedback="")
    elif submitted_action == "Create":
        return redirect('/users')
    
    return render_template('user_details.html')
'''
'''
    action = request.args.get('action')
    username = request.args.get('username')
    password = request.args.get('password')

    if action == 'Submit': #logging in

        if User.get(username=username)["status"] == 'success':
            user_dict = User.get(username=username)["data"]

            if password == user_dict["password"]:
                return redirect(f'/games/{username}')
            else:
                return render_template('login.html', feedback="Wrong password!")
        
        else:
            return render_template('login.html', feedback="This user does not exist!")
        
    elif action == 'Create': #new user
        return redirect('/users')


    return render_template('user_details.html')
'''
#user_games.html, login.html: if username and password match, go to user games, if not go to login with some feedback 