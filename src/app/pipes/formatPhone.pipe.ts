import { Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'formatPhone'})
export class FormatPhonePipe implements PipeTransform {
  transform(phoneNum: string): string {
    return `(${phoneNum.slice(0, 3)}) ${phoneNum.slice(3, 6)}-${phoneNum.slice(6, 10)}`;
  }
}
