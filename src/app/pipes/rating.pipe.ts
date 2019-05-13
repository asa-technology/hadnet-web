import { Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'rating'})
export class RatingPipe implements PipeTransform {
  transform(rating): string {
    switch (rating) {
      case '1':
      case 1:
        return '&#9733;&#9734;&#9734;&#9734;&#9734;';
      case '2':
      case 2:
        return '&#9733;&#9733;&#9734;&#9734;&#9734;';
      case '3':
      case 3:
        return '&#9733;&#9733;&#9733;&#9734;&#9734;';
      case '4':
      case 4:
        return '&#9733;&#9733;&#9733;&#9733;&#9734;';
      case '5':
      case 5:
        return '&#9733;&#9733;&#9733;&#9733;&#9733;';
      case '0':
      case 0:
        return 'No ratings yet...';
    }
  }
}
