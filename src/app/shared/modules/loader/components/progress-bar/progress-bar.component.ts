import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements AfterViewInit {
  @ViewChild('bar') spinnerRef: ElementRef;

  @Input('color') colorProps: string = '#f1f1f1';

  ngAfterViewInit(): void {
    const el = this.spinnerRef.nativeElement;
    const svg = el.querySelector('svg');
    const bar = el.querySelector('mat-progress-bar')

    svg.style.display = 'none';
    bar.style.height = '2px';
  }
}
