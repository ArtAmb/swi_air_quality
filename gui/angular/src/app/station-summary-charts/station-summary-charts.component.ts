import { Component, OnInit, Input } from '@angular/core';
import { StationYearInfo, StationInfo } from '../../model/station-info';
import { ChartsConfig } from "./chart-config"


@Component({
  selector: 'app-station-summary-charts',
  templateUrl: './station-summary-charts.component.html',
  styleUrls: ['./station-summary-charts.component.css']
})
export class StationSummaryChartsComponent implements OnInit {
  @Input() content: StationYearInfo;
  dataSource: Object;
  configs = ChartsConfig;

  ATTRIBUTES_TO_SHOW = ["TEMP", "RAIN", "SO2", "NO2"];
 
  constructor() { }
  
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
      data:  []
    };
    this.dataSource["data"]= this.generateValues('TEMP');
    
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

  generateValues( attrName: string) {
    var result = [];
    for (var monthIdx = 1; monthIdx <= 12; ++monthIdx) {
      var stationInfo = this.content.months[monthIdx];
      stationInfo[attrName]
      result.push({
        "label": monthIdx,
        "value": stationInfo[attrName]
      })
    }

    return result;
  }

}
