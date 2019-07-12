import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import{ ViewUserComponent}from'./viewuser.component';
import { routing } from './viewuser.route';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,  
    routing    
  ],
  declarations: [ViewUserComponent],
 
})
export class ViewUserModule {

}