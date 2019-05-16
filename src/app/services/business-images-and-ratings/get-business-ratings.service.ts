/**
 * This is a service to get ratings
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BusinessRating } from '../../models/BusinessRating';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * GetBusinessRatingsService is a class for getting ratings from the server.
 */
export class GetBusinessRatingsService {
  businessRatingsEndpoint = '/api/review/business/';
  constructor(private http: HttpClient) { }
/**
 * getBusinessRatings gets ratings for a business.
 * @param id id is the database id of the business.
 * @returns an observable for the rating.
 */
  getBusinessRatings(id: number): Observable<BusinessRating[]> {
    return this.http.get<BusinessRating[]>(this.businessRatingsEndpoint.concat(`${id}`));
  }
}
