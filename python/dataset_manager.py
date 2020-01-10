from enum import Enum

import pandas as pd


# from scipy import stats as scipy_stats


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


def create_station_info(monthMeans):
    res = {}
    for col in IMPORTANT_ATTRIBUTES:
        res[col.name] = monthMeans[col.value]
    return res


class StationYearInfo:
    def __init__(self, name, df, year):
        self.name = name
        self.year = year
        self.months = {}

        oneYear = df[df[Columns.year.value] == int(year)]
        for month in range(1, 13):
            monthDf = oneYear[oneYear[Columns.month.value] == int(month)];
            if monthDf.shape[0] == 0:
                continue
            monthMeans = monthDf.mean()
            # StationInfo(monthMeans, name)

            self.months[month] = create_station_info(monthMeans)


IMPORTANT_ATTRIBUTES = [
    Columns.TEMP,
    Columns.RAIN,
    Columns.SO2,
    Columns.NO2,
    Columns.PM25,
    Columns.PM10,
    Columns.CO,
    Columns.O3,
    Columns.PRES,
    Columns.DEWP,
    Columns.WSPM]

# class StationInfo:
#     def __init__(self, means, name=""):
#         self.name = name

# self.SO2 = means[Columns.SO2.value]
# self.NO2 = means[Columns.NO2.value]
# self.TEMP = means[Columns.TEMP.value]
# self.RAIN = means[Columns.RAIN.value]
#


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
    return create_station_info(means)


def get_station_all_months_info(station_name, year):
    station_df = AirQualityDataset[Stations[station_name]]
    return StationYearInfo(station_name, station_df, year)


def get_correltion_info(station_name, year, attribiute1, attribiute2):
    result_list = []
    station_df = AirQualityDataset[Stations[station_name]]
    oneYear = station_df[station_df[Columns.year.value] == int(year)]
    for index, row in oneYear.iterrows():
        result_list.append({
            "x": row[Columns[attribiute1].value],
            "y": row[Columns[attribiute2].value]})

    return result_list

# def pearson_correlation(col1, col2):
#     print(scipy_stats.pearsonr(val1, val2)[0])
