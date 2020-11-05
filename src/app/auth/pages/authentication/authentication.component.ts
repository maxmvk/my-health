import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService, NotificationService, LocalStorageService, PersistenceService} from 'src/app/shared/services';
import {NavigateState, handlerError, StorageStateEnum} from 'src/app/shared/utils';
import {map, take} from 'rxjs/operators';
import {appFormParams} from 'src/app/shared/form.config';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  form: FormGroup;
  hidePassword: boolean = true;
  enteredEmail: string = '';
  verificationError: boolean = false;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private notificationService: NotificationService,
    private localStorageController: LocalStorageService,
    private persistenceService: PersistenceService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    const rememberedEmail = this.persistenceService.get(StorageStateEnum.remember) || null;
    const {required, minLength, maxLength, pattern} = Validators;
    const {EMAIL_VALIDATION, MAX_LENGTH, MIN_PASSWORD_LENGTH} = appFormParams;

    this.form = this.fb.group({
      email: [
        rememberedEmail,
        [required, pattern(EMAIL_VALIDATION), maxLength(MAX_LENGTH)]
      ],
      password: [
        null,
        [required, minLength(MIN_PASSWORD_LENGTH), maxLength(MAX_LENGTH)]
      ],
      rememberMe: [
        !!rememberedEmail,
        [required]
      ]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.reset();
      return;
    }

    this.form.disable();

    this.enteredEmail = this.form.value.email.trim();
    const password: string = this.form.value.password;
    const rememberMe: boolean = this.form.value.rememberMe;

    this.isLoading = true;

    this.verificationError = false;
    this.authService.login(this.enteredEmail, password)
      .pipe(
        map(res => res.data.userSignIn),
        take(1)
      )
      .subscribe(userSignIn => {
        this.localStorageController.saveTokensPair(userSignIn);

        rememberMe ? this.persistenceService.set(StorageStateEnum.remember, this.enteredEmail)
          : this.persistenceService.remove(StorageStateEnum.remember);

        userSignIn.firstTime ? this.router.navigate([NavigateState.site.myInformation])
          : this.router.navigate([NavigateState.site.home]);

      }, err => {
        if (err.graphQLErrors[0].statusCode === 451) {
          this.verificationError = true;
        } else {
          this.notificationService.showMessage(handlerError(err));
        }
      })
      .add(() => {
        this.isLoading = false;
        this.form.enable();
      });
  }
}
