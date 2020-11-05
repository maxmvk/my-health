import {Component, Input} from '@angular/core';
import {MyInfoInterface} from 'src/app/shared/models';

@Component({
  selector: 'app-avatar-container',
  templateUrl: './avatar-container.component.html',
  styleUrls: ['./avatar-container.component.scss']
})
export class AvatarContainerComponent {
  @Input('myInfo') myInfoProps: MyInfoInterface;
}
