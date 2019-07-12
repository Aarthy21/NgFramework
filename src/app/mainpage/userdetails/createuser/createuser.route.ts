import { ModuleWithProviders } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CreateUserComponent } from './createuser.component'; 

const CreateUserRoutes: Route[] = [
	{ 
		path: '', component: CreateUserComponent,		
	}	
];

export const routing= RouterModule.forChild(CreateUserRoutes);