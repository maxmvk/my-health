import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {Store} from '@ngrx/store';
import {StorageStateEnum} from 'src/app/shared/utils';
import {resetAvatar, setAvatarModel, setAvatarState} from 'src/app/site/store';
import {userNotifications} from 'src/app/shared/app.config';
import {NotificationService} from './notification.service';
import {PersistenceService} from './persistence.service';


@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  private requestDelay = 4000;
  private isNewPhoto: boolean = false;

  private readonly CLIENT_ID = environment.clientCredentialsLoomAI.CLIENT_ID;
  private readonly CLIENT_SECRET = environment.clientCredentialsLoomAI.CLIENT_SECRET;
  private readonly proxy = environment.proxy;

  constructor(
    private http: HttpClient,
    private store$: Store,
    private notificationService: NotificationService,
    private persistenceService: PersistenceService
  ) {
  }

  private getTokenBearer(): Observable<{access_token: string, token_type: string, expires_in: number} | any> {
    return this.http.post(`${this.proxy}https://auth.loomai.com/oauth/token`,
      `audience=https%3A%2F%2Fapi.loomai.com%2F&grant_type=client_credentials&client_id=${this.CLIENT_ID}&client_secret=${this.CLIENT_SECRET}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .pipe(
        tap(this.setTokenBearer.bind(this))
      );
  }

  private setTokenBearer(res: {access_token: string, token_type: string, expires_in: number}): void {
    const expDate = new Date(new Date().getTime() + (+res.expires_in - 100) * 1000);
    this.persistenceService.set(StorageStateEnum.avatarTokenExp, expDate.toString());
    this.persistenceService.set(StorageStateEnum.avatarToken, res.access_token);
  }

  private readTokenBearer(): string | null {
    const expDate = new Date(this.persistenceService.get(StorageStateEnum.avatarTokenExp));

    return new Date() > expDate ? null : this.persistenceService.get(StorageStateEnum.avatarToken);
  }

  private handlerToken(request: Function): Observable<any> {
    if (this.readTokenBearer()) {
      return request(this.readTokenBearer());
    } else {
      return this.getTokenBearer()
        .pipe(
          switchMap(() => request(this.readTokenBearer()))
        );
    }
  }

  createAvatar(image: File): Observable<any> {
    const form = new FormData();
    form.append('image', image);

    const request = (token: string) => {
      return this.http.post(`${this.proxy}https://api.live.loomai.com/v0.5/avatars`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          observe: 'response'
        })
        .pipe(
          tap((res: HttpResponse<any>) => {
            this.store$.dispatch(resetAvatar());
            this.notificationService.showMessage(userNotifications.CREATING_AVATAR);
            this.isNewPhoto = true;
            this.statusController(res.headers.get('X-Loom-Status'));
          })
        );
    };

    return this.handlerToken(request);
  }

  private getEntries(silhouetteId: string): Observable<any> {
    const request = (token) => {
      return this.http.get(`${this.proxy}https://api.live.loomai.com/v0.5/avatars/${silhouetteId}/attachments`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    };

    return this.handlerToken(request);
  }

  private getStatus(silhouetteId: string): Observable<any> {
    const request = (token) => {
      return this.http.head(`${this.proxy}https://api.live.loomai.com/v0.5/avatars/${silhouetteId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        observe: 'response'
      });
    };

    return this.handlerToken(request);
  }

  statusController(silhouetteId: string): void {
    this.getStatus(silhouetteId)
      .pipe(
        take(1)
      )
      .subscribe((res: HttpResponse<any>) => {
        /**
         * temporary log
         */
        if (!environment.production) console.log('STATUS:', res.headers.get('X-Loom-Status'));

        if (res.headers.get('X-Loom-Status') === 'done') {
          console.log('GO TO ENTRIES CONTROLLER');
          this.entriesController(silhouetteId);
        } else {
          /**
           * temporary log
           */
          if (!environment.production) console.log('LOADING');

          this.store$.dispatch(setAvatarState({avatarState: 'loading'}));
          setTimeout(() => {
            this.statusController(silhouetteId);
          }, this.requestDelay);
        }
      });
  }

  entriesController(silhouetteId: string): void {
    this.getEntries(silhouetteId)
      .pipe(
        map(res => res.entries),
        take(1)
      )
      .subscribe(entries => {
        /**
         * temporary log
         */
        if (!environment.production) console.log(entries);

        if (entries.length > 1) {
          /**
           * temporary log
           */
          if (!environment.production) console.log('SETTING AVATAR: entries.length > 1');

          this.isNewPhoto = false;
          const gltfArray = entries.find(item => item.type === 'gltf');
          const gltfURL = (this.proxy + gltfArray.url) as string;
          this.setAvatar(gltfURL);
        } else {
          /**
           * temporary log
           */
          if (!environment.production) console.log('FAILED TO GENERATE AVATAR: entries.length <= 1');

          if (this.isNewPhoto) this.notificationService.showMessage(userNotifications.FAILED_TO_GENERATE_AVATAR);
          this.isNewPhoto = false;
          this.store$.dispatch(setAvatarState({avatarState: 'empty'}));
        }
      });
  }

  private getAvatar(url: string): Observable<Blob> {
    return this.http.get(this.proxy + url, {
      responseType: 'blob'
    });
  }

  private setAvatar(gltfURL: string): void {
    this.getAvatar(gltfURL)
      .pipe(
        take(1)
      )
      .subscribe(blob => {
        this.store$.dispatch(setAvatarModel({avatarModel: blob}));
        this.store$.dispatch(setAvatarState({avatarState: 'avatar'}));
      });
  }
}
