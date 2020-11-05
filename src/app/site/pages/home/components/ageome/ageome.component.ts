import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TooltipTypeInterface} from 'src/app/shared/models';

@Component({
  selector: 'app-ageome',
  templateUrl: './ageome.component.html',
  styleUrls: ['./ageome.component.scss']
})
export class AgeomeComponent {
  @Input() age: number;
  @Input() title: string;
  @Input() tooltipName: TooltipTypeInterface;
  @Input() selectedTooltip: string;
  @Output() selectTooltipName: EventEmitter<string> = new EventEmitter<string>();

  @Input('side') sideProps: 'left' | 'right' | 'bottom';

  openTooltip(tooltipName: string): void {
    this.selectTooltipName.emit(tooltipName);
  }
}
