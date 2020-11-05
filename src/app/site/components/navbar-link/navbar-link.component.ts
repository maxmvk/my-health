import {Component, Input} from '@angular/core';
import {RouteInterface} from '../../../shared/models/route.interface';

@Component({
  selector: 'app-navbar-link',
  templateUrl: './navbar-link.component.html',
  styleUrls: ['./navbar-link.component.scss']
})
export class NavbarLinkComponent {
  @Input('route') routeProps: RouteInterface;
}
