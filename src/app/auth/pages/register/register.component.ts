import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {AuthenticationService, NotificationService} from 'src/app/shared/services';
import {
  NavigateState,
  handlerError,
  getFullPhoneNumber,
  maxDateDatepicker,
  minDateDatepicker,
  getFullName,
  MaskedDate
} from 'src/app/shared/utils';
import {take} from 'rxjs/operators';
import {appFormParams} from 'src/app/shared/form.config';
import {UserSignUp} from '../../shared/models';
import {environment} from '../../../../environments/environment';

declare const QB: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  isLoading: boolean = false;

  minDate: Date = minDateDatepicker;
  maxDate: Date = maxDateDatepicker;
  dateMask = MaskedDate;

  phonePrefix: string = appFormParams.DEFAULT_PHONE_PREFIX;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private notificationService: NotificationService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    const {required, minLength, maxLength, pattern} = Validators;
    const {MAX_LENGTH, MIN_PASSWORD_LENGTH, EMAIL_VALIDATION} = appFormParams;

    this.form = this.fb.group({
      firstName: [
        null,
        [required, maxLength(MAX_LENGTH)]
      ],
      lastName: [
        null,
        [required, maxLength(MAX_LENGTH)]
      ],
      birthDate: [
        null,
        [required]
      ],
      phone: [
        null,
        [required, minLength(10)]
      ],
      email: [
        null,
        [required, pattern(EMAIL_VALIDATION), maxLength(MAX_LENGTH)]
      ],
      password: [
        null,
        [required, minLength(MIN_PASSWORD_LENGTH), maxLength(MAX_LENGTH)]
      ],
      confirmPassword: [
        null,
        [required, minLength(MIN_PASSWORD_LENGTH), maxLength(MAX_LENGTH)]
      ]
    });
  }

  onSubmit(): void {
    const resetForm = (): void => {
      this.form.reset({birthDate, phone, firstName, lastName, email});
      this.form.markAllAsTouched();
      this.form.enable();
    };

    const firstName = this.form.value.firstName.trim();
    const lastName = this.form.value.lastName.trim();
    const email = this.form.value.email.trim();
    const {
      birthDate,
      phone,
      password,
      confirmPassword
    } = this.form.value;

    if (!firstName || !lastName || !email || this.form.invalid) {
      resetForm();
      return;
    }

    if (password !== confirmPassword) {
      this.notificationService.showMessage('Passwords don\'t match');
      resetForm();
      return;
    }

    const inputSignUp: UserSignUp = {
      firstName,
      lastName,
      dateOfBirthday: moment(birthDate).toDate().toISOString(),
      phoneNumber: getFullPhoneNumber(this.phonePrefix, phone),
      email,
      password
    };

    this.form.disable();

    /**
     * Temporary solution (registration) of creating user on qb
     */
    this.isLoading = true;
    this.authService.signUp(inputSignUp)
      .pipe(
        take(1)
      )
      .subscribe(res => {
        const password = res.data.userSignUp.toString().slice(-10);

        const {
          APPLICATION_ID,
          AUTH_KEY,
          AUTH_SECRET,
          config
        } = environment.qConsultation.credentials;

        QB.init(APPLICATION_ID, AUTH_KEY, AUTH_SECRET, config);

        QB.createSession((err, result) => {
          if (err) {
            console.log('SESSION', err);
          } else {
            QB.users.create({email, password}, (err, result) => {
              if (err) {
                console.log('USERS', err);
              } else {
                if (!environment.production) {
                  console.log(result);
                }
              }
            });
          }
        });

        const fullName = getFullName(firstName, lastName);
        this.router.navigate([NavigateState.auth.verifyEmail], {state: {fullName}});
      }, err => {
        this.notificationService.showMessage(handlerError(err));
      })
      .add(() => {
        this.isLoading = false;
        resetForm();
      });
  }
}
