import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import{ CreateUserComponent}from'./createuser.component';
import { routing } from './createuser.route';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { MdRadioModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,  
    routing,
    MdRadioModule ,
    MatInputModule ,
    MatAutocompleteModule ,
    MatFormFieldModule,
    MatSlideToggleModule,
    NguiAutoCompleteModule    
  ],
  declarations: [CreateUserComponent],
 
})
export class CreateUserModule {

}