import {Injectable} from '@angular/core';
import {HealthLabService} from './healthlab.service';
import {NotificationService} from './notification.service';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {handlerError, LpcModalType} from '../utils';
import {select, Store} from '@ngrx/store';
import {selectorMyInfo, setAgeomes, setHLConnection} from 'src/app/site/store';
import {Subscription} from 'rxjs';
import {AngularFireDatabase} from 'angularfire2/database';
import {LpcConnectModalComponent} from 'src/app/site/pages/home/components/lpc-connect-modal/lpc-connect-modal.component';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  firebaseSubscription: Subscription;

  constructor(
    private healthLabService: HealthLabService,
    private notificationService: NotificationService,
    private store$: Store,
    private db: AngularFireDatabase,
  ) {
  }

  lpcDataConnect(connHL: boolean): void {
    const modalAgreement = this.notificationService.showPopup(LpcConnectModalComponent);

    connHL ? modalAgreement.componentInstance.modalType = LpcModalType.turnOff
      : modalAgreement.componentInstance.modalType = LpcModalType.turnOn;

    modalAgreement.componentInstance.statusHL
      .pipe(
        take(1)
      )
      .subscribe((toogledStatus: boolean) => {
        if (toogledStatus) {
          this.getFirebaseData();
        } else {
          this.store$.dispatch(setHLConnection({connHL: toogledStatus}));
          this.firebaseSubscription.unsubscribe();
        }
      });
  }

  getHLStatus(): void {
    this.healthLabService.getHLStatus()
      .pipe(
        map(res => res.data.getHlStatus),
        take(1)
      )
      .subscribe(getHlStatus => {
        if (getHlStatus?.conn) {
          this.getFirebaseData();
        }
      }, err => {
        this.notificationService.showMessage(handlerError(err));
      });
  }

  private getFirebaseData(): void {
    let userEmail;
    this.firebaseSubscription = this.store$.pipe(
      select(selectorMyInfo),
      switchMap(myInfo => {
        userEmail = myInfo.email;
        return this.db.list('users').valueChanges();
      }),
      map((users: any) => users.filter(user => user.demographics?.email === userEmail))
    )
    .subscribe(data => {
      if (data.length) {
        this.store$.dispatch(setHLConnection({connHL: true}));
        this.store$.dispatch(setAgeomes({ageomes: data[0].ageomes}));
      } else {
        const modalError = this.notificationService.showPopup(LpcConnectModalComponent);
        modalError.componentInstance.modalType = LpcModalType.error;
        this.turnOffHealthLab();
      }
    }, err => {
      this.notificationService.showMessage(handlerError(err));
      this.turnOffHealthLab();
    });
  }

  private turnOffHealthLab(): void {
    this.healthLabService.changeHLStatus(false)
      .pipe(
        take(1)
      )
      .subscribe(() => {
        this.store$.dispatch(setHLConnection({connHL: false}));
      }, err => {
        this.notificationService.showMessage(handlerError(err));
      });
  }
}
