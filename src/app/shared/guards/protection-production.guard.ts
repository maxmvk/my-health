import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {PersistenceService} from '../services';
import {NavigateState, StorageStateEnum} from '../utils';

@Injectable()
export class ProtectionProductionGuard implements CanActivate {

  private readonly protectionKey = environment.protectionKey;

  constructor(
    private router: Router,
    private persistenceService: PersistenceService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.persistenceService.get(StorageStateEnum.protectionKey) === this.protectionKey ? true
      : this.router.navigate([NavigateState.protection]).then(() => false);
  }

}
