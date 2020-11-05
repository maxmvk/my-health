import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {ApolloModule} from 'apollo-angular';
import {ActivatedRoute, Router} from '@angular/router';
import {By} from '@angular/platform-browser';
import {JwtHelperService} from '@auth0/angular-jwt';
import {EMPTY, of} from 'rxjs';
import {FetchResult} from 'apollo-link';
import {UpdatePasswordComponent} from './update-password.component';
import {NavigateState} from 'src/app/shared/utils';
import {AuthenticationService, NotificationService} from 'src/app/shared/services';
import {TokensPair} from '../../shared/models';
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

describe('UpdatePasswordComponent', () => {
  let component: UpdatePasswordComponent;
  let fixture: ComponentFixture<UpdatePasswordComponent>;
  let authService: AuthenticationService;
  let password: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePasswordComponent],
      imports: [
        ApolloModule,
        ReactiveFormsModule
      ],
      providers: [
        {provide: Router, useClass: RouterStab},
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              params: {
                token: 'testToken'
              }
            }
          }
        },
        {provide: JwtHelperService, useClass: JwtHelperServiceStab},
        {provide: NotificationService, useClass: NotificationServiceStab}
      ]
    });

    fixture = TestBed.createComponent(UpdatePasswordComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthenticationService);
    password = faker.internet.password();
    fixture.detectChanges();
  });

  xit('should be defined', () => {
    expect(component).toBeDefined();
  });

  xit('should be a disabled button "Save" after init component', () => {
    const btn = fixture.debugElement.query(By.css('.primary-button'));
    const el: HTMLElement = btn.nativeElement;

    component.ngOnInit();
    expect(el.attributes.getNamedItem('disabled')).toBeTruthy();
  });

  xit('should passwords be valid if set in inputs password and confirmPassword', () => {
    const controlPassword = component.form.get('password');
    const controlConfirmPassword = component.form.get('confirmPassword');

    controlPassword.setValue(password);
    controlConfirmPassword.setValue(password);

    expect(controlPassword.valid && controlPassword.valid).toBeTruthy();
  });

  xit('should mark password and confirmPassword as invalid if set in inputs password less 6 characters', () => {
    const wrongPassword = password.slice(0, 5);
    const controlPassword = component.form.get('password');
    const controlConfirmPassword = component.form.get('confirmPassword');

    controlPassword.setValue(wrongPassword);
    controlConfirmPassword.setValue(wrongPassword);

    expect(controlPassword.invalid && controlConfirmPassword.invalid).toBeTruthy();
  });

  xit('should not call "updatePassword" if passwords don\'t match', () => {
    const spy = spyOn(authService, 'updatePassword').and.callFake(() => EMPTY);
    const anotherPassword = faker.internet.password();

    component.form.setValue({
      password,
      confirmPassword: anotherPassword
    });

    component.onSave();

    expect(spy).not.toHaveBeenCalled();
  });

  xit('should call "updatePassword" with token and password on form submitting', () => {
    const spy = spyOn(authService, 'updatePassword').and.callFake(() => EMPTY);

    component.form.setValue({
      password,
      confirmPassword: password
    });

    component.onSave();
    expect(spy).toHaveBeenCalledWith('testToken', password);
  });

  xit('should navigate on authentication page if user submitted data successfully', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');

    spyOn(authService, 'updatePassword').and.callFake(() => {
      const res: FetchResult<{updatePassword: TokensPair}> = {
        data: {
          updatePassword: {
            accessToken: '',
            refreshToken: ''
          }
        }
      };

      return of(res);
    });

    component.form.setValue({
      password,
      confirmPassword: password
    });
    component.onSave();

    expect(spy).toHaveBeenCalledWith([NavigateState.auth.authentication])
  });

});
