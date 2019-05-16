/**
 * This is a service to get users who reviewed the business.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/User';

@Injectable({
  providedIn: 'root'
})
/**
 * GetUsersWhoReviewedService is a class for getting users who reviewed business from the server.
 */
export class GetUsersWhoReviewedService {
/**
 * userRatingsEndpoint is a variable to hold the server endpoint for users.
 */
  userRatingsEndpoint = '/api/user/';
  constructor(private http: HttpClient) { }
/**
 * getUsersWhoReviewed gets users who reviewed a business.
 * @param id id is the database id number of the user.
 * @returns an observable for the user.
 */
  getUsersWhoReviewed(id: number): Observable<User> {
    return this.http.get<User>(this.userRatingsEndpoint.concat(`${id}`));
}
}
