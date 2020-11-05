import {Injectable, OnDestroy} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {StorageStateEnum} from 'src/app/shared/utils';
import {environment} from 'src/environments/environment';
import {LocalStorageService} from './local-storage.service';
import {PersistenceService} from './persistence.service';

/**
 * provide only in the component, not 'root'
 */
@Injectable()
export class AutoLogoutService implements OnDestroy {
  private timeToLogOut: number = 0;
  private autoLogOutTime: NodeJS.Timeout;

  constructor(
    private localStorageController: LocalStorageService,
    private jwtHelper: JwtHelperService,
    private persistenceService: PersistenceService
  ) {
    this.autoLogOut();
  }

  private autoLogOut(): void {
    const currentTime = new Date();
    this.timeToLogOut = +this.jwtHelper.getTokenExpirationDate(this.persistenceService.get(StorageStateEnum.refreshToken)) - +currentTime;
    /**
     * temporary logs
     */
    if (!environment.production) {
      console.log(this.jwtHelper.getTokenExpirationDate(localStorage.getItem(StorageStateEnum.accessToken)), localStorage.getItem(StorageStateEnum.accessToken));
      console.log(this.jwtHelper.getTokenExpirationDate(localStorage.getItem(StorageStateEnum.refreshToken)), localStorage.getItem(StorageStateEnum.refreshToken));
    }

    this.autoLogOutTime = setTimeout(() => this.localStorageController.logOut(), this.timeToLogOut);
  }

  public ngOnDestroy(): void {
    clearTimeout(this.autoLogOutTime);
  }
}
