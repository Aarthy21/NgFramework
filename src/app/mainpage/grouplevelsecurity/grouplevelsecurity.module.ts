import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GroupLevelSecurityComponent } from './grouplevelsecurity.component';
import { routing } from './grouplevelsecurity.route';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CompleteSharedModule } from '../../shared/shared.module';
import { UserSharedModule } from '../../shared/shared1.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
     MatRadioModule,
    MatCheckboxModule,
    CompleteSharedModule,
    UserSharedModule

  ],
  declarations: [GroupLevelSecurityComponent],

})
export class GroupLevelSecurityModule {

}