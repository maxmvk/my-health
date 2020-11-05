import {NgModule} from '@angular/core';
import {ProtectionComponent} from './components/protection/protection.component';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

const routes: Routes = [
  {
    path: 'protection',
    component: ProtectionComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [ProtectionComponent]
})
export class ProtectionModule {
}
