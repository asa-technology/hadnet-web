/**
 * This is a service to get an send community listings.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommunityListing } from '../../models/CommunityListing';

@Injectable({
  providedIn: 'root'
})
/**
 * CommunityListingsService is a class for getting and sending community listings to the server.
 */
export class CommunityListingsService {

  constructor(private http: HttpClient) { }

  // dateExpire needs a format of '2019-05-12'
/**
 * addCommunityListing adds community listing for a business.
 * @param title title is the title of the post.
 * @param body body is the body of the post.
 * @param imageUrl url of the image.
 * @param dateExpire date for when the event expires.
 * @param idUser id of the user who posted it.
 * @returns observable for community listing.
 */
  addCommunityListing(title, body, imageUrl, dateExpire, idUser): Observable<CommunityListing[]> {
    return this.http.post<CommunityListing[]>('/api/community/add', {
      title, body, imageUrl, date_expire: dateExpire, idUser});
  }
/**
 * removeCommunityListing removes a community listing.
 * @param listingId id of the listing.
 * @param idUser id of the user.
 * @returns observable for community listing.
 */
  removeCommunityListing(listingId: number, idUser: number): Observable <CommunityListing[]> {
    return this.http.delete<CommunityListing[]>(`/api/community/remove?idUser=${idUser}&id=${listingId}`);
  }
/** getAllCommunityListings gets all the community listings.
 * @returns observable for community listings.
 */
  getAllCommunityListings(): Observable <CommunityListing[]> {
    return this.http.get<CommunityListing[]>('/api/community/getAll');
  }
/**
 * searchForCommunityListings searches for community listings.
 * @param title title of the community listings.
 * @returns an observable of community listings.
 */
  searchForCommunityListings(title: string): Observable <CommunityListing[]> {
    return this.http.get<CommunityListing[]>(`/api/community/search?title=${title}`); // takes a title as query
  }
}
