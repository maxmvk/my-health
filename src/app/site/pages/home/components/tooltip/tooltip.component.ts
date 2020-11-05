import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TooltipDataInterface} from 'src/app/shared/models';
import {ChartDataSets} from 'chart.js';
import {Label} from 'ng2-charts';
import {HealthLabService, NotificationService} from 'src/app/shared/services';
import {map, take} from 'rxjs/operators';
import * as moment from 'moment';
import {handlerError} from 'src/app/shared/utils';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {
  @Input() tooltipInfo: TooltipDataInterface;
  @Output() selectTooltipName: EventEmitter<string> = new EventEmitter<string>();

  chartData: ChartDataSets[] = [
    { data: [], label: '' },
  ];
  chartLabels: Label[] = [];

  constructor(
    private notificationService: NotificationService,
    private healthLabService: HealthLabService,
  ) {
  }

  ngOnInit(): void {
    this.chartData[0].label = this.tooltipInfo.title;
    if (this.tooltipInfo.type === 'Personal') {
      this.healthLabService.getAgeomeHistory(this.tooltipInfo.ageomeType)
      .pipe(
        map(res => res.data.ageomesHistory),
        take(1)
      )
      .subscribe(ageomesHistory  => {
        ageomesHistory.reverse().map(ageome => {
          this.chartData[0].data.push(ageome.ageomeValue);
          this.chartLabels.push(moment(new Date(ageome.timestamp)).format('MMM'));
        });
      }, err => {
        this.notificationService.showMessage(handlerError(err));
      });
    }
  }

  onClose(): void {
    this.selectTooltipName.emit(null);
  }
}
