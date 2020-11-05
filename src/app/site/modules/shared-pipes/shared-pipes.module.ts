import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TextTruncatePipe} from './pipes';

@NgModule({
  imports: [CommonModule],
  declarations: [TextTruncatePipe],
  exports: [TextTruncatePipe]
})
export class SharedPipesModule {
}
