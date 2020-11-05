import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {ApolloModule} from 'apollo-angular';
import {JwtHelperService} from '@auth0/angular-jwt';
import {By} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {EMPTY, of} from 'rxjs';
import {FetchResult} from 'apollo-link';
import {AuthenticationComponent} from './authentication.component';
import {AuthenticationService, NotificationService, LocalStorageService} from 'src/app/shared/services';
import {NavigateState} from 'src/app/shared/utils';
import {UserSignIn} from '../../shared/models';
import * as faker from 'faker';


class RouterStab {
  navigate(path: string[]) {
  }
}

class JwtHelperServiceStab {
  isTokenExpired(token?: string, offsetSeconds?: number) {
  }

  getTokenExpirationDate(token?: string) {
  }
}

class NotificationServiceStab {
  showMessage(message: string) {
  }
}

describe('AuthenticationComponent', () => {
  let component: AuthenticationComponent;
  let fixture: ComponentFixture<AuthenticationComponent>;
  let authService: AuthenticationService;
  let localStorageController: LocalStorageService
  let email: string;
  let password: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthenticationComponent],
      imports: [
        ApolloModule,
        ReactiveFormsModule
      ],
      providers: [
        AuthenticationService,
        LocalStorageService,
        {provide: Router, useClass: RouterStab},
        {provide: JwtHelperService, useClass: JwtHelperServiceStab},
        {provide: NotificationService, useClass: NotificationServiceStab}
      ]
    });

    fixture = TestBed.createComponent(AuthenticationComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthenticationService);
    localStorageController = TestBed.inject(LocalStorageService);
    email = faker.internet.email();
    password = faker.internet.password();
    fixture.detectChanges();
  });

  xit('should be defined', () => {
    expect(component).toBeDefined();
  });

  xit('should be a disabled button "Sign in" after init component', () => {
    const btn = fixture.debugElement.query(By.css('.primary-button'));
    const el: HTMLElement = btn.nativeElement;

    component.ngOnInit();
    expect(el.attributes.getNamedItem('disabled')).toBeTruthy();
  });

  xit('should email be valid if set in input email', () => {
    const control = component.form.get('email');

    control.setValue(email);

    expect(control.valid).toBeTruthy();
  });

  xit('should password be valid if set in input password', () => {
    const control = component.form.get('password');

    control.setValue(password);

    expect(control.valid).toBeTruthy();
  });

  xit('should mark password as invalid if set in input password less 6 characters', () => {
    const wrongPassword = password.slice(0, 5);
    const control = component.form.get('password');

    control.setValue(wrongPassword);

    expect(control.invalid).toBeTruthy();
  });

  xit('should call "login" with email and password on form submitting', () => {
    const spy = spyOn(authService, 'login').and.callFake(() => EMPTY);

    component.form.setValue({
      email,
      password,
      rememberMe: false
    });

    component.onSubmit();
    expect(spy).toHaveBeenCalledWith(email, password);
  });

  xit('should navigate on my-information page if user make sign in first time on the site', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');

    spyOn(authService, 'login').and.callFake(() => {
      const res: FetchResult<{userSignIn: UserSignIn}> = {
        data: {
          userSignIn: {
            accessToken: '',
            refreshToken: '',
            firstTime: true
          }
        }
      };

      return of(res);
    });

    component.form.setValue({
      email,
      password,
      rememberMe: false
    });

    component.onSubmit();

    expect(spy).toHaveBeenCalledWith([NavigateState.site.myInformation]);
  });

  xit('should navigate on home if user make sign in not first time on the site', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');

    spyOn(authService, 'login').and.callFake(() => {
      const res: FetchResult<{userSignIn: UserSignIn}> = {
        data: {
          userSignIn: {
            accessToken: '',
            refreshToken: '',
            firstTime: false
          }
        }
      };

      return of(res);
    });

    component.form.setValue({
      email,
      password,
      rememberMe: false
    });

    component.onSubmit();

    expect(spy).toHaveBeenCalledWith([NavigateState.site.home]);
  });

  xit('should save tokens after successfully submitting form', () => {
    const spy = spyOn(localStorageController, 'saveTokensPair');
    spyOn(authService, 'login').and.callFake(() => {
      const res: FetchResult<{userSignIn: UserSignIn}> = {
        data: {
          userSignIn: {
            accessToken: '',
            refreshToken: '',
            firstTime: false
          }
        }
      };

      return of(res);
    });

    component.form.setValue({
      email,
      password,
      rememberMe: false
    });

    component.onSubmit();
    expect(spy).toHaveBeenCalled();
  });
});
