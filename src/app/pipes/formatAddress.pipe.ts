import { Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'formatAddress'})
export class FormatAddressPipe implements PipeTransform {
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
