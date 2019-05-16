/**
 * This is a pipe to format phone numbers to have parenthesis and a dash.
 */

/**
 * import Pipe and PipeTransform from @angular/core.
 */
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'rating'})
/**
 * RatingPipe is a pipe for formatting a rating from number into stars.
 */
export class RatingPipe implements PipeTransform {
  /**
   * transform takes in a piped value and returns a transformed value.
   * @param rating rating is a number of the stars a rating has.
   * @returns a string of stars for the number of stars the rating has.
   */
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
