import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { routes } from './app.route';
import { HttpModule,Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MdRadioModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
 import {MATERIAL_COMPATIBILITY_MODE} from '@angular/material';
import { Service } from './service';
import {Ivdsservice} from './vds/Ivdsservice'
import * as $ from 'jquery';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
     MdRadioModule,
    CommonModule,
    routes,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
   
  ],
  providers: [ Service,DatePipe,{provide: MATERIAL_COMPATIBILITY_MODE, useValue: true},Ivdsservice],
  bootstrap: [AppComponent]
})
export class AppModule { }

// 
