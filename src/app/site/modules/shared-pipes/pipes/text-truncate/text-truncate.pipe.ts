import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'textTruncate'
})
export class TextTruncatePipe implements PipeTransform {
  transform(value: string, size: number = 25): string | null {
    const str = value.trim();
    if (str) {
      return str.length > size ? str.slice(0, size - 1) + '…' : str;
    }

    return null;
  }
}
