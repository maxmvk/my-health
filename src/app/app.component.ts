import {Component, HostListener, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {setWindowInnerWidthAction} from './shared/store/app/app.action';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {

  constructor(private store$: Store) {
  }

  ngOnInit(): void {
    this.store$.dispatch(setWindowInnerWidthAction({
      windowInnerWidth: window.innerWidth
    }));
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.store$.dispatch(setWindowInnerWidthAction({
      windowInnerWidth: (event.target as Window).innerWidth
    }));
  }
}
