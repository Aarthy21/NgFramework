import { ModuleWithProviders } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SystemdetailsComponent } from './systemdetails.component'; 

const SystemdetailsRoutes: Route[] = [
	{ 
		path: '', component: SystemdetailsComponent,		
	}	
];

export const routing= RouterModule.forChild(SystemdetailsRoutes);