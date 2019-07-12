import { NgModule } from '@angular/core';
import {CompleteTreeComponent} from './completemoduletree/completemoduletree.component';
import{ CompleteNodeComponent} from './completemodulenode/completemodulenode.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCheckboxModule
  ],
  declarations: [CompleteTreeComponent,CompleteNodeComponent],
  exports:[CompleteTreeComponent,CompleteNodeComponent]
  
})
export class CompleteSharedModule { }