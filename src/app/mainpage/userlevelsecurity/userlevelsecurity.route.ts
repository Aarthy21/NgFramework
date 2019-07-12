import { ModuleWithProviders } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { UserlevelSecurityComponent } from './userlevelsecurity.component';

const UserlevelSecurityRoutes: Route[] = [
    {
    path: '', component: UserlevelSecurityComponent,

    }
];


export const routing = RouterModule.forChild(UserlevelSecurityRoutes);