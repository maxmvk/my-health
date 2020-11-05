import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotificationService, PersistenceService} from 'src/app/shared/services';
import {NavigateState, StorageStateEnum} from 'src/app/shared/utils';
import {environment} from 'src/environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-protection-page',
  templateUrl: './protection.component.html',
  styleUrls: ['./protection.component.scss']
})
export class ProtectionComponent implements OnInit {

  form: FormGroup;
  private readonly protectionKey = environment.protectionKey;

  constructor(
    private fb: FormBuilder,
    private persistenceService: PersistenceService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    persistenceService.get(StorageStateEnum.protectionKey) === this.protectionKey
      ? notificationService.showMessage('You have already key')
      : notificationService.showMessage('Please, enter a protection key');
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      key: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    const key = this.form.value.key.trim();

    if (key === this.protectionKey) {
      this.persistenceService.set(StorageStateEnum.protectionKey, key);
      this.router.navigate([NavigateState.auth.signIn])
        .then(() => {
          this.notificationService.showMessage('Successful');
        });
    } else {
      this.form.reset();
      this.notificationService.showMessage('The key is wrong. Please, try another');
      this.persistenceService.remove(StorageStateEnum.protectionKey);
    }
  }
}
