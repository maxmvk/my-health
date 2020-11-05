import {Component, Input, EventEmitter} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {HealthLabService} from 'src/app/shared/services/healthlab.service';
import {NotificationService} from 'src/app/shared/services/notification.service';
import {Store} from '@ngrx/store';
import {resetHealthLabInfo} from 'src/app/site/store';
import {handlerError} from 'src/app/shared/utils';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-lpc-connect-modal',
  templateUrl: './lpc-connect-modal.component.html',
  styleUrls: ['./lpc-connect-modal.component.scss']
})
export class LpcConnectModalComponent {
  @Input() modalType: string;
  statusHL: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    public dialogRef: MatDialogRef<LpcConnectModalComponent>,
    private store$: Store,
    private healthLabService: HealthLabService,
    private notificationService: NotificationService,
  ) {
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onlpcDataConnect(toogledStatus: boolean): void {
    this.dialogRef.close();
    this.healthLabService.changeHLStatus(toogledStatus)
    .pipe(
      take(1)
    )
    .subscribe(()  => {
      this.statusHL.emit(toogledStatus);
      if (!toogledStatus) {
        this.store$.dispatch(resetHealthLabInfo());
      }
    }, err => {
      this.notificationService.showMessage(handlerError(err));
    });
  }
}
