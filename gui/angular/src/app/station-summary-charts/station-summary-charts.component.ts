import { Component, OnInit, Input } from "@angular/core";
import { StationYearInfo, StationInfo } from "../../model/station-info";
import { ChartsConfig } from "./chart-config";
import { DataService } from "../world-map/data.service";

@Component({
  selector: "app-station-summary-charts",
  templateUrl: "./station-summary-charts.component.html",
  styleUrls: ["./station-summary-charts.component.css"]
})
export class StationSummaryChartsComponent implements OnInit {
  @Input() content: StationYearInfo;
  dataSource: Object;
  configs = ChartsConfig;
  corellationInfo: Object = null;
  corellationLoading: boolean = false;

  selectedView: String = "CHARTS";

  attribiute1: String;
  attribiute2: String;

  ATTRIBUTES_TO_SHOW = ["TEMP", "RAIN", "SO2", "NO2"];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataSource = {
      chart: {
        caption: "Temperature for ",
        subCaption: "",
        xAxisName: "Month",
        yAxisName: "Temerature",
        numberSuffix: " *C",
        theme: "fusion"
      },
      data: []
    };
    this.dataSource["data"] = this.generateValues("TEMP");
  }

  prepareDataSource(attrName: string): Object {
    var charConf = this.configs[attrName];

    return {
      chart: {
        caption: charConf["title"],
        subCaption: "",
        xAxisName: "Month",
        yAxisName: charConf["yAxisName"],
        numberSuffix: charConf["unitSuffix"],
        theme: "fusion"
      },
      data: this.generateValues(attrName)
    };
  }

  generateValues(attrName: string) {
    var result = [];
    for (var monthIdx = 1; monthIdx <= 12; ++monthIdx) {
      var stationInfo = this.content.months[monthIdx];
      stationInfo[attrName];
      result.push({
        label: monthIdx,
        value: stationInfo[attrName]
      });
    }

    return result;
  }

  setView(str: string) {
    this.selectedView = str;
  }

  changeCorelation() {
    console.log("changeCorelation");
    if (this.attribiute1 == null || this.attribiute2 == null) {
      console.log(this.attribiute1);
      console.log(this.attribiute2);
      console.log("one of attirbutes is null");
      return;
    }

    this.corellationLoading = true;
    console.log("getting data...");
    console.log(this.content.name);

    this.dataService
      .getCorrelationInfo(
        this.content.name,
        2015,
        this.attribiute1,
        this.attribiute2
      )
      .subscribe(
        res => {
          this.corellationInfo = null;
          console.log("SUCCESS -> getCorrelationInfo");
          this.corellationInfo = res;
          this.corellationLoading = false;
        },
        err => {
          console.log("ERROR -> getCorrelationInfo");
          console.log(err);
          this.corellationLoading = false;
        }
      ); // TODO
  }

  prepareDataSourceForCorelation() {
    return {
      chart: {
        caption: "Koleracja " + this.attribiute1 + " x " + this.attribiute2,
        subCaption: "",
        xAxisName: this.attribiute1,
        yAxisName: this.attribiute2,
        numberSuffix: " ",
        theme: "fusion"
      },
      dataset: [
        {
          showregressionline: "3",
          regressionlinecolor: "#ff0000",
          anchorbgcolor: "#34C3BD",
          anchorbordercolor: "#34C3BD",
          anchorsides: "1",
          anchorradius: "3",
          data: this.corellationInfo
        }
      ]
    };
  }
}
