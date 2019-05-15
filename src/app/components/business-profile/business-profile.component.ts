import { Component, OnInit } from '@angular/core';
import { BusinessListing } from '../../models/BusinessListing';
import { BusinessListingService } from '../../services/business-listings/business-listing.service';
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
  businessListing: BusinessListing;
  businessImages: BusinessImage;
  businessPhoneNumber: string;
  businessRating: string;
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

  toggleEdit(field) {
    this.editorToggle[field] = !this.editorToggle[field];
  }

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

  businessCanBeClaimed() {
      if (this.authService.isLoggedIn && this.authService.canClaimBusiness() && !this.businessListing.idUser) {
      return true;
    } else {
      return false;
    }
  }

  isCurrentUsersBusiness() {
      if (this.authService.isLoggedIn && this.authService.localUser.id === this.businessListing.idUser) {
      return true;
    } else {
      return false;
    }
  }
}
