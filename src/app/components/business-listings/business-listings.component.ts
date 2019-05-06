import { Component, OnInit } from '@angular/core';
import { BusinessListing } from '../../models/BusinessListing';
import { BusinessListingService } from 'src/app/services/business-listings/business-listing.service';
import { GetBusinessImagesService } from 'src/app/services/business-images-and-ratings/get-business-images.service';

@Component({
  selector: 'app-business-listings',
  templateUrl: './business-listings.component.html',
  styleUrls: ['./business-listings.component.css']
})
export class BusinessListingsComponent implements OnInit {
  businessListings: BusinessListing[];
  constructor(private businessListingService: BusinessListingService, private imageService: GetBusinessImagesService) { }

  ngOnInit() {
    this.businessListingService.getBusinessListings().subscribe( businessListings => this.businessListings = businessListings);
  }

}
