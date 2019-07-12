import { ModuleWithProviders } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ApplicationComponent } from './application.component';

const ApplicationRoutes: Route[] = [
	{ 
		path: '', component:ApplicationComponent,
		children:[
			{ path: '', redirectTo: 'viewuser', pathMatch: 'full' },
            { path: 'viewuser', loadChildren: 'app/mainpage/applicationmanagement/viewuser/viewuser.module#ViewUserModule' },           
			{ path: 'systemdetails', loadChildren: 'app/mainpage/applicationmanagement/systemdetails/systemdetails.module#SystemdetailsModule' },
		]
		
	}	
];


export const routing= RouterModule.forChild(ApplicationRoutes);
