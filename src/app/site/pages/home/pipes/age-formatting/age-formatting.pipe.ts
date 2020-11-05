import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'ageFormatting'
})
export class AgeFormattingPipe implements PipeTransform {
  transform(dateOfBirth: string): string | null {
    if (dateOfBirth) {
      const age = (new Date().getTime() - +new Date(dateOfBirth)) / (24 * 3600 * 365.25 * 1000);
      return Math.floor(age) + ' y.o.';
    }

    return null;
  }
}
