/**
 * This is a service to check if a business is in the database by image.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BusinessVerified } from '../../app/models/BusinessVerified';

@Injectable({
  providedIn: 'root'
})
export class GoogleTextService {
/**
 * verifiedBusinessEndpoint is a class for checking if businesses are in the db by an image.
 */
verifiedBusinessEndpoint = '/api/business/isVerified';
  constructor(private http: HttpClient) { }
  /**
   * isBusinessVerified sends an image to the server and returns business listings.
   * @param image image to be sent and processed for text.
   * @returns observable of business listings.
   */
  isBusinessVerified(image: any): Observable <any> {
    return this.http.post<any>(this.verifiedBusinessEndpoint, image);
  }
}
