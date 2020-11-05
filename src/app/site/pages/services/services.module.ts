import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ServicesComponent} from './components';
import {RouterModule, Routes} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';

const routes: Routes = [
  {
    path: 'services',
    component: ServicesComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule
  ],
  declarations: [ServicesComponent]
})
export class ServicesModule {
}
