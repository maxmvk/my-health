import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ApolloModule} from 'apollo-angular';
import {ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {By} from '@angular/platform-browser';
import {MatNativeDateModule} from '@angular/material/core';
import {EMPTY, of} from 'rxjs';
import {FetchResult} from 'apollo-link';
import {RegisterComponent} from './register.component';
import {appFormParams} from 'src/app/shared/form.config';
import {AuthenticationService, NotificationService} from 'src/app/shared/services';
import {getFullName, getFullPhoneNumber, NavigateState} from 'src/app/shared/utils';
import {UserSignUp} from '../../shared/models';
import * as faker from 'faker';
import * as moment from 'moment';


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

describe('RegisterComponent', () => {
  const min = 1e10;
  const max = 1e11 - 1;

  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthenticationService;
  let email: string;
  let password: string;
  let firstName: string;
  let lastName: string;
  let phone: number;
  let date: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        ApolloModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule
      ],
      providers: [
        {provide: Router, useClass: RouterStab},
        {provide: JwtHelperService, useClass: JwtHelperServiceStab},
        {provide: NotificationService, useClass: NotificationServiceStab}
      ]
    });

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthenticationService);
    email = faker.internet.email();
    password = faker.internet.password();
    firstName = faker.name.firstName();
    lastName = faker.name.lastName();
    fixture.detectChanges();
    phone = Math.floor(min + Math.random() * (max + 1 - min));
    date = new Date(Date.now()).toString();
  });

  xit('should be defined', () => {
    expect(component).toBeDefined();
  });

  xit('should be a disabled button "Create account" after init component', () => {
    const btn = fixture.debugElement.query(By.css('.primary-button'));
    const el: HTMLElement = btn.nativeElement;

    component.ngOnInit();
    expect(el.attributes.getNamedItem('disabled')).toBeTruthy();
  });

  xit('should firstName be valid if set in input firstName', () => {
    const control = component.form.get('firstName');

    control.setValue(firstName);

    expect(control.valid).toBeTruthy();
  });

  xit('should lastName be valid if set in input lastName', () => {
    const control = component.form.get('lastName');

    control.setValue(lastName);

    expect(control.valid).toBeTruthy();
  });

  xit('should date be valid if set in input birthDate', () => {
    component.ngOnInit();
    const control = component.form.get('birthDate');

    control.setValue(date);

    expect(control.valid).toBeTruthy();
  });

  xit('should phone be valid if set in input phone', () => {
    const control = component.form.get('phone');

    control.setValue(phone);

    expect(control.valid).toBeTruthy();
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

  xit('should mark password and confirmPassword as invalid if set in inputs password less 6 characters', () => {
    const wrongPassword = password.slice(0, 5);
    const controlPassword = component.form.get('password');
    const controlConfirmPassword = component.form.get('confirmPassword');

    controlPassword.setValue(wrongPassword);
    controlConfirmPassword.setValue(wrongPassword);

    expect(controlPassword.invalid && controlConfirmPassword.invalid).toBeTruthy();
  });

  xit('should call "signUp" with data on form submitting', () => {
    component.ngOnInit();
    const spy = spyOn(authService, 'signUp').and.callFake(() => EMPTY);

    component.form.setValue({
      birthDate: date + '',
      email,
      firstName,
      lastName,
      password,
      phone,
      confirmPassword: password
    });

    const haveToBeCalledData: UserSignUp = {
      dateOfBirthday: moment(date).toDate().toISOString(),
      email,
      firstName,
      lastName,
      password,
      phoneNumber: getFullPhoneNumber(appFormParams.DEFAULT_PHONE_PREFIX, phone + '')
    };

    component.onSubmit();
    expect(spy).toHaveBeenCalledWith(haveToBeCalledData);
  });

  xit('should navigate on verify-email with state if user submitted data successfully', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');

    component.ngOnInit();

    spyOn(authService, 'signUp').and.callFake(() => {
      const res: FetchResult<{userSignUp: UserSignUp}> = {
        data: {
          userSignUp: {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            password: '',
            dateOfBirthday: ''
          }
        }
      };

      return of(res);
    });

    component.form.setValue({
      birthDate: date + '',
      email,
      firstName,
      lastName,
      password,
      phone,
      confirmPassword: password
    });

    const fullName = getFullName(firstName, lastName);

    component.onSubmit();
    expect(spy).toHaveBeenCalledWith([NavigateState.auth.verifyEmail], {state: {fullName}}
    );
  });
});
