import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule,Http } from '@angular/http';
import { ApplicationComponent} from './application.component';
import  {routing}  from './application.route';

@NgModule({
  imports: [
    CommonModule,
    routing,   
    FormsModule,
    ReactiveFormsModule   
  ],
  declarations: [ApplicationComponent],
 
  
})
export class ApplicationModule { }