import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-notification-button',
  templateUrl: './notification-button.component.html',
  styleUrls: ['./notification-button.component.scss']
})
export class NotificationButtonComponent {
  @Input('color') colorProps: 'white' | 'black' = 'black';

  icons: {[key: string]: string} = {
    white: 'notification-white.svg',
    black: 'notification.svg'
  }
}
