/**
 * This service handles all operations related to business profiles.
 * @namespace BusinessProfileService
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
/**
 * BusinessProfileService is a class for handling all profile related operations.
 * @class BusinessProfileService
 */
export class BusinessProfileService {
  /**
   * businessProfile contains all business info for the current profile.
   */
  public businessProfile = null;

  constructor(private http: HttpClient) { }

  /**
   * Grabs a business by id from the database and sets it as the current profile.
   * @param id The unique number identifier for a business.
   */
  getProfileById(id) {
    return this.http.get(`/api/business/${id}`)
      .subscribe((business) => {
        this.businessProfile = business;
      });
  }

  /**
   * Refreshes the current profile.
   */
  async refreshProfile() {
    return this.http.get(`/api/business/${this.businessProfile.id}`)
      .subscribe((business) => {
        this.businessProfile = business;
      });
  }

  /**
   * Changes the currently selected business profile.
   * @param business An object of business information/
   */
  changeProfile(business) {
    this.businessProfile = business;
  }

  /**
   * Returns the currently selected business profile.
   */
  get currentProfile() {
    return this.businessProfile;
  }
}
