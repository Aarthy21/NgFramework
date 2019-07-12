import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const appRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },   
    { path: 'login', loadChildren: 'app/login/login.module#LoginModule' },   
    { path: 'main', loadChildren: 'app/mainpage/main.module#MainModule'}    
];
export const routes: ModuleWithProviders = RouterModule.forRoot(appRoutes,{useHash:true});