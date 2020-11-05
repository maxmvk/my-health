import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {concatMap, take} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {LocalStorageService} from './local-storage.service';


const {showConsoleLogs} = environment;

@Injectable()
export class ApolloInterceptor implements HttpInterceptor {

  constructor(
    private localStorageController: LocalStorageService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.url.indexOf('/graphql') > -1) {
      if (showConsoleLogs.serverRequest) {
        console.group(`[Server request]: ${req.body?.operationName}`);
        console.warn(req.body?.query);
        console.warn(req.body?.variables);
        console.groupEnd();
      }

      switch (req.body.operationName) {
        case 'userSignUp':
        case 'userSignIn':
        case 'remindPassword':
        case 'updatePassword':
        case 'RefreshToken':
          return next.handle(req);
      }

      return this.localStorageController.getToken()
        .pipe(
          take(1),
          concatMap(accessToken => {
            if (accessToken) {
              return next.handle(req.clone({
                setHeaders: {Authorization: `Bearer ${accessToken}`}
              }));
            }
            return next.handle(req);
          })
        );
    }
    return next.handle(req);
  }
}
