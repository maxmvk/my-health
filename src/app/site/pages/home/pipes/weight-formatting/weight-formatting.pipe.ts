import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'weightFormatting'
})
export class WeightFormattingPipe implements PipeTransform {
  transform(weight: number): string | null {
    if (weight) return `${weight} lbs`;

    return null;
  }
}
