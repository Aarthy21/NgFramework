import { ModuleWithProviders } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ChangePasswordComponent } from './changepassword.component';

const ChangePasswordRoutes: Route[] = [
    {
    path: '', component: ChangePasswordComponent,

    }
];


export const routing = RouterModule.forChild(ChangePasswordRoutes);