from enum import Enum
# from scipy import stats as scipy_stats

import pandas as pd
import json


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


class StationYearInfo:
    def __init__(self, name, df, year):
        self.name = name
        self.year = year
        self.months = {}

        oneYear = df[df[Columns.year.value] == int(year)]
        for month in range(1, 13):
            monthMeans = oneYear[oneYear[Columns.month.value] == int(month)].mean()
            self.months[month]=(StationInfo(monthMeans, name))

class StationInfo:
    def __init__(self, means, name =""):
        self.name = name

        self.SO2 = means[Columns.SO2.value]
        self.NO2 = means[Columns.NO2.value]
        self.TEMP = means[Columns.TEMP.value]
        self.RAIN = means[Columns.RAIN.value]


AirQualityDataset = {}

def clean(data):
    data.dropna(how="all", axis='index', inplace=True)
    data.dropna(how="all", axis='columns', inplace=True)
    data.fillna(inplace=True, method="ffill")
    data.fillna(inplace=True, method="bfill")

def create_file_name(stationName):
    return "PRSA_Data_" + stationName + "_20130301-20170228.csv"


def import_dataset():
    for station in Stations:
        AirQualityDataset[station] = pd.read_csv("../dataset/" + create_file_name(station.value), delimiter=",")
        clean(AirQualityDataset[station])


def get_station_info(station_name, year):
    df = AirQualityDataset[Stations[station_name]]
    means = df[df[Columns.year.value] == int(year)].mean()
    return StationInfo(means, station_name)

def get_station_all_months_info(station_name, year):
    station_df = AirQualityDataset[Stations[station_name]]
    return StationYearInfo(station_name, station_df, year)


def get_correltion_info(station_name, year, attribiute1, attribiute2):
    result_list = []
    station_df = AirQualityDataset[Stations[station_name]]
    oneYear = station_df[station_df[Columns.year.value] == int(year)]
    for index, row in oneYear.iterrows():
        result_list.append({
            "x": row[attribiute1],
            "y": row[attribiute2]})

    return result_list

# def pearson_correlation(col1, col2):
#     print(scipy_stats.pearsonr(val1, val2)[0])