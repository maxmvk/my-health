import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ProgressSpinnerComponent} from './components/progress-spinner/progress-spinner.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {ProgressBarComponent} from './components/progress-bar/progress-bar.component';

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ],
  declarations: [
    ProgressSpinnerComponent,
    ProgressBarComponent
  ],
  exports: [
    ProgressSpinnerComponent,
    ProgressBarComponent
  ]
})
export class LoaderModule {
}
