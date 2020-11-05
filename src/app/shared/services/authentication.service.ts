import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Apollo} from 'apollo-angular';
import {
  REMIND_PASSWORD_MUTATION,
  SIGN_IN_MUTATION,
  SIGN_UP_MUTATION,
  UPDATE_PASSWORD_MUTATION,
  REFRESH_TOKEN,
  SEND_VERIFY_EMAIL_LINK_MUTATION
} from 'src/app/apollo';
import {StorageStateEnum} from '../utils';
import {FetchResult} from 'apollo-link';
import {tap} from 'rxjs/operators';
import {UserSignUp, UserSignIn, TokensPair} from 'src/app/auth/shared/models';
import {LocalStorageService} from './local-storage.service';
import {PersistenceService} from './persistence.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private apollo: Apollo,
    private localStorageController: LocalStorageService,
    private persistenceService: PersistenceService
  ) {
  }

  login(email: string, password: string): Observable<FetchResult<{userSignIn: UserSignIn}>> {
    return this.apollo.mutate<{userSignIn: UserSignIn}>({
      mutation: SIGN_IN_MUTATION,
      variables: {
        email,
        password
      }
    });
  }

  remindPassword(email: string): Observable<FetchResult<{remindPassword: string}>> {
    return this.apollo.mutate<{remindPassword: string}>({
      mutation: REMIND_PASSWORD_MUTATION,
      variables: {
        email
      }
    });
  }

  updatePassword(token: string, newPass: string): Observable<FetchResult<{updatePassword: TokensPair}>> {
    return this.apollo.mutate<{updatePassword: TokensPair}>({
      mutation: UPDATE_PASSWORD_MUTATION,
      variables: {
        token,
        newPass
      }
    });
  }

  signUp(signUpInput: UserSignUp): Observable<FetchResult<{userSignUp: UserSignUp}>> {
    return this.apollo.mutate<{userSignUp: UserSignUp}>({
      mutation: SIGN_UP_MUTATION,
      variables: {
        firstName: signUpInput.firstName,
        lastName: signUpInput.lastName,
        phoneNumber: signUpInput.phoneNumber,
        email: signUpInput.email,
        password: signUpInput.password,
        dateOfBirthday: signUpInput.dateOfBirthday
      }
    });
  }

  sendVerifyEmailLink(email: string): Observable<FetchResult> {
    return this.apollo.mutate<FetchResult>({
      mutation: SEND_VERIFY_EMAIL_LINK_MUTATION,
      variables: {
        email
      }
    });
  }

  refreshTokensPair(): Observable<FetchResult<{refreshToken: TokensPair}>> {
    const refreshToken = this.persistenceService.get(StorageStateEnum.refreshToken);

    return this.apollo.query<{refreshToken: TokensPair}>({
      query: REFRESH_TOKEN,
      context: {
        headers: {
          Authorization: `Bearer ${refreshToken}`
        }
      }
    })
      .pipe(
        tap(res => {
            if (res?.data) {
              this.localStorageController.saveTokensPair(res?.data?.refreshToken);
            } else {
              console.group('[Server error]: refreshToken');
              console.warn((res as FetchResult).data?.errors[0] || 'Unknown error');
              console.groupEnd();
              this.localStorageController.logOut();
            }
          }
        )
      );
  }
}
