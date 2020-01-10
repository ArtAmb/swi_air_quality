import { NgZone, Component, OnInit } from '@angular/core';
import { MAP_DATA_SOURCE} from './map-data-source';
import { DataService } from './data.service';
import { StationYearInfo } from '../../model/station-info';
import { DataInfoService } from '../product-list/data-container';
import { Stations } from '../../model/stations';
@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.css']
})
export class WorldMapComponent implements OnInit {

  dataSource: Object = MAP_DATA_SOURCE;
  errorMsg: String = null;
  
  choosenStationInfoLoaded: Boolean = false;
  choosenStationInfo: StationYearInfo;

  constructor(private zone: NgZone,
    private dataService: DataService,
    private dataInfoService: DataInfoService) {

      this.dataInfoService.getSubscriber().subscribe(msg => {
        if(msg == "REFRESH") {
          this.loadStationCharts_CORE(this.dataInfoService.choosenStation);
        }
      })
  }

  ngOnInit() {
    console.log("Here we go again...");
  }

  
  public tmp() {
    console.log(this.choosenStationInfoLoaded);
    this.choosenStationInfoLoaded = !this.choosenStationInfoLoaded;
    console.log(this.choosenStationInfoLoaded);
  }

  public regionClick(event) {
    console.log(event);
    var dataObj = event["dataObj"];
    this.zone.run(() => {
      this.loadStationCharts(dataObj.label);
    });
    
  }

  private getStationName(districtName: string): string {
    switch(districtName.toUpperCase()) {
      case "CHANGPING": 
        return "CHANGPING";
      case "DONGCHENG": 
        return "DONGSI";
      case "XICHENG": 
        return "GUANYUAN";
      case "SHIJINGSHAN": 
        return "GUCHENG";
    }

    throw "Unknown districtName " + districtName;
  }

  loadStationCharts(districtName: string) {
    var stationName = this.getStationName(districtName);
    // this.loadStationCharts_CORE(stationName)
    this.dataInfoService.choosenStation = Stations[stationName];
    this.dataInfoService.refresh();
  }

  private highlightStation(idx: number) {
    console.log("highlightStation " + idx);
    this.dataSource["data"][idx].value = 2
  }

  private unlightStation(idx: number) {
    console.log("highlightStation " + idx);
    this.dataSource["data"][idx].value = 1
  }

  private loadStationCharts_CORE(stationName: string) {   
    this.dataService.getDataInfoForAllMonths(stationName, this.dataInfoService.year).subscribe(res => {
      console.log("OK");
      console.log(res);
      console.log(stationName);
      for(var i = 0; i < 4; ++i)
        this.unlightStation(i);
        
      switch(stationName) {
        case "CHANGPING": this.highlightStation(0); break;
        case "DONGSI": this.highlightStation(1); break;
        case "GUANYUAN": this.highlightStation(2); break;
        case "GUCHENG": this.highlightStation(3); break;
      }
      
      this.choosenStationInfoLoaded = true;

      this.errorMsg = null;
      this.choosenStationInfo = res;
    }, err => {
      console.log("ERR");
      console.log(err);
      
      this.choosenStationInfoLoaded = false;
      this.errorMsg = err.message;
    });
  }
}

