# Flask App: This app serves two purposes:
# 1.) Serve html and javascript files to the user. 
# 2.) Query the remote database and deliver JSON data 
#     for our javascript files to interact with
import numpy as np
from flask import Flask, jsonify, render_template
from sqlalchemy import create_engine, desc, func
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import sessionmaker
import pandas as pd

# SQL setup

# Connect to remote sql database
engine = create_engine('postgresql://football:1234@134.209.211.173/football')

# ORM setup
Base = automap_base()
Base.prepare(engine,reflect=True)
Session = sessionmaker()
Session.configure(bind=engine)

Info = Base.classes.info
Players = Base.classes.player
Draft = Base.classes.draft
College = Base.classes.college
Combine = Base.classes.combine
Teams = Base.classes.teams

# Flask routes
app = Flask(__name__)

# Basic player info
@app.route('/id/<player>')
def playerName(player):
    sesh = Session()
    # Get player id
    playerID = sesh.query(Players.player_id)\
               .filter(Players.name == player)\
               .one()[0]
    # General info
    pos, height, year, weight = sesh.query(Info.position,
                                    Info.Height,
                                    Info.Year,
                                    Info.Weight)\
                          .filter(Info.player_id == playerID)\
                          .one()
    
    # School info
    try:    
        school = sesh.query(College.School)\
                    .filter(College.player_id == playerID)\
                .one()[0]
    except:
        school = None

    # Draft info
    try:
        Round, pick_no = sesh.query(Draft.Round,
                                Draft.Pick_No)\
                    .filter(Draft.player_id == playerID)\
                    .one()
    except:
        Round, pick_no = None, None

    # Team
    try:
        team = sesh.query(Teams.NFL_Team)\
                .filter(Teams.player_id == playerID)\
                .one()[0]
    except:
        team = None

    # JSON object outpu
    output = {'playerID': playerID, 
              'name': player,
              'year':year,
              'position': pos,
              'height': height,
              'weight': weight,
              'school': school,
              'draft_round': Round,
              'pick_no':pick_no,
              'team': team}


    sesh.close()
    return jsonify(output)

# Get number of drafted players for each position
# Optionally fliter by year
@app.route('/positionTrend/<year>')
def posTrend(year):
    sesh = Session()
    df = pd.read_sql(sesh.query(Info.position,
                                func.count(Info.position),
                                func.avg(Draft.Pick_No))\
                                .join(Draft, Draft.player_id == Info.player_id)
                                .group_by(Info.position)\
                                .filter(Info.Year == year)\
                                .statement,sesh.bind)
    df.columns = ['Position', 'Count', 'Avg']
    df = df[df['Count'] != 1]
    out = []
    for index, row in df.iterrows():
        cnt = row['Count']
        pos = row['Position']
        avg = row['Avg']
        out.append({
                   'Position':pos,
                   'Count': cnt,
                   'Avg Pick_No':avg }) 
    sesh.close()
    return jsonify(out)

@app.route('/byYear/')
def countByYear():
    sesh = Session()
    df = pd.read_sql(sesh.query(Info.player_id,
                                Info.Year,
                                Info.position)\
                    .join(Draft, Info.player_id == Draft.player_id)\
                    .join(Combine, Info.player_id == Combine.player_id)\
                    .statement, sesh.bind)
        
    cols = list(df.columns)
    newCols = []
    for col in cols:
        newCols.append(col.lower())
    df.columns = newCols
    # setup output df
    years = list(df['year'].unique())
    positions = list(df['position'].unique())
    out = {}
    for year in years:
        try:
            out[str(year)] = []
        except:
            continue
    # get counts of positions by year and round
    for year in out.keys():
        for pos in positions:
            try:
                frame = df[(df['year'] == int(year)) & (df['position'] == pos)]
                out[year].append({'Position': pos, 'Count': frame.shape[0]})
            except KeyError:
                continue
    sesh.close()
    return jsonify(out)

# Get aggregate statistics for a specific position,
# on a specific year, 
# for a specific set of combine events
@app.route('/stats/')
def byYear():
    sesh = Session()
    df = pd.read_sql(sesh.query(Info.player_id,
                                Info.Height,
                                Info.Weight,
                                Info.Year,
                                Info.position,
                                Combine.Vertical,
                                Combine.Forty_Yard,
                                Combine.Bench,
                                Combine.Broad_Jump,
                                Combine.Three_Cone,
                                Combine.Shuttle,
                                Draft.Round,
                                Draft.Pick_No)\
                    .join(Draft, Info.player_id == Draft.player_id)\
                    .join(Combine, Info.player_id == Combine.player_id)\
                    .statement, sesh.bind)
    print(df)
    cols = list(df.columns)
    newCols = []
    for col in cols:
        newCols.append(col.lower())
    df.columns = newCols
    # setup output df
    years = list(df['year'].unique())
    rounds = list(df['round'].unique())
    positions = list(df['position'].unique())
    out = {}
    for year in years:
        out[str(year)] = {}
        for r in rounds:
            try:
                out[str(year)]['round ' + str(int(r))] = [] 
            except:
                continue
    # Populate stats
    statList = ['vertical', 'forty_yard','bench', 'broad_jump','three_cone','shuttle']
    for stat in statList:
        for year in years:
            for r in rounds:
                for pos in positions:
                    frame = df[(df['year'] == year) & (df['round'] == r) & (df['position'] == pos)][stat].dropna()
                    if frame.size == 0 or r == np.nan:
                        continue
                    out[str(year)]['round ' + str(int(r))].append({'Position': pos,
                                         'Statistic': stat,
                                         'Count': frame.size,
                                         'Avg': frame.mean(),
                                         'Min':frame.min(),
                                         'Max':frame.max()})
    sesh.close()
    return jsonify(out)

#routes to seconday htmls 
#Player position

@app.route('/frequency')
def position():
    return render_template('PlayerPosition1.html')

@app.route('/trend')
def position_trend():
    return render_template('PlayerPosition2.html')

@app.route('/combine')
def combine():
    return render_template('CombineEvents.html')

# Homepage
@app.route('/')
def home():
    return render_template('index.html')
if __name__ == '__main__':
    app.run(debug=True)

