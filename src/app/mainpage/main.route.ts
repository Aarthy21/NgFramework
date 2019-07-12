import { ModuleWithProviders } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';

const topnavRoutes: Route[] = [
    {
        path: '', component: MainComponent,
        children: [
            { path: '', redirectTo: 'menucreation', pathMatch: 'full' },
            { path: 'menucreation', loadChildren: 'app/mainpage/modulecreation/modulecreation.module#ModuleCreationModule' },
            { path: 'userdetails', loadChildren: 'app/mainpage/userdetails/userdetails.module#UserDetailsModule' },
            { path: 'grouplevelsecurity', loadChildren: 'app/mainpage/grouplevelsecurity/grouplevelsecurity.module#GroupLevelSecurityModule'},
            { path: 'userlevelsecurity', loadChildren: 'app/mainpage/userlevelsecurity/userlevelsecurity.module#UserlevelSecurityModule'},
            { path: 'ChangePassword', loadChildren: 'app/mainpage/ChangePassword/changepassword.module#ChangePasswordModule' },
            { path: 'groupmapping', loadChildren: 'app/mainpage/groupmapping/groupmapping.module#GroupmappingModule' },
            { path: 'applicationmng', loadChildren: 'app/mainpage/applicationmanagement/application.module#ApplicationModule'}
          
        ]
    }
];
export const routing: ModuleWithProviders = RouterModule.forChild(topnavRoutes); {

}