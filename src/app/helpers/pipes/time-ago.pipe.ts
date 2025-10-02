import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: string | Date | null): string {
    if (!value) {
      return 'Когда-то'
    }

    const now = new Date()
    const date = new Date(value + 'Z')
    const seconds = Math.floor((now.getTime() - date.getTime())/ 1000)
    const minutes = Math.floor(seconds/60)
    const hours = Math.floor(minutes/60)
    const days = Math.floor(hours / 24)
    const months = Math.floor(days / 30)
    const years = Math.floor(months / 12)

    if(seconds < 60) {
      return `${seconds} ${this.getPlural(seconds, ['секунду', 'секунды', 'секунд'])} назад`
    }

    if(minutes < 60) {
      return `${minutes} ${this.getPlural(minutes, ['минуту', 'минуты', 'минут'])} назад`
    }

    if(hours < 24) {
      if(days === 1){
        return 'вчера'
      }
      return `${hours} ${this.getPlural(hours, ['час', 'часа', 'часов'])} назад`
    }

    if(days < 30) {
      return `${days} ${this.getPlural(days, ['день', 'дня', 'дней'])} назад`
    }

    if(months < 12) {
      return `${months} ${this.getPlural(months, ['месяц', 'месяца', 'месяцев'])} назад`
    }

    return `${years} ${this.getPlural(years, ['год', 'года', 'лет'])} назад`
  }

  private getPlural(number:number, titles:[string, string, string]): string {
    const cases = [2, 0, 1, 1, 1, 2]
    const index = (number % 100 > 4 && number % 100 < 20)
    ? 2
      : cases[Math.min(number % 10, 5)]
    return titles[index]
  }

}
