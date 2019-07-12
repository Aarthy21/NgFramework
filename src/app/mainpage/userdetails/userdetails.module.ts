import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule,Http } from '@angular/http';
import { UserDetailsComponent} from './userdetails.component';
import  {routing}  from './userdetails.route';

@NgModule({
  imports: [
    CommonModule,
    routing,   
    FormsModule,
    ReactiveFormsModule   
  ],
  declarations: [UserDetailsComponent],
 
  
})
export class UserDetailsModule { }