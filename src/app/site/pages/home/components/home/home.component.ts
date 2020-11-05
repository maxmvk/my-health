import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, combineLatest} from 'rxjs';

import {AutoLogoutService, FirebaseService, NotificationService} from 'src/app/shared/services';
import {AgeomesInterface, MyInfoInterface} from 'src/app/shared/models';
import {map} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {ChatbotModalComponent} from 'src/app/site/pages/home/modules/chatbot/components';
import {
  selectorAgeomes,
  selectorHLConnection, selectorHomeSheet,
  selectorMyInfo,
  selectorTabsIsVisible
} from 'src/app/site/store';
import {Overlay} from '@angular/cdk/overlay';
import {selectorWindowInnerWidth} from 'src/app/shared/store/selectors';
import {HomePageSheetType} from '../../../../store/pagesSheets/pagesSheets.reducer';
import {setSheetForHomePageAction} from '../../../../store/pagesSheets/pagesSheets.action';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [AutoLogoutService]
})
export class HomeComponent implements OnInit, OnDestroy {

  myInfo$: Observable<MyInfoInterface | null>;
  connHL$: Observable<boolean>;
  ageomes$: Observable<AgeomesInterface | null>;
  windowInnerWidth$: Observable<number>;
  tabsIsVisible$: Observable<boolean>;
  currentSheet$: Observable<HomePageSheetType>;

  constructor(
    private dialog: MatDialog,
    private store$: Store,
    private autoLogout: AutoLogoutService,
    private notificationService: NotificationService,
    private overlay: Overlay,
    private firebaseService: FirebaseService
  ) {
  }

  ngOnInit(): void {
    this.initializeValues();
    this.firebaseService.getHLStatus();
  }

  initializeValues(): void {
    this.tabsIsVisible$ = this.store$.pipe(select(selectorTabsIsVisible));
    this.connHL$ = this.store$.pipe(select(selectorHLConnection));
    this.ageomes$ = this.store$.pipe(select(selectorAgeomes));
    this.currentSheet$ = this.store$.pipe(select(selectorHomeSheet));
    this.myInfo$ = this.store$.pipe(select(selectorMyInfo));

    /**
     * If chat component was opened, user resized window and set more than 767px,
     * chat component will be destroyed and current sheet on Home page will be the "avatar".
     */
    this.windowInnerWidth$ = combineLatest([
      this.store$.pipe(select(selectorWindowInnerWidth)),
      this.store$.pipe(select(selectorHomeSheet))
    ])
      .pipe(
        map(([width, currentSheet]: [number, HomePageSheetType]) => {
          if (width > 767 && currentSheet === 'chat') {
            this.setCurrentSheet('avatar');
          }

          return width;
        })
      );
  }

  onLpcDataConnect(connHL: boolean): void {
    this.firebaseService.lpcDataConnect(connHL);
  }

  openChatbotWindow(): void {
    this.notificationService.showPopup(ChatbotModalComponent, {
      hasBackdrop: false,
      scrollStrategy: this.overlay.scrollStrategies.noop()
    });
  }

  setCurrentSheet(sheet: HomePageSheetType): void {
    this.store$.dispatch(setSheetForHomePageAction({homePageSheet: sheet}));
  }

  ngOnDestroy(): void {
    this.dialog.closeAll();
    this.firebaseService.firebaseSubscription?.unsubscribe();
  }
}
