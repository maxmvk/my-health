import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {NavigateState} from '../../../shared/utils';


@Component({
  selector: 'app-check-email',
  templateUrl: './check-email.component.html',
  styleUrls: ['./check-email.component.scss']
})
export class CheckEmailComponent {
  instruction: string;

  constructor(
    private router: Router
  ) {
    const navigation = router.getCurrentNavigation();
    const state = navigation.extras.state;

    state ? this.setInstruction(state.email)
      : router.navigate([NavigateState.auth.authentication]);
  }

  setInstruction(email: string) {
    this.instruction = `to ${email}`;
  }
}
