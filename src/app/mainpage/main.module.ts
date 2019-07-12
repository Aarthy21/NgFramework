import { NgModule } from '@angular/core';
import {TopNavComponent} from '../shared/topnav/topnav.component';
import {SMDialogComponent} from '../genericcomponents/smdialog/smdialog.component';
import {TwocolSearchComponent } from "../genericcomponents/twocolsearchcomp/twocolsearch.component";
import {MultiSearchComponent } from "../genericcomponents/multisearchcomp/multisearch.component";
import {JdlgSearchComponent } from "../genericcomponents/jdlgsearchcomp/jdlgsearch.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule,Http } from '@angular/http';
import { MainComponent } from './main.component';
import {routing}  from './main.route';

@NgModule({
  imports: [
    CommonModule,
    routing,   
    FormsModule      
  ],
  declarations: [SMDialogComponent,TopNavComponent,TwocolSearchComponent,MultiSearchComponent,MainComponent,JdlgSearchComponent]  
})
export class MainModule{ }