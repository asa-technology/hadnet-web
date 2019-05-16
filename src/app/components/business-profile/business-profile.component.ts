/**
 * BusinessProfileComponent
 */
import { Component, OnInit } from '@angular/core';
import { BusinessListing } from '../../models/BusinessListing';
import { GetBusinessImagesService } from '../../services/business-images-and-ratings/get-business-images.service';
import { BusinessProfileService } from '../../services/business-profile/business-profile.service';
import { BusinessImage } from '../../models/BusinessImage';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.css']
})
export class BusinessProfileComponent implements OnInit {
  /** "businessListing" represents the current business object to be represented */
  businessListing: BusinessListing;
  businessImages: BusinessImage;
  /** "businessPhoneNumber" is a string that represents the businesses phone number */
  businessPhoneNumber: string;
  /** "businessRating" is a string representing a rating that's either 0 if unrated, or 1-5 depending on user ratings */
  businessRating: string;
  /** "businessImage" is a string representing the url of a business listing's image */
  businessImage: string;
  editorToggle: {} = {
    name: false,
    phone: false,
    email: false,
    address: false,
  };
  somethingChanged = false;

  constructor(private getBusinessImagesService: GetBusinessImagesService,
              private businessProfileService: BusinessProfileService,
              private authService: AuthService,
              private http: HttpClient,
              private router: Router ) { }

  ngOnInit() {
    /**
     * "this.businessListing" calls upon the businessProfileService to deliver the current
     * profile being stored in this service as a variable.
     */
    this.businessListing = this.businessProfileService.currentProfile;
    this.businessPhoneNumber = `${this.businessListing.phoneNumber}`;
    this.businessRating = `${this.businessListing.averageRating}`;
    if (this.businessListing.idFeaturedImage === null) {
      this.businessImage = 'https://i.imgur.com/BNtJWJM.png';
    } else {
      this.getBusinessImagesService.getFeaturedImage(this.businessListing.idFeaturedImage)
        .subscribe((image) => {
            this.businessImage = image.url;
        });
    }
  }

  /**
   * @description claimBusiness is a function only available to users who are logged in.
   * claimBusiness takes in a business object, and allows the user to claim the business
   * if they have not yet claimed a business.
   * @param business represents a business object, containing information about a business,
   * including it's ID, which is used to assign a business ID to a user.
   */
  async claimBusiness(business) {
    try {
      const user = this.authService.currentUser;
      await this.http.put<any>(`/api/business/claim/${business.id}`, user).subscribe();
      await this.http.put<any>(`/api/user/${user.uid}`, { account_type: 'Business' });
      await this.authService.refreshUserBusiness();
      this.router.navigate(['']);
    } catch (error) {
      alert(error);
    }
  }

/**
 * @description toggleEdit takes in a field representing an informative property on a business
 * profile, and allows the user to change this information if it belongs to a business the user owns.
 * @param field If edit button is clicked, this allows the logged in user who owns this business
 * to edit the information regarding this business.
 */
  toggleEdit(field) {
    this.editorToggle[field] = !this.editorToggle[field];
  }

  /**
   * @description updateBusiness takes in a business, a field to update, and the change that's being made.
   * @param business Business represents the [[BusinessListing]] that's being updated.
   * @param field Field is a string representing the property of [[BusinessListing]] that's being updated.
   * @param change Change is a string representing the new value being assigned to the "field".
   */
  async updateBusiness(business: BusinessListing, field: string, change: string) {
    try {
      const changeObj = {};
      changeObj[field] = change;
      await this.http.put(`/api/business/update/${business.id}`, changeObj, { responseType: 'text' }).subscribe();
      this.somethingChanged = true;
      setTimeout(() => this.somethingChanged = false, 5000);
      this.toggleEdit(field);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @description Function businessCanBeClaimed uses this.authService.isLoggedIn to check whether or not
   * the user is logged in, and checks whether or not there is a User ID associated with this business.
   * If not, the business is claimable by a logged in user.
   */
  businessCanBeClaimed() {
    if (this.authService.isLoggedIn && this.authService.canClaimBusiness() && !this.businessListing.idUser) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * @description Function isCurrentUsersBusiness checks whether or not a user is logged in
   * by calling this.authService.isLoggedIn, and compares the user's ID to the businessListing's
   * User ID. If they are equal, the user owns the business and may edit it's properties.
   */
  isCurrentUsersBusiness() {
    if (this.authService.isLoggedIn && this.authService.localUser.id === this.businessListing.idUser) {
      return true;
    } else {
      return false;
    }
  }
}
