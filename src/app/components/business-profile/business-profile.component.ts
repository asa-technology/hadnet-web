import { Component, OnInit } from '@angular/core';
import { BusinessListing } from '../../models/BusinessListing';
import { BusinessListingService } from '../../services/business-listings/business-listing.service';
@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.css']
})
export class BusinessProfileComponent implements OnInit {
  businessListing: BusinessListing;
  constructor(private businessListingService: BusinessListingService ) { }

  ngOnInit() {
    this.businessListingService.getBusinessListings()
    .subscribe((businessListings) => {
      this.businessListing = businessListings[0];
      console.log(this.businessListing);
    });
  }
}
