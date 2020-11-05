import {Component, Input} from '@angular/core';
import {MyInfoInterface} from 'src/app/shared/models';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent {
  @Input('myInfo') myInfoProps: MyInfoInterface;
}
