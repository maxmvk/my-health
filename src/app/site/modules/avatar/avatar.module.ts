import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoaderModule} from 'src/app/shared/modules/loader/loader.module';

import {AvatarComponent, AvatarModelComponent} from './components';

@NgModule({
  imports: [
    CommonModule,
    LoaderModule
  ],
  declarations: [
    AvatarComponent,
    AvatarModelComponent
  ],
  exports: [
    AvatarComponent
  ]
})
export class AvatarModule {
}
