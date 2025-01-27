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

#scorecards get all games, instead of just returning game, return scorecard too
def get_game(username):
    user_dict = User.get(username=username)["data"]
    if User.exists(username=username)['data'] == False:
        return render_template('login.html', feedback="user doesn't exist!", user_dict=user_dict)
    else:   
        game_names = Scorecard.get_all_user_game_names(username)['data']
    
    game_scores = {}
    for game_name in game_names:
        game_score = Scorecard.tally_score(Scorecard.get(f"{game_name}|{username}")["data"]["categories"])
        game_scores[game_name]=game_score

        game_scores = {game_name: score for game_name, score in sorted(game_scores.items(), key=lambda item: item[1], reverse=True)}

    return render_template("user_games.html", username=username, user_dict=user_dict, game_names=game_names,
                            game_scores=game_scores)
    
def create_game():
    username = request.form.get("username")
    game_name = request.form.get("create_game")
    user_dict = User.get(username=username)['data']
    
    if User.exists(username=username)["data"] == False:
        return render_template("user_games.html", feedback="user doesn't exist!", user_dict=user_dict)
    elif Game.exists(game_name=game_name)["data"] == True:
        game_names = Scorecard.get_all_user_game_names(username)["data"]
        return render_template("user_games.html", feedback="game already exists!", username=username, game_names=game_names, user_dict=user_dict)
    else:
        new_game_name = Game.create({"name":game_name})["data"]["name"]
        new_game_id = str(Game.get(game_name=new_game_name)["data"]["id"])
        new_user_id = str(User.get(username=username)["data"]["id"])
        print("new_user_id", new_user_id)

        new_sc = Scorecard.create(new_game_id, new_user_id, f"{new_game_name}|{username}")

        game_names = Scorecard.get_all_user_game_names(username)["data"]

        game_scores = {}
        for game_name in game_names:
            game_score = Scorecard.tally_score(Scorecard.get(f"{game_name}|{username}")["data"]["categories"])
            game_scores[game_name]=game_score

            game_scores = {game_name: score for game_name, score in sorted(game_scores.items(), key=lambda item: item[1], reverse=True)}
        
        return render_template("user_games.html", username=username, user_dict=user_dict, game_name=game_name, game_names=game_names,
                            game_scores=game_scores) 

def join_game():
    username = request.form.get("username")
    game_name = request.form.get("join_game")
    user_dict = User.get(username=username)['data']
    print("user_dict", user_dict)
    print("username", username)
    if User.exists(username=username)["data"] == False:
        return render_template("user_games.html", feedback="user doesn't exist!", user_dict=user_dict)
    elif Game.exists(game_name=game_name)["status"] == "error":
        game_names = Scorecard.get_all_user_game_names(username)["data"]
        return render_template("user_games.html", feedback="game doesn't exist!", user_dict=user_dict)
    else:
        new_game_id = str(Game.get(game_name=game_name)["data"]["id"])
        new_sc = Scorecard.create(new_game_id, user_dict["id"], f"{game_name}|{username}")
        game_names = Scorecard.get_all_user_game_names(username)["data"]
        
        return render_template("user_games.html", username=username, user_dict=user_dict, game_name=game_name, game_names=game_names) 

def remove_user(username, game_name):
    user_dict = User.get(username=username)['data']
    sc_name=f"{game_name}|{username}"
    sc_id=Scorecard.get(name=sc_name)["data"]["id"]
    deleted_sc=Scorecard.remove(sc_id)["data"]
    deleted_game=Game.remove(game_name)

    game_names = Scorecard.get_all_user_game_names(username)["data"]
    
    game_scores = {}
    for game_name in game_names:
        game_score = Scorecard.tally_score(Scorecard.get(f"{game_name}|{username}")["data"]["categories"])
        game_scores[game_name]=game_score

        game_scores = {game_name: score for game_name, score in sorted(game_scores.items(), key=lambda item: item[1], reverse=True)}
        
    return render_template("user_games.html", username=username, user_dict=user_dict, game_names=game_names, game_scores=game_scores)
