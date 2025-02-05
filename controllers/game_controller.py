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
Scorecard = Scorecard_Model.Scorecard(User_DB_location, "scorecards", "users", "games")

#scorecards get all games, instead of just returning game, return scorecard too
def get_game(username):
    if User.exists(username=username)['data'] == False:
        return render_template('login.html', feedback="user doesn't exist!")
    else:   
        user_games = Scorecard.get_all_user_game_names(username)['data'] 
        print("DEBUG: user_games retrieved:", user_games) 
    
    game_scores = {}
    for game_name in user_games:
        game_score = Scorecard.tally_score(Scorecard.get(f"{game_name}|{username}")["data"]["categories"])
        game_scores[game_name]=game_score

        game_scores = {game_name: score for game_name, score in sorted(game_scores.items(), key=lambda item: item[1], reverse=True)}

    print("Game Names:", user_games)
    print("Game Scores:", game_scores)
    return render_template("user_games.html", username=username, user_games=user_games,
                            game_scores=game_scores)

def create_game():
    username = request.form.get("username")
    print("request.form.get('username')", username)
    game_name = request.form.get("create_game")

    if User.exists(username=username)["data"] == False:
        return render_template("user_games.html", feedback="user doesn't exist!")
    elif Game.exists(game_name=game_name)["data"] == True:
        print(f"Username: {username}")
        user_games = Scorecard.get_all_user_game_names(username)["data"]
        print(f"User games returned: {user_games}")
        print(f"Type of user_games: {type(user_games)}")
        return render_template("user_games.html", feedback="game name already exists!", username=username, user_games=user_games)
    else:
        create_game_name = Game.create({"name":game_name})["data"]["name"]
        user_id = str(User.get(username=username)["data"]["id"])
        game_id = str(Game.get(game_name=game_name)["data"]["id"])
        
        new_sc = Scorecard.create(game_id, user_id, f"{create_game_name}|{username}")
        
        user_games = Scorecard.get_all_user_game_names(username)["data"]
     
        for game_name in user_games:
            print("game_name", game_name)

        game_scores = {}
        for game_name in user_games:
            game_score = Scorecard.tally_score(Scorecard.get(f"{game_name}|{username}")["data"]["categories"])
            print("game_score", game_score)
            game_scores[game_name]=game_score

            game_scores = {game_name: score for game_name, score in sorted(game_scores.items(), key=lambda item: item[1], reverse=True)}
            print("game_scores", game_scores)
        return render_template("user_games.html", username=username, game_name=game_name, user_games=user_games,
                               game_scores=game_scores)
    
def join_game():
    username = request.form.get("username")
    game_name = request.form.get("join_game")
    
    if User.exists(username=username)["status"] == "error":
        return render_template("user_games.html", feedback="user doesn't exist!")
    elif Game.exists(game_name=game_name)["status"] == "error":
        return render_template("user_games.html", feedback="game doesn't exist!")
    else:
        user_id = str(User.get(username=username)["data"]["id"])
        game_id = str(Game.get(game_name=game_name)["data"]["id"])
        new_sc = Scorecard.create(game_id, user_id, f"{game_name}|{username}")
        user_games = Scorecard.get_all_user_game_names(username)["data"]
        return render_template("user_games.html", username=username, game_name=game_name, user_games=user_games)

def remove_game(game_name, username):
    sc_name=f"{game_name}|{username}"
    sc_id=Scorecard.get(name=sc_name)["data"]["id"]
    deleted_sc=Scorecard.remove(sc_id)["data"]
    deleted_game=Game.remove(game_name)

    user_games = Scorecard.get_all_user_game_names(username)["data"]
    
    game_scores = {}
    for game_name in user_games:
        game_score = Scorecard.tally_score(Scorecard.get(f"{game_name}|{username}")["data"]["categories"])
        game_scores[game_name]=game_score

        game_scores = {game_name: score for game_name, score in sorted(game_scores.items(), key=lambda item: item[1], reverse=True)}
    return render_template("user_games.html", username=username, user_games=user_games, game_scores=game_scores)

