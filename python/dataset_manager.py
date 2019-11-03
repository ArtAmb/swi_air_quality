from enum import Enum

import pandas as pd


class Stations(Enum):
    CHANGPING = "Changping"
    DINGLING = "Dingling"
    DONGSI = "Dongsi"
    GUANYUAN = "Guanyuan"
    GUCHENG = "Gucheng"


class Columns(Enum):
    year = "year"
    month = "month"
    day = "day"
    hour = "hour"
    PM25 = "PM2.5"
    PM10 = "PM10"
    SO2 = "SO2"
    NO2 = "NO2"
    CO = "CO"
    O3 = "O3"
    TEMP = "TEMP"
    PRES = "PRES"
    DEWP = "DEWP"
    RAIN = "RAIN"
    wd = "wd"
    WSPM = "WSPM"
    station = "station"


class StationInfo:
    name = ""
    SO2 = 0
    NO2 = 0
    TEMP = 0
    RAIN = 0

    def __init__(self, name, df, year):
        self.name = name
        means = df[df[Columns.year.value] == int(year)].mean()

        self.SO2 = means[Columns.SO2.value]
        self.NO2 = means[Columns.NO2.value]
        self.TEMP = means[Columns.TEMP.value]
        self.RAIN = means[Columns.RAIN.value]


AirQualityDataset = {}


def create_file_name(stationName):
    return "PRSA_Data_" + stationName + "_20130301-20170228.csv"


def import_dataset():
    for station in Stations:
        AirQualityDataset[station] = pd.read_csv("dataset/" + create_file_name(station.value), delimiter=",")


def get_station_info(station_name, year):
    station_df = AirQualityDataset[Stations[station_name]]
    return StationInfo(station_name, station_df, year)
