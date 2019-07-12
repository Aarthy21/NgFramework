import { ModuleWithProviders } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { GroupmappingComponent } from './groupmapping.component';
const GroupmappingRoutes: Route[] = [
	{ 
		path: '', component: GroupmappingComponent,		
	}	
];
export const routing= RouterModule.forChild(GroupmappingRoutes);