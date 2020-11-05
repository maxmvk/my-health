import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OnFocusTabsControllerDirective} from './directives';

@NgModule({
  imports: [CommonModule],
  declarations: [OnFocusTabsControllerDirective],
  exports: [OnFocusTabsControllerDirective]
})
export class SharedDirectivesModule {
}
