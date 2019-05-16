/**
 * This is a service to search listings.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * SearchService is a class for searching listings from the server.
 */
export class SearchService {
  /**
   * searchBusinessEndpoint is a variable to hold the server endpoint for business listings.
   */
searchBusinessEndpoint = 'api/business/search';
  constructor(private http: HttpClient) { }
  /**
   * searchForBusiness searches the database for a specific business.
   * @param query term to search business by.
   * @returns observable of business listings.
   */
  searchForBusiness(query: any): Observable <any> {
    return this.http.get<any>(`${this.searchBusinessEndpoint}/${query}`);
  }
}
