import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import{ SystemdetailsComponent}from'./systemdetails.component';
import { routing } from './systemdetails.route';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { MdRadioModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MyDatePickerModule  } from 'angular4-datepicker/src/my-date-picker';


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
    NguiAutoCompleteModule,
    MatSelectModule,
    MatDatepickerModule ,
    MyDatePickerModule   
  ],
  declarations: [SystemdetailsComponent],
 
})
export class SystemdetailsModule {

}