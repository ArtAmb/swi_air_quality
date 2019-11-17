import { Component, OnInit } from '@angular/core';
import { Stations } from '../../model/stations';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { StationYearInfo } from '../../model/station-info';


@Component({
  selector: 'app-station-summary',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [HttpClient]
})
export class StationSummaryComponent implements OnInit {
  
  choosenStation: Stations = Stations.CHANGPING;
  allStation: Stations[] = [Stations.CHANGPING, Stations.DINGLING, Stations.DONGSI, Stations.GUANYUAN, Stations.GUCHENG];

  year: Number = 2017;

  content: Object;
  errorMsg: String;

  constructor(private http: HttpClient) { }
  
  ngOnInit(): void {
    this.load();
  }

  load() {
    this.http.get("http://localhost:5000/station/info/" + this.choosenStation + "/for-year/" + this.year).subscribe(res => {
      this.content = res;
      this.errorMsg = null;
      console.log(this.content);
    }, err => {
      console.log(err);
      this.errorMsg = err.message;
    });
  }
}