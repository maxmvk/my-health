import {Component, Input} from '@angular/core';
import {LocalStorageService} from 'src/app/shared/services';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.scss']
})
export class LogoutButtonComponent {
  @Input('color') colorProps: 'white' | 'black' = 'black';

  icons: {[key: string]: string} = {
    white: 'logout-white.svg',
    black: 'logout.svg'
  }

  constructor(public localStorageService: LocalStorageService) {
  }
}
