import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BusinessListing } from '../../models/BusinessListing';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusinessListingService {
  businessListingsEndpoint = '/api/business';
  constructor(private http: HttpClient) { }

  getBusinessListings(): Observable<BusinessListing[]> {
    return this.http.get<BusinessListing[]>(this.businessListingsEndpoint);
  }
}
