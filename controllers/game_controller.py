from flask import Flask
from flask import request
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

def get_game(username):
    if not User.exists(username=username)['data']:
        return render_template('login.html', feedback="user doesn't exist!")
    
    user_dict = User.get(username=username)["data"]
    game_names = Scorecard.get_all_user_game_names(username)['data']
    games = []
    for name in game_names:
        games.append(Game.get(game_name=name)["data"])
    
    scorecards = []
    for name in game_names:
        sc_data = Scorecard.get(name=name + "|" + user_dict["username"])
        #print(sc_data)
        print("scorecard", (name, sc_data))
        scorecards.append((name, sc_data))

    high_scores = []
    for scorecard in scorecards:
        name = scorecard[0]
        score = Scorecard.tally_score(scorecard[1]["categories"])
        high_scores.append((name, score))
    high_scores.sort(key=lambda x: x[1], reverse=True)
    print(high_scores)

    return render_template("user_games.html", user_dict=user_dict, games=games, high_scores=high_scores)

def create_game():
    username = request.form.get('username')
    #print("username", username)
    user_dict = User.get(username=username)['data']
    game_info = {
        "name": request.form.get('game_name_input')
    }

    game_names = Scorecard.get_all_user_game_names(username)['data']
    if Game.create(game_info)["status"] == "success":
        game_names.append(game_info["name"])
        feedback = "game successfully created!"
    else:
        feedback = Game.create(game_info)["data"]
    
    games = []
    for name in game_names:
        games.append(Game.get(game_name=name)["data"])
    
    return render_template("user_games.html", username=username, user_dict=user_dict, games=games, feedback=feedback)
    
def join_game():
    username = request.form.get('username')
    user_dict = User.get(username=username)['data']
    user_id = request.form.get('id')

    game_names = Scorecard.get_all_user_game_names(username)['data']
    games = []
    for name in game_names:
        games.append(Game.get(game_name=name)["data"])

    name = request.form.get('game_name_input')
    card_id = Game.get(game_name=name)['data']['id']
    print("Game.get(game_name=name)", Game.get(game_name=name))

    sc_create = Scorecard.create(card_id, user_id, name+"|"+username)
    if sc_create['status'] == 'success':
        feedback = 'successfully joined game!'
    else:
        feedback = sc_create['data']
    
    return render_template("user_games.html", user_dict=user_dict, games=games, feedback=feedback)

def remove_user(username, game_name):
    user_dict = User.get(username=username)['data']
    game_names = Scorecard.get_all_user_game_names(username)['data']
    games = []
    for name in game_names:
        games.append(Game.get(game_name=name)["data"])
    
    if Game.remove(game_name)["status"] == "success":
        updated_games = []
        for game in games:
            if game["name"] != game_name:
                updated_games.append(game)
        games = updated_games
        feedback = "successfully removed user from game"
    else:
        feedback = Game.remove(game_name)["data"]
    
    return render_template("user_games.html", user_dict=user_dict, games=games, feedback=feedback)

def get_game_play(username, game_name):
    user_dict = User.get(username=username)['data']
    game = Game.get(game_name=game_name)

    return render_template("game.html", username=user_dict["username"], game_name=game_name)



    


