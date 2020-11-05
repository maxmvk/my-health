import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NotificationService} from 'src/app/shared/services';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.scss']
})
export class ConnectionsComponent {
  @Input('connHL') connHLProps: boolean;
  @Output('lpcConnect') lpcConnectEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public notificationService: NotificationService) {
  }

  onLpcConnect(): void {
    this.lpcConnectEvent.emit(this.connHLProps);
  }
}
