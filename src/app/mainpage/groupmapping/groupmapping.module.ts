import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GroupmappingComponent } from './groupmapping.component';
import { routing } from './groupmapping.route';
import { CategoryPipe } from './category.pipe';
import { OrderByPipe } from './orderby.pipe';
@NgModule({
  imports: [
    CommonModule,
    routing,
    FormsModule,
    ],
  declarations: [GroupmappingComponent, CategoryPipe,OrderByPipe],

})
export class GroupmappingModule {

}
