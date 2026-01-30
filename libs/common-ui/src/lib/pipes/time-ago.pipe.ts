import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'timeAgo',
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: string | null): string {
    if (!value) {
      return 'Когда-то';
    }


    const date = DateTime.fromISO(value, { zone: 'UTC' });

    const relative = date.setLocale('ru').toRelative()

    return relative || 'недавно'

    }
  //   const nowMSK = this.getCurrentMSK();
  //
  //
  //   const dateMSK = this.backendToMSK(value);
  //
  //
  //   const seconds = Math.floor((nowMSK.getTime() - dateMSK.getTime()) / 1000);
  //
  //   return this.formatTimeAgo(seconds);
  // }
  //
  //
  // private backendToMSK(backendDate: string): Date {
  //
  //   const utcDate = new Date(backendDate + 'Z');
  //
  //
  //   const mskOffset = 3 * 60 * 60 * 1000; // 3 часа в миллисекундах
  //   return new Date(utcDate.getTime() + mskOffset);
  // }
  //
  //
  // private getCurrentMSK(): Date {
  //   const nowUTC = new Date();
  //   const mskOffset = 3 * 60 * 60 * 1000;
  //   return new Date(nowUTC.getTime() + mskOffset);
  // }
  //
  // private formatTimeAgo(seconds: number): string {
  //   const minutes = Math.floor(seconds / 60);
  //   const hours = Math.floor(minutes / 60);
  //   const days = Math.floor(hours / 24);
  //   const weeks = Math.floor(days / 7);
  //   const months = Math.floor(days / 30);
  //   const years = Math.floor(days / 365);
  //
  //   if (seconds < 60) {
  //     return seconds < 10 ? 'только что' : `${seconds} сек. назад`;
  //   }
  //
  //   if (minutes < 60) {
  //     return `${minutes} ${this.pluralize(minutes, 'минуту', 'минуты', 'минут')} назад`;
  //   }
  //
  //   if (hours < 24) {
  //     if (hours >= 23 && hours < 24) {
  //       return 'вчера';
  //     }
  //     return `${hours} ${this.pluralize(hours, 'час', 'часа', 'часов')} назад`;
  //   }
  //
  //   if (days === 1) {
  //     return 'вчера';
  //   }
  //
  //   if (days < 7) {
  //     return `${days} ${this.pluralize(days, 'день', 'дня', 'дней')} назад`;
  //   }
  //
  //   if (weeks < 4) {
  //     return `${weeks} ${this.pluralize(weeks, 'неделю', 'недели', 'недель')} назад`;
  //   }
  //
  //   if (months < 12) {
  //     return `${months} ${this.pluralize(months, 'месяц', 'месяца', 'месяцев')} назад`;
  //   }
  //
  //   return `${years} ${this.pluralize(years, 'год', 'года', 'лет')} назад`;
  // }
  //
  // private pluralize(count: number, one: string, few: string, many: string): string {
  //   const mod10 = count % 10;
  //   const mod100 = count % 100;
  //
  //   if (mod10 === 1 && mod100 !== 11) return one;
  //   if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
  //   return many;
  // }
}
