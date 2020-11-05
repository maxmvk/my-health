import {Component, Input} from '@angular/core';
import {take} from 'rxjs/operators';
import {AuthenticationService, NotificationService} from 'src/app/shared/services';
import {handlerError} from 'src/app/shared/utils';

@Component({
  selector: 'app-verification-error',
  templateUrl: './verification-error.component.html',
  styleUrls: ['./verification-error.component.scss']
})
export class VerificationErrorComponent {
  @Input() enteredEmail: string;

  private totalSeconds: number = 75;
  showTimer: boolean = false;
  timeLeft: number;
  isLoading: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private notificationService: NotificationService
  ) {
  }

  resendVerification(): void {
    this.isLoading = true;
    this.authService.sendVerifyEmailLink(this.enteredEmail)
      .pipe(
        take(1)
      )
      .subscribe(() => {
        this.totalSeconds = 75;
        this.timeLeft = this.totalSeconds;
        this.showTimer = true;
        this.startCounter(this.totalSeconds);
      }, err => {
        if (err.graphQLErrors[0].statusCode === 406) {
          this.totalSeconds = (err.graphQLErrors[0].message / 1000) + 15;
          this.timeLeft = this.totalSeconds;
          this.showTimer = true;
          this.startCounter(this.totalSeconds);
        } else {
          this.notificationService.showMessage(handlerError(err));
        }
      })
      .add(() => {
        this.isLoading = false;
      });
  }

  private startCounter(seconds: number): void {
    if (seconds <= 0) {
      this.timeLeft = seconds;
      this.showTimer = false;
    } else {
      this.timeLeft = seconds;
      setTimeout(() => this.startCounter(seconds - 1), 1000);
    }
  }
}
