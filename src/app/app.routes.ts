import { Routes } from '@angular/router';
import { MainAppsComponent } from './pages/main-apps/main-apps.component';
import { SmartTableComponent } from './pages/smart-table/smart-table.component';

export const routes: Routes = [
    { 
        path: '',
        redirectTo: 'main-apps', 
        pathMatch: 'full' 
    },
    {
        path: 'main-apps',
        component: MainAppsComponent
    },
    {
        path: 'smart-table',
        component: SmartTableComponent
    },
];
