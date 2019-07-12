import { NgModule } from '@angular/core';
import {UserTreeComponent} from './usermoduletree/usermoduletree.component';
import{ UserNodeComponent} from './usermodulenode/usermodulenode.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCheckboxModule
  ],
  declarations: [UserTreeComponent,UserNodeComponent],
  exports:[UserTreeComponent,UserNodeComponent]
  
})
export class UserSharedModule { }