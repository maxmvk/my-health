import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {ApolloModule} from 'apollo-angular';
import {Router} from '@angular/router';
import {By} from '@angular/platform-browser';
import {JwtHelperService} from '@auth0/angular-jwt';
import {EMPTY, of} from 'rxjs';
import {FetchResult} from 'apollo-link';
import {ResetPasswordComponent} from './reset-password.component';
import {AuthenticationService, NotificationService} from 'src/app/shared/services';
import {NavigateState} from 'src/app/shared/utils';
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

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let authService: AuthenticationService;
  let email: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResetPasswordComponent],
      imports: [
        ApolloModule,
        ReactiveFormsModule
      ],
      providers: [
        {provide: Router, useClass: RouterStab},
        {provide: JwtHelperService, useClass: JwtHelperServiceStab},
        {provide: NotificationService, useClass: NotificationServiceStab}
      ]
    });

    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthenticationService);
    email = faker.internet.email();
    fixture.detectChanges();
  });

  xit('should be defined', () => {
    expect(component).toBeDefined();
  });

  xit('should be a disabled button "Reset" after init component', () => {
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

  xit('should call "remindPassword" with email on form submitting', () => {
    const spy = spyOn(authService, 'remindPassword').and.callFake(() => EMPTY);

    component.form.setValue({email});
    component.onSubmit();

    expect(spy).toHaveBeenCalledWith(email);
  });

  xit('should navigate on check-email page if user submitted data successfully', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');

    spyOn(authService, 'remindPassword').and.callFake(() => {
      const res: FetchResult<{remindPassword: string}> = {
        data: {
          remindPassword: ''
        }
      };

      return of(res);
    });

    component.form.setValue({email});
    component.onSubmit();

    expect(spy).toHaveBeenCalledWith([NavigateState.auth.checkEmail]);
  });
});
