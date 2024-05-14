import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainAppsRoutingModule } from './main-apps-routing.module';
import { Angular2SmartTableModule } from 'angular2-smart-table';
import { MainAppsComponent } from './main-apps.component';


@NgModule({
  declarations: [MainAppsComponent],
  imports: [
    CommonModule,
    MainAppsRoutingModule,
    Angular2SmartTableModule
  ]
})
export class MainAppsModule { }
