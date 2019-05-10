import { Component, OnInit } from '@angular/core';
import { BusinessListing } from '../../models/BusinessListing';
import { BusinessListingService } from '../../services/business-listings/business-listing.service';
import { GetBusinessImagesService } from '../../services/business-images-and-ratings/get-business-images.service';
import { BusinessProfileService } from '../../services/business-profile/business-profile.service';
import { BusinessImage } from '../../models/BusinessImage';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpClient } from '@angular/common/http';

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

  constructor(private getBusinessImagesService: GetBusinessImagesService,
              private businessProfileService: BusinessProfileService,
              private authService: AuthService,
              private http: HttpClient ) { }

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
      const localUser = this.authService.currentLocalUser;
      await this.http.put<any>(`/api/business/${business.id}`, localUser).subscribe();
    } catch (error) {
      alert(error);
    }

  }
}
