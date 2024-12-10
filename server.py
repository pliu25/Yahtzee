from flask import Flask
from flask import request
from flask import render_template
import os
import sys
import json
import math

#connect controllers + models 
fpath = os.path.join(os.path.dirname(__file__), 'controllers')
sys.path.append(fpath)
fpath = os.path.join(os.path.dirname(__file__), 'models')
sys.path.append(fpath)
from controllers import session_controller, user_controller, game_controller, sc_controller

app = Flask(__name__, static_url_path='', static_folder='static')

'''
@app.route('/')
def login():
    return render_template("login.html")
'''
app.add_url_rule('/', view_func = session_controller.login, methods = ['GET'])
#app.add_url_rule('/index', view_func = session_controller.login, methods = ['GET'])
app.add_url_rule('/login', view_func = session_controller.login, methods = ['GET'])

@app.route('/game')
def game():
    username = request.args.get("username")
    return render_template("game.html", username = username)

#console.log sends output to client (inspect page on google)
#console = real time view
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    app.run(debug=True, port = 8080)