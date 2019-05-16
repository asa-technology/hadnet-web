/**
 * This is a pipe to format addresses to two lines.
 */

/**
 * import Pipe and PipeTransform from @angular/core.
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'formatAddress'})
/**
 * FormatAddressPipe is a pipe for formatting an address.
 */
export class FormatAddressPipe implements PipeTransform {
/**
 * transform takes in a piped value and returns a transformed value.
 * @param address address being passed into the pipe.
 * @returns a string with the address formatted.
 */
  transform(address: string): string {
    let formatedAdd;
    if (address.includes(' New ')) {
    formatedAdd = `${address.split(' New ')[0]}
    New ${address.split(' New ')[1]}`;
    } else {
      formatedAdd = address;
    }
    return formatedAdd;
  }
}
