from flask import Flask
from flask import request
from flask import render_template
import os
import sys

fpath = os.path.join(os.path.dirname(__file__), '../models')
sys.path.append(fpath)

from models import Scorecard_Model 
sc_DB_location = './models/yahtzeeDb.db/scorecards'
sc = Scorecard_Model.Scorecard(sc_DB_location, "scorecards", "users", "games")