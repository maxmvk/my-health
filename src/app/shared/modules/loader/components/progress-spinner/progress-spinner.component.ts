import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html'
})
export class ProgressSpinnerComponent implements AfterViewInit {
  @ViewChild('spinner') spinnerRef: ElementRef;

  @Input('color') colorProps: string = '#fff';
  @Input('diameter') diameterProps: number = 21;

  ngAfterViewInit(): void {
    const el = this.spinnerRef.nativeElement;
    const circle = el.querySelector('circle');
    circle.style.stroke = this.colorProps;
  }
}
