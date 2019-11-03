from python import dataset_manager as dm
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/station/info/<station_name>/for-year/<year>")
def getStationInfo(station_name, year) :
    return jsonify(dm.get_station_info(station_name, year).__dict__)


if __name__ == "__main__":
    dm.import_dataset()
    app.run()