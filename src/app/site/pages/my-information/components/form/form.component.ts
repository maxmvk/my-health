import {Component, Input, OnInit} from '@angular/core';
import {MyInfoInterface} from 'src/app/shared/models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {
  getFullPhoneNumber, handlerError,
  isEmptySetUndefined,
  MaskedDate,
  maxDateDatepicker,
  minDateDatepicker,
  NavigateState
} from 'src/app/shared/utils';
import {appFormParams} from 'src/app/shared/form.config';
import {userNotifications} from 'src/app/shared/app.config';
import {Observable, of, throwError} from 'rxjs';
import {deleteAvatar, ModelState, selectorAvatarState, setMyInfo} from '../../../../store';
import {Router} from '@angular/router';
import {AvatarService, MyInformationService, NotificationService} from 'src/app/shared/services';
import {select, Store} from '@ngrx/store';
import {catchError, map, switchMap, take} from 'rxjs/operators';
import heic2any from 'heic2any';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input('myInfo') myInfoProps: MyInfoInterface;

  form: FormGroup;

  file: File | null = null;
  imagePreview: string | SafeUrl | null = null;

  silhouetteId: string | null = null;

  minDate: Date = minDateDatepicker;
  maxDate: Date = maxDateDatepicker;
  dateMask = MaskedDate;

  phonePrefix: string = appFormParams.DEFAULT_PHONE_PREFIX;
  genders: string[] = appFormParams.GENDERS;

  currentAvatarState$: Observable<ModelState>;

  isLoading: boolean = false;
  isRendering: boolean = false;

  constructor(
    private router: Router,
    private myInformationService: MyInformationService,
    private sanitization: DomSanitizer,
    private notificationService: NotificationService,
    private store$: Store,
    private avatarService: AvatarService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.currentAvatarState$ = this.store$.pipe(select(selectorAvatarState));
    this.imagePreview = this.myInfoProps.avatar || null;
  }

  initializeForm(): void {
    let heightFt, heightIn = '';
    const {required, minLength, maxLength} = Validators;
    const {MAX_LENGTH} = appFormParams;
    const {
      firstName,
      lastName,
      dateOfBirth,
      phoneNumber,
      gender,
      height,
      weight
    } = this.myInfoProps;

    if (height) {
      heightFt = (Math.floor(height / 12)).toString();
      heightIn = (height - (heightFt * 12)).toString();
    }

    this.form = this.fb.group({
      firstName: [
        firstName,
        [required, maxLength(MAX_LENGTH)]
      ],
      lastName: [
        lastName,
        [required, maxLength(MAX_LENGTH)]
      ],
      dateOfBirth: [
        new Date(dateOfBirth),
        [required]
      ],
      phoneNumber: [
        phoneNumber.slice(3),
        [required, minLength(10)]
      ],
      // email: [
      //   {value: email, disabled: true},
      //   [required, pattern(EMAIL_VALIDATION), maxLength(MAX_LENGTH)]
      // ],
      gender: [gender || '—'],
      heightFt: [heightFt],
      heightIn: [heightIn],
      weight: [weight || '']
    });
  }

  selectUserPhoto(event: Event): void {
    if ((event.target as HTMLInputElement).files[0]) {
      this.isRendering = true;
      this.form.disable();
      const file: File = (event.target as HTMLInputElement).files[0];
      const reader = new FileReader();

      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        reader.onload = () => {
          this.imagePreview = reader.result;
          this.file = file;
          this.isRendering = false;
          this.form.enable();
        };
      } else {
        reader.onload = () => {
          fetch(reader.result as string)
            .then(res => {
              this.notificationService.showMessage('Image conversion');
              return res.blob();
            })
            .then(blob => heic2any({
              blob,
              toType: 'image/jpeg',
              quality: 0.7
            }))
            .then(conversionResult => {
              this.file = new File([conversionResult as Blob], 'avatar.jpg', {
                type: 'image/jpeg'
              });
              const url = URL.createObjectURL(conversionResult);
              this.imagePreview = this.sanitization.bypassSecurityTrustUrl(url);
            })
            .catch(() => {
              this.notificationService.showMessage('Image error');
            })
            .finally(() => {
              this.isRendering = false;
              this.form.enable();
            });
        };
      }
      reader.readAsDataURL(file);
    }
  }

  deleteUserPhoto(): void {
    this.file = null;
    this.imagePreview = null;
  }

  processUserAvatar(): Observable<HttpResponse<null> | null> {
    if (this.file && this.imagePreview) {
      return this.myInformationService.uploadUserPhoto(this.file)
        .pipe(
          switchMap(() => this.avatarService.createAvatar(this.file)),
          catchError((err: HttpErrorResponse) => {
            if (err.status === 402) {
              this.notificationService.showMessage(userNotifications.UNAVAILABLE_TO_GENERATE_AVATAR);
              return of(null);
            }
            return throwError(err);
          })
        );
    }

    if (this.file === null && this.imagePreview === null) {
      return this.myInformationService.deleteUserAvatar()
        .pipe(
          switchMap(() => {
            this.silhouetteId = null;
            this.store$.dispatch(deleteAvatar());
            return of(null);
          })
        );
    }

    return of(null);
  }

  onSubmit(): void {
    let height = (this.form.value.heightFt * 12 + +this.form.value.heightIn);
    if (height === 0) {
      height = null;
    }

    const firstName = this.form.value.firstName.trim();
    const lastName = this.form.value.lastName.trim();
    const {
      dateOfBirth,
      phoneNumber,
      gender,
      weight
    } = this.form.value;

    if (!firstName || !lastName || this.form.invalid) {
      this.form.reset({dateOfBirth, phoneNumber, firstName, lastName, gender});
      this.form.markAllAsTouched();
      return;
    }

    const inputMyInfo: MyInfoInterface = {
      firstName,
      lastName,
      dateOfBirth: moment(dateOfBirth).toDate().toISOString(),
      phoneNumber: getFullPhoneNumber(this.phonePrefix, phoneNumber),
      email: this.myInfoProps.email,
      silhouetteId: this.silhouetteId || undefined,
      gender: isEmptySetUndefined(gender),
      height: height || undefined,
      weight: +weight || undefined
    };

    this.form.disable();
    this.isLoading = true;

    this.processUserAvatar()
      .pipe(
        switchMap((res: null | HttpResponse<null>) => {
          inputMyInfo.silhouetteId = this.silhouetteId || undefined;
          if (res) {
            inputMyInfo.silhouetteId = res.headers.get('X-Loom-Status');
          }
          return this.myInformationService.updateInfo(inputMyInfo);
        }),
        map(res => res.data.myInfo),
        take(1)
      )
      .subscribe((myInfo: MyInfoInterface) => {
        this.store$.dispatch(setMyInfo({myInfo}));
        this.router.navigate([NavigateState.site.home]);
      }, err => {
        this.notificationService.showMessage(handlerError(err));
      })
      .add(() => {
        this.isLoading = false;
        this.form.enable();
      });
  }
}
