import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { StationSummaryComponent } from './product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { WorldMapComponent } from './world-map/world-map.component';

import { FusionChartsModule } from "angular-fusioncharts";

import * as FusionCharts from "fusioncharts";
import * as FusionMaps from "fusioncharts/fusioncharts.maps";
import * as World from "fusioncharts/maps/fusioncharts.world";
import * as Beijing from "fusioncharts/maps/fusioncharts.beijing";
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import * as Charts from "fusioncharts/fusioncharts.charts";

import { DataService } from './world-map/data.service';
import { StationSummaryChartsComponent } from './station-summary-charts/station-summary-charts.component';
import { DataInfoService } from './product-list/data-container';

FusionChartsModule.fcRoot(
   FusionCharts,
   FusionMaps,
   World,
   Beijing,
   Charts,
   FusionTheme
 );

@NgModule({
   imports: [
      BrowserModule,
      HttpClientModule,
      ReactiveFormsModule,
      FusionChartsModule,
      FormsModule,
      RouterModule.forRoot([
        { path: '', component: StationSummaryComponent },
      ])
   ],
   declarations: [
      AppComponent,
      TopBarComponent,
      StationSummaryComponent,
      WorldMapComponent,
      StationSummaryChartsComponent
   ],
   bootstrap: [
      AppComponent
   ],
   providers: [
      DataService,
      DataInfoService
   ]
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/