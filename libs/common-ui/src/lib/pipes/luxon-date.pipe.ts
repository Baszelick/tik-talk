import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'luxonDate',
  standalone: true,
})
export class LuxonDatePipe implements PipeTransform {
  transform(value: string | null, format = 'dd.MM.yyyy'): string {
    if (!value) return '';

    return DateTime.fromISO(value).setLocale('ru').toFormat(format);
  }
}
