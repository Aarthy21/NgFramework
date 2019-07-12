import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { routing } from './login.route';

@NgModule({
  imports: [
    CommonModule,
    routing,
    FormsModule,
   
  ],
  declarations: [LoginComponent],

})
export class LoginModule {

}
