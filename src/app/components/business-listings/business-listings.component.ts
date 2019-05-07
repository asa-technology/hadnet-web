import { Component, OnInit } from '@angular/core';
import { BusinessListing } from '../../models/BusinessListing';
import { BusinessListingService } from 'src/app/services/business-listings/business-listing.service';
import { GetBusinessImagesService } from 'src/app/services/business-images-and-ratings/get-business-images.service';
import { BusinessProfileService } from 'src/app/services/business-profile/business-profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-business-listings',
  templateUrl: './business-listings.component.html',
  styleUrls: ['./business-listings.component.css']
})
export class BusinessListingsComponent implements OnInit {
  businessListings: BusinessListing[];
  constructor(private businessListingService: BusinessListingService, 
              private imageService: GetBusinessImagesService,
              private businessProfileService: BusinessProfileService,
              private router: Router) { }

  ngOnInit() {
    this.businessListingService.getBusinessListings().subscribe( businessListings => this.businessListings = businessListings);
  }

  goToProfile(business) {
    this.businessProfileService.changeProfile(business);
    this.router.navigate(['/', 'business-profile']);
  }

}
