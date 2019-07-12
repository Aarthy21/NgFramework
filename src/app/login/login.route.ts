import { ModuleWithProviders } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
const loginRoutes: Route[] = [
	{ 
		path: '', component: LoginComponent,		
	}	
];
export const routing= RouterModule.forChild(loginRoutes);