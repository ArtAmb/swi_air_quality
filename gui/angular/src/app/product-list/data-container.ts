import { Injectable } from "@angular/core";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { Stations } from "../../model/stations";

@Injectable()
export class DataInfoService {
  bSubject: BehaviorSubject<String> = new BehaviorSubject(null);
  public data: any;

  choosenStation: Stations = Stations.CHANGPING;
  year: number = 2015;

  public load(data: any) {
    this.data = data;
  }

  public refresh() {
    this.bSubject.next("REFRESH");
  }

  public getSubscriber() {
    return this.bSubject;
  }
}
