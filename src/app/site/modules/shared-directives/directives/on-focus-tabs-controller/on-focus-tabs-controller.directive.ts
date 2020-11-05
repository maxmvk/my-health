import {Directive, ElementRef, HostListener} from '@angular/core';
import {Store} from '@ngrx/store';
import {hideTabs, showTabs} from 'src/app/site/store';

@Directive({
  selector: '[appOnFocusTabsController]'
})
export class OnFocusTabsControllerDirective {
  constructor(
    private el: ElementRef,
    private store: Store
  ) {
  }

  @HostListener('focus') onFocus(): void {
    this.store.dispatch(hideTabs());
  }

  @HostListener('blur') onBlur(): void {
    this.store.dispatch(showTabs());
  }
}
