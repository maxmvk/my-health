import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {filter, map, take} from 'rxjs/operators';
import {NotificationService, AvatarService, MyInformationService} from 'src/app/shared/services';
import {handlerError} from 'src/app/shared/utils';
import {setMyInfo, setAvatarState} from 'src/app/site/store';
import {Observable} from 'rxjs';
import {selectorWindowInnerWidth} from 'src/app/shared/store/selectors';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {
  @ViewChild('sideNav') sideNavRef: ElementRef;

  windowInnerWidth$: Observable<number>;

  constructor(
    private myInformationService: MyInformationService,
    private store$: Store,
    private notificationService: NotificationService,
    private avatarService: AvatarService
  ) {
  }

  ngOnInit(): void {
    this.windowInnerWidth$ = this.store$.pipe(select(selectorWindowInnerWidth));

    this.getMyInfo();
  }

  private getMyInfo(): void {
    this.myInformationService.getInfo()
      .pipe(
        filter(res => res.data.myInfo !== null),
        map(res => res.data.myInfo),
        take(1)
      )
      .subscribe(myInfo => {
        this.store$.dispatch(setMyInfo({myInfo}));

        const {silhouetteId} = myInfo;

        silhouetteId ? this.avatarService.statusController(silhouetteId)
          : this.store$.dispatch(setAvatarState({avatarState: 'empty'}));
      }, err => {
        this.notificationService.showMessage(handlerError(err));
      });
  }
}
