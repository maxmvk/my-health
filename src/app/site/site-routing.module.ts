import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SiteComponent} from './site.component';
import {AuthGuard, ProtectionProductionGuard} from '../shared/guards';

const routes: Routes = [
  {
    path: '', component: SiteComponent, canActivate: [ProtectionProductionGuard], children: [
      {
        path: '',
        loadChildren: () => import('./pages/my-information/my-information.module').then(m => m.MyInformationModule),
        canActivate: [AuthGuard]
      },
      {
        path: '',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
        canActivate: [AuthGuard]
      },
      {
        path: '',
        loadChildren: () => import('./pages/services/services.module').then(m => m.ServicesModule),
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteRoutingModule {
}
