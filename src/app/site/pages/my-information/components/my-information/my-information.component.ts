import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AutoLogoutService} from 'src/app/shared/services';
import {selectorMyInfo, selectorMyInformationSheet, selectorTabsIsVisible} from 'src/app/site/store';
import {MyInfoInterface} from 'src/app/shared/models';
import {selectorWindowInnerWidth} from 'src/app/shared/store/selectors';
import {MyInformationPageSheetType} from 'src/app/site/store/pagesSheets/pagesSheets.reducer';
import {setSheetForMyInfoPageAction} from 'src/app/site/store/pagesSheets/pagesSheets.action';

@Component({
  selector: 'app-my-information',
  templateUrl: './my-information.component.html',
  styleUrls: ['./my-information.component.scss'],
  providers: [AutoLogoutService]
})
export class MyInformationComponent implements OnInit {
  myInfo$: Observable<MyInfoInterface>;
  windowInnerWidth$: Observable<number>;
  tabsIsVisible$: Observable<boolean>;
  currentSheet$: Observable<MyInformationPageSheetType>;

  constructor(
    private autoLogout: AutoLogoutService,
    private store$: Store
  ) {
  }

  ngOnInit(): void {
    this.initializeValues();
  }

  initializeValues(): void {
    this.currentSheet$ = this.store$.pipe(select(selectorMyInformationSheet));
    this.myInfo$ = this.store$.pipe(select(selectorMyInfo));
    this.tabsIsVisible$ = this.store$.pipe(select(selectorTabsIsVisible));
    this.windowInnerWidth$ = this.store$.pipe(select(selectorWindowInnerWidth));
  }

  setCurrentSheet(sheet: MyInformationPageSheetType): void {
    this.store$.dispatch(setSheetForMyInfoPageAction({myInformationSheet: sheet}));
  }
}
