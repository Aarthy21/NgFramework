import { ModuleWithProviders } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { GroupLevelSecurityComponent } from './grouplevelsecurity.component'; 

const GroupLevelSecurityRoutes: Route[] = [
	{ 
		path: '', component: GroupLevelSecurityComponent,	
	}	
];

export const routing= RouterModule.forChild(GroupLevelSecurityRoutes);