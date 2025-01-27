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
#session
app.add_url_rule('/', view_func = session_controller.index, methods = ['GET'])
#app.add_url_rule('/index', view_func = session_controller.login, methods = ['GET'])
app.add_url_rule('/login', view_func = session_controller.login, methods = ['GET'])

#user
app.add_url_rule('/users', view_func = user_controller.user_details, methods = ['GET','POST'])
app.add_url_rule('/users/<username>', view_func = user_controller.update, methods = ['GET','POST'])
app.add_url_rule('/users/delete/<username>', view_func = user_controller.delete, methods = ['GET','POST'])

#game
app.add_url_rule('/games/<username>', view_func = game_controller.get_game, methods = ['GET'])
app.add_url_rule('/games', view_func = game_controller.create_game, methods = ['POST'])
app.add_url_rule('/games/join', view_func = game_controller.join_game, methods = ['POST'])
app.add_url_rule('/games/delete/<game_name>/<username>', view_func = game_controller.remove_user, methods = ['GET'])
#app.add_url_rule('/games/<game_name>/<username>', view_func = game_controller.get_game_play, methods = ['GET'])

'''
app.add_url_rule('/users/<username>', view_func = user_controller.update, methods = ['POST'])
app.add_url_rule('/users/delete/<username>', view_func = user_controller.delete, methods = ['GET'])
'''


#console.log sends output to client (inspect page on google)
#console = real time view
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    app.run(debug=True, port = 8080)