import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appChangeValueFt]'
})
export class ChangeValueFtDirective {

  maxValue: number = 9;
  minValue: number = 0;

  constructor(
    private el: ElementRef
  ) {
  }

  @HostListener('input') onInput(): void {
    const value = parseInt(this.el.nativeElement.value);

    if (value > this.maxValue) this.el.nativeElement.value = `${this.maxValue} ft`;
    if (value < this.minValue) this.el.nativeElement.value = `${this.minValue} ft`;
  }
}
