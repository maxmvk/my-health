import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {NgxMaskModule} from 'ngx-mask';

import {AvatarModule, SharedDirectivesModule, SharedPipesModule, WindowTabsModule} from 'src/app/site/modules';
import {FormComponent, MyInformationComponent, AvatarContainerComponent} from './components';
import {ChangeValueFtDirective, ChangeValueInDirective} from './directives';
import {LoaderModule} from '../../../shared/modules/loader/loader.module';

const routes: Routes = [
  {
    path: 'my-information',
    component: MyInformationComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    WindowTabsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSelectModule,
    NgxMaskModule,
    MatButtonModule,
    AvatarModule,
    SharedDirectivesModule,
    SharedPipesModule,
    LoaderModule
  ],
  declarations: [
    MyInformationComponent,
    FormComponent,
    AvatarContainerComponent,
    ChangeValueFtDirective,
    ChangeValueInDirective
  ]
})
export class MyInformationModule {
}
