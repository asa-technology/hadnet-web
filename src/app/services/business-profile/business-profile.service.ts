import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BusinessProfileService {
  public businessProfile = null;

  constructor(private http: HttpClient) { }

  getProfileById(id) {
    return this.http.get(`/api/business/${id}`)
      .subscribe((business) => {
        this.businessProfile = business;
      });
  }

  async refreshProfile() {
    return this.http.get(`/api/business/${this.businessProfile.id}`)
      .subscribe((business) => {
        this.businessProfile = business;
      });
  }

  changeProfile(business) {
    this.businessProfile = business;
  }

  get currentProfile() {
    return this.businessProfile;
  }
}
