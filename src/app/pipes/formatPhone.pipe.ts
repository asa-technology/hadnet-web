/**
 * This is a pipe to format phone numbers to have parenthesis and a dash.
 */

/**
 * import Pipe and PipeTransform from @angular/core.
 */
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'formatPhone'})
/**
 * FormatPhonePipe is a pipe for formatting a phone number.
 */
export class FormatPhonePipe implements PipeTransform {
  /**
   * transform takes in a piped value and returns a transformed value.
   * @param phoneNum phone number being passed in to be formatted
   * @returns a string with a formatted phone number.
   */
  transform(phoneNum: string): string {
    return `(${phoneNum.slice(0, 3)}) ${phoneNum.slice(3, 6)}-${phoneNum.slice(6, 10)}`;
  }
}
