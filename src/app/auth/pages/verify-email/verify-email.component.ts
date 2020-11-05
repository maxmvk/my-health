import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {NavigateState} from 'src/app/shared/utils';


@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent {
  title: string = 'Hello User!';

  constructor(
    private router: Router
  ) {
    const navigation = router.getCurrentNavigation();
    const state = navigation.extras.state as {fullName: string}

    state ? this.setFullName(state.fullName)
      : router.navigate([NavigateState.auth.authentication]);
  }

  setFullName(fullName: string) {
    this.title = `Hello ${fullName}!`;
  }
}
