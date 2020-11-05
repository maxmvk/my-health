import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appChangeValueIn]'
})
export class ChangeValueInDirective {

  maxValue: number = 11;
  minValue: number = 0;

  constructor(
    private el: ElementRef
  ) {
  }

  @HostListener('input') onInput(): void {
    const value = parseInt(this.el.nativeElement.value);

    if (value > this.maxValue) this.el.nativeElement.value = `${this.maxValue} in`;
    if (value < this.minValue) this.el.nativeElement.value = `${this.minValue} in`;
  }
}
