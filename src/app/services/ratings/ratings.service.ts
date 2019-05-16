/**
 * This is a service to create ratings.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * RatingsService is a class for creating ratings.
 */
export class RatingsService {
/**
 * reviewEndpoint is a variable to hold the server endpoint for business reviews.
 */
reviewEndpoint = '/api/review';
  constructor(private http: HttpClient) { }
  /**
   * sendUserReview creates a review.
   * @param review review to get added to the database.
   * @returns observable for review.
   */
  sendUserReview(review: any): Observable <any> {
    return this.http.post<any>(this.reviewEndpoint, review);
  }
}
