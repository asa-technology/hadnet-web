import { Component, OnInit } from '@angular/core';
import { BusinessListing } from '../../models/BusinessListing';
import { BusinessListingService } from '../../services/business-listings/business-listing.service';
import { GetBusinessImagesService } from '../../services/business-images-and-ratings/get-business-images.service';
import { BusinessImage } from '../../models/BusinessImage';

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

  constructor(private businessListingService: BusinessListingService, private getBusinessRatingService: GetBusinessImagesService ) { }

  ngOnInit() {
    this.businessListingService.getBusinessListings()
    .subscribe((businessListings) => {
      this.businessListing = businessListings[0];
      this.businessPhoneNumber = `${this.businessListing.phoneNumber}`;
      this.businessRating = `${this.businessListing.averageRating}`;
      this.getBusinessRatingService.getBusinessImages(this.businessListing.id)
          .subscribe((images) => {
          this.businessImages = images;
          });
      });
    }
  }
