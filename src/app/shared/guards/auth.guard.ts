import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {PersistenceService} from '../services';
import {Observable} from 'rxjs';
import {NavigateState, StorageStateEnum} from '../utils';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private jwtHelper: JwtHelperService,
    private persistenceService: PersistenceService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return !this.jwtHelper.isTokenExpired(this.persistenceService.get(StorageStateEnum.refreshToken))
      || this.router.navigate([NavigateState.auth.authentication]).then(() => false);
  }
}
