import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService, NotificationService} from 'src/app/shared/services';
import {NavigateState, handlerError} from 'src/app/shared/utils';
import {take} from 'rxjs/operators';
import {appFormParams} from 'src/app/shared/form.config';


@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {

  form: FormGroup;
  isLoading: boolean = false;

  hideConfirmPassword: boolean = true;
  hidePassword: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private notificationService: NotificationService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    const {required, minLength, maxLength} = Validators;
    const {MIN_PASSWORD_LENGTH, MAX_LENGTH} = appFormParams;

    this.form = this.fb.group({
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

  onSave(): void {
    const resetForm = (): void => {
      this.form.reset();
      this.form.markAllAsTouched();
      this.form.enable();
    };

    const {password, confirmPassword} = this.form.value;

    if (password !== confirmPassword) {
      this.notificationService.showMessage('Passwords don\'t match');
      resetForm();
      return;
    }

    this.form.disable();

    this.isLoading = true;
    this.authService.updatePassword(this.route.snapshot.params.token, password)
      .pipe(
        take(1)
      )
      .subscribe(() => {
        this.router.navigate([NavigateState.auth.authentication]);
      }, err => {
        this.notificationService.showMessage(handlerError(err));
      })
      .add(() => {
        this.isLoading = false;
        resetForm();
      });
  }
}
