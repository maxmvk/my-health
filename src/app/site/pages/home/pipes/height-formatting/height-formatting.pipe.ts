import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'heightFormatting'
})
export class HeightFormattingPipe implements PipeTransform {
  transform(height: number): string | null {
    if (height) {
      const heightFt: number = Math.floor(height / 12);
      const heightIn: number = height - (heightFt * 12);

      return `${heightFt}' ${heightIn}”`;
    }

    return null;
  }
}
