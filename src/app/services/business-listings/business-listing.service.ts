/**
 * This is a service to get business listings.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BusinessListing } from '../../models/BusinessListing';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * BusinessListingService is a class for getting a list of businesses from the server.
 */
export class BusinessListingService {
/**
 * businessListingsEndpoint is a variable to hold the server endpoint for business listings.
 */
  businessListingsEndpoint = '/api/business';
  constructor(private http: HttpClient) { }
/**
 * getBusinessImages gets an image for a business.
 * @returns an observable of a the business listings.
 */
  getBusinessListings(): Observable<BusinessListing[]> {
    return this.http.get<BusinessListing[]>(this.businessListingsEndpoint);
  }
}
