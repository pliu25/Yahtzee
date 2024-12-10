from flask import Flask
from flask import request
from flask import render_template
import os
import sys

fpath = os.path.join(os.path.dirname(__file__), '../models')
sys.path.append(fpath)

import Game_Model 
Game_DB_location = './models/yahtzeeDb.db/games'
Game = Game_Model.Game(Game_DB_location, "games")

def game():
    username = request.args.get("username")
    return render_template("game.html", username = username)