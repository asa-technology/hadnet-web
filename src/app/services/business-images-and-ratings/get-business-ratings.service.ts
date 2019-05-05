import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BusinessRating } from '../../models/BusinessRating';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetBusinessRatingsService {
  businessRatingsEndpoint = '/api/review/business/';
  constructor(private http: HttpClient) { }

  getBusinessRatings(id: number): Observable<BusinessRating[]> {
    return this.http.get<BusinessRating[]>(this.businessRatingsEndpoint.concat(`:${id}`));
  }
}
