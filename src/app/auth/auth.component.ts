import {Component, OnInit} from '@angular/core';
import {resetAvatar} from 'src/app/site/store/avatar/avatar.action';
import {Store} from '@ngrx/store';
import {PersistenceService} from 'src/app/shared/services';
import {StorageStateEnum} from '../shared/utils';
import {resetUser} from '../site/store';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(
    private store: Store,
    private persistenceService: PersistenceService
  ) {
  }

  ngOnInit(): void {
    this.persistenceService.remove(StorageStateEnum.avatarTokenExp);
    this.persistenceService.remove(StorageStateEnum.avatarToken);
    this.store.dispatch(resetUser());
    this.store.dispatch(resetAvatar());
  }
}
