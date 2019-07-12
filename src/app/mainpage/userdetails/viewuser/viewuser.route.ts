import { ModuleWithProviders } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ViewUserComponent } from './viewuser.component'; 

const ViewUserRoutes: Route[] = [
	{ 
		path: '', component: ViewUserComponent,		
	}	
];

export const routing= RouterModule.forChild(ViewUserRoutes);