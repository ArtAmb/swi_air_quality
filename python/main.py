from python import dataset_manager as dm
from flask import Flask, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

def toJSON(obj):
    return json.dumps(obj, default=lambda o: o.__dict__, sort_keys=True, indent=4)

@app.route("/station/info/<station_name>/for-year/<year>")
def getStationInfo(station_name, year):
    return jsonify(dm.get_station_info(station_name, year).__dict__)


@app.route("/station/info/<station_name>/for-year/<year>/all-months")
def getStationAllMonthsInfo(station_name, year):
    return toJSON(dm.get_station_all_months_info(station_name, year))

@app.route("/station/correlation/info/<station_name>/for-year/<year>/attribiutes/<attribiute1>/x/<attribiute2>")
def getCorrelationInfo(station_name, year, attribiute1, attribiute2):
    return toJSON(dm.get_correltion_info(station_name, year, attribiute1, attribiute2))

if __name__ == "__main__":
    dm.import_dataset()
    app.run()



