import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule,Http } from '@angular/http';
import { ModuleCreationComponent } from './modulecreation.component';
import  {routing}  from './modulecreation.route';
import { MdRadioModule} from '@angular/material';
import {TreeComponent} from './tree/tree.component';
import{ NodeComponent} from './node/node.component';
@NgModule({
  imports: [
    CommonModule,
    routing, 
    HttpModule,  
    FormsModule,
    MdRadioModule   
  ],
  declarations: [ModuleCreationComponent,TreeComponent,NodeComponent],
  
})
export class ModuleCreationModule { }