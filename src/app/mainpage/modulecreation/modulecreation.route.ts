import { ModuleWithProviders } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ModuleCreationComponent } from './modulecreation.component';

const modulecreationRoutes: Route[] = [
	{ 
		path: '', component: ModuleCreationComponent,
		
	}	
];


export const routing= RouterModule.forChild(modulecreationRoutes);