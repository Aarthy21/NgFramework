import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule,Http } from '@angular/http';
import { UserlevelSecurityComponent } from './userlevelsecurity.component';
import  {routing}  from './userlevelsecurity.route';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {CompleteSharedModule} from '../../shared/shared.module';
import {UserSharedModule} from '../../shared/shared1.module';
@NgModule({
  imports: [
    CommonModule,
    routing,   
    FormsModule,
    CompleteSharedModule,
    UserSharedModule,
    MatRadioModule,
    MatCheckboxModule
  
  ],
  declarations: [UserlevelSecurityComponent,],
  
})
export class UserlevelSecurityModule {
  
 }