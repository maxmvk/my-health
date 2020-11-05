import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {environment} from 'src/environments/environment';
import {takeUntil} from 'rxjs/operators';
import {MyInfoInterface} from 'src/app/shared/models';
import {select, Store} from '@ngrx/store';
import {selectorMyInfo} from 'src/app/site/store';
import {Subject} from 'rxjs';
import {AutoLogoutService} from 'src/app/shared/services';
declare const QB: any;

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  providers: [AutoLogoutService]
})
export class ServicesComponent implements OnInit, OnDestroy {
  myInfo: MyInfoInterface | null = null;

  private unsubscribe$ = new Subject();

  constructor(
    private store$: Store,
    private autoLogout: AutoLogoutService,
    private renderer: Renderer2
  ) {
  }

  ngOnInit(): void {
    this.store$
      .pipe(
        select(selectorMyInfo),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(myInfo => {
        this.myInfo = myInfo;
      });
  }

  onQConsult(): void {
    /**
     * temporary using of field password
     */
    const password = this.myInfo.firstTimePassword.toString().slice(-10);
    const email = this.myInfo.email;

    if (!environment.production) {
      console.log({email, password});
    }

    const {
      APPLICATION_ID,
      AUTH_KEY,
      AUTH_SECRET,
      config
    } = environment.qConsultation.credentials;

    QB.init(APPLICATION_ID, AUTH_KEY, AUTH_SECRET, config);

    QB.createSession({email, password}, (err, result) => {
      if (err) {
        console.log('Error while creating the Session', err);
      } else {
        const tempSrc = (environment.qConsultation.url + result.token) as string;

        const link = this.renderer.createElement('a');
        this.renderer.appendChild(document.body, link);
        this.renderer.setStyle(link, 'display', 'none');
        this.renderer.setAttribute(link, 'href', tempSrc);
        this.renderer.setAttribute(link, 'target', '_blank');
        link.click();
        this.renderer.removeChild(document.body, link);
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
