import { Component, OnInit } from '@angular/core';
import { Stations } from '../../model/stations';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { StationYearInfo } from '../../model/station-info';
import { DataInfoService } from './data-container';


@Component({
  selector: 'app-station-summary',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [HttpClient]
})
export class StationSummaryComponent implements OnInit {
  
  //choosenStation: Stations = Stations.CHANGPING;
  allStation: Stations[] = [Stations.CHANGPING, Stations.DINGLING, Stations.DONGSI, Stations.GUANYUAN, Stations.GUCHENG];

  // year: Number = 2017;

  content: Object;
  errorMsg: String;

  constructor(private http: HttpClient, private dataInfoService: DataInfoService) { 
    this.dataInfoService.getSubscriber().subscribe(msg => {
      if(msg == "REFRESH") {
        this.load_CORE();
      }
    })
  }
  
  ngOnInit(): void {
    this.load();
  }

  load() {
    this.load_CORE()
    this.dataInfoService.refresh();
  }

  
  private load_CORE() {
    this.http.get("http://localhost:5000/station/info/" + this.dataInfoService.choosenStation + "/for-year/" + this.dataInfoService.year).subscribe(res => {
      this.content = res;
      this.errorMsg = null;
      this.dataInfoService.load(res);
      console.log(this.content);
    }, err => {
      console.log(err);
      this.errorMsg = err.message;
    });
  }
}