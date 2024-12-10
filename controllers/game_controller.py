from flask import request
from flask import render_template

def game():
    username = request.args.get("username")
    return render_template("game.html", username = username)