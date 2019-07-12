import { ModuleWithProviders } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { UserDetailsComponent } from './userdetails.component';

const userdetailsRoutes: Route[] = [
	{ 
		path: '', component: UserDetailsComponent,
		children:[
			{ path: '', redirectTo: 'viewuser', pathMatch: 'full' },
            { path: 'viewuser', loadChildren: 'app/mainpage/userdetails/viewuser/viewuser.module#ViewUserModule' },           
			{ path: 'createuser', loadChildren: 'app/mainpage/userdetails/createuser/createuser.module#CreateUserModule' },
		]
		
	}	
];


export const routing= RouterModule.forChild(userdetailsRoutes);



