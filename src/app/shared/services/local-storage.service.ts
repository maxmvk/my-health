import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {StorageStateEnum, NavigateState} from '../utils';
import {TokensPair} from 'src/app/auth/shared/models';
import {PersistenceService} from './persistence.service';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(
    private router: Router,
    private persistenceService: PersistenceService
  ) {
  }

  getToken(): Observable<string | null> {
    const accessToken = this.persistenceService.get(StorageStateEnum.accessToken);
    if (!accessToken) {
      this.logOut();
      return of(null);
    } else {
      return of(accessToken);
    }
  }

  saveTokensPair(tokens: TokensPair): void {
    const {accessToken, refreshToken} = tokens;
    this.persistenceService.set(StorageStateEnum.accessToken, accessToken);
    this.persistenceService.set(StorageStateEnum.refreshToken, refreshToken);
  }

  logOut(): void {
    this.persistenceService.remove(StorageStateEnum.accessToken);
    this.persistenceService.remove(StorageStateEnum.refreshToken);
    this.router.navigate([NavigateState.auth.authentication]);
  }
}
