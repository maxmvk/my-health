import {Component, Input} from '@angular/core';
import {AgeomesInterface, MyInfoInterface, TooltipDataInterface, TooltipNamesInterface} from 'src/app/shared/models';
import {tooltipInfo, tooltipNames} from 'src/app/shared/tooltip.config';

@Component({
  selector: 'app-avatar-container',
  templateUrl: './avatar-container.component.html',
  styleUrls: ['./avatar-container.component.scss']
})
export class AvatarContainerComponent {
  @Input('myInfo') myInfoProps: MyInfoInterface;
  @Input('connHL') connHLProps: boolean;
  @Input('ageomes') ageomesProps: AgeomesInterface;

  tooltipInfo: TooltipDataInterface;
  tooltipNames: TooltipNamesInterface = tooltipNames;
  selectedTooltip: string;

  onOpenTooltip(tooltipName: string): void {
    this.tooltipInfo = tooltipInfo[tooltipName] || null;
    this.selectedTooltip = tooltipName;
  }
}
