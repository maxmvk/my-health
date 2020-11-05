import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatRippleModule} from '@angular/material/core';

import {TabComponent, WindowTabsComponent} from './components';

@NgModule({
  imports: [
    CommonModule,
    MatRippleModule
  ],
  declarations: [
    WindowTabsComponent,
    TabComponent
  ],
  exports: [
    WindowTabsComponent,
    TabComponent
  ]
})
export class WindowTabsModule {
}
