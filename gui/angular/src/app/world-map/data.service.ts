import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

  public getDataInfo(stationName: string, year: number): Observable<any> {
    return this.http.get("http://localhost:5000/station/info/" + stationName + "/for-year/" + year);
  }

  public getDataInfoForAllMonths(stationName: string, year: number): Observable<any> {
    return this.http.get("http://localhost:5000/station/info/" + stationName + "/for-year/" + year + "/all-months");
  }

}
