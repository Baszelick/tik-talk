import { Pipe, PipeTransform } from '@angular/core';
import { API_URL } from '@tt/shared';

@Pipe({
  name: 'imgUrl',
})
export class ImgUrlPipe implements PipeTransform {
  transform(value: string | null): string | null {
    if (!value) return null;
    return `${API_URL}${value}`;
  }
}
