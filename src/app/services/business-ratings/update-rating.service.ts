/**
 * This is a service to update business average rating.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * UpdateRatingService is a class for updating average rating on the server.
 */
export class UpdateRatingService {
  /**
   * updateRatingEndpoint is a variable to hold the server endpoint for updating business average ratings.
   */
  updateRatingEndpoint = '/api/business/avgreviews';
  constructor(private http: HttpClient) { }
/**
 * sendUserReview updates average ratings for a business.
 * @param id id is the database id number of the business.
 * @returns an observable for the business.
 */
  sendUserReview(id: any): Observable <any> {
    return this.http.put<any>(this.updateRatingEndpoint, id);
  }
}
