import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmartTableRoutingModule } from './smart-table-routing.module';
import { SmartTableComponent } from './smart-table.component';
import { Angular2SmartTableModule } from 'angular2-smart-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SmartTableComponent],
  imports: [
    CommonModule,
    SmartTableRoutingModule,
    Angular2SmartTableModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SmartTableModule { }
