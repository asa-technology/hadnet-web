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

  constructor(private getBusinessImagesService: GetBusinessImagesService,
              private businessProfileService: BusinessProfileService,
              private authService: AuthService,
              private http: HttpClient,
              private router: Router ) { }

  ngOnInit() {
    this.businessListing = this.businessProfileService.currentProfile;
    this.businessPhoneNumber = `${this.businessListing.phoneNumber}`;
    this.businessRating = `${this.businessListing.averageRating}`;
    this.getBusinessImagesService.getImageById(this.businessListing.id)
      .subscribe((images) => {
      console.log(images[0]);
      this.businessImage = images.url;
      });
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

  updateBusiness(business: {}, field: string, change: string) {

  }

  businessCanBeClaimed() {
    if (this.authService.canClaimBusiness() && !this.businessListing.idUser) {
      return true;
    } else {
      return false;
    }
  }

  isCurrentUsersBusiness() {
    if (this.authService.localUser.id === this.businessListing.idUser) {
      return true;
    } else {
      return false;
    }
  }
}
