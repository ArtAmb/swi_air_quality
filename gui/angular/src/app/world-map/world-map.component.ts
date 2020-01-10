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

  private loadStationCharts_CORE(stationName: string) {   
    this.dataService.getDataInfoForAllMonths(stationName, this.dataInfoService.year).subscribe(res => {
      console.log("OK");
      console.log(res);

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

