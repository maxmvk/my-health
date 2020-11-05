import {Component, EventEmitter, Output} from '@angular/core';
import {RouteInterface} from '../../../shared/models/route.interface';
import {Store} from '@ngrx/store';
import {resetPagesSheets} from '../../store/pagesSheets/pagesSheets.action';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  routes: {
    topList: RouteInterface[],
    bottomList: RouteInterface[]
  } = {
    topList: [
      {label: 'home screen', routerLink: '/home', icon: 'home.svg'},
      {label: 'my information', routerLink: '/my-information', icon: 'my-info.svg'},
      {label: 'configuration', routerLink: '/configuration', icon: 'config.svg'},
      {label: 'book service', routerLink: '/services', icon: 'book-service.svg'},
      {label: 'appointments', routerLink: '/appointments', icon: 'appointments.svg'},
      {label: 'health history', routerLink: '/health-history', icon: 'history.svg'},
      {label: 'digital dashboard', routerLink: '/digital-dashboard', icon: 'digital.svg'}
    ],
    bottomList: [
      {label: 'help', routerLink: '/accounts', icon: 'help-1.svg'}
    ]
  };

  @Output('onChooseLink') onChooseLinkProps: EventEmitter<void> = new EventEmitter<void>();

  constructor(private store: Store) {
  }

  onChooseLink(): void {
    this.store.dispatch(resetPagesSheets());

    if (window.innerWidth <= 767) {
      this.onChooseLinkProps.emit();
    }
  }
}
