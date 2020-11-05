import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService, NotificationService} from 'src/app/shared/services/';
import {NavigateState, handlerError} from 'src/app/shared/utils';
import {take} from 'rxjs/operators';
import {appFormParams} from 'src/app/shared/form.config';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  form: FormGroup;
  isLoading: boolean = false;

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
    const {required, pattern, maxLength} = Validators;
    const {EMAIL_VALIDATION, MAX_LENGTH} = appFormParams;

    this.form = this.fb.group({
      email: [
        null,
        [required, pattern(EMAIL_VALIDATION), maxLength(MAX_LENGTH)]
      ]
    });
  }

  onSubmit(): void {
    const email = this.form.value.email.trim();

    if (this.form.invalid || !email) {
      this.form.reset();
      return;
    }

    this.form.disable();

    this.isLoading = true;
    this.authService.remindPassword(email)
      .pipe(
        take(1)
      )
      .subscribe(() => {
        this.router.navigate([NavigateState.auth.checkEmail], {state: {email}});
      }, err => {
        this.notificationService.showMessage(handlerError(err));
      })
      .add(() => {
        this.isLoading = false;
        this.form.enable();
      });
  }
}
