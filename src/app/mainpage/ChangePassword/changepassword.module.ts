import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule,Http } from '@angular/http';
import { ChangePasswordComponent } from './changepassword.component';
import  {routing}  from './changepassword.route';
@NgModule({
  imports: [
    CommonModule,
    routing,   
    FormsModule   
  ],
  declarations: [ChangePasswordComponent],
  
})
export class ChangePasswordModule { }