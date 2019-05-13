import { Component, OnInit } from '@angular/core';
import { BusinessListing } from '../../models/BusinessListing';
import { BusinessListingService } from 'src/app/services/business-listings/business-listing.service';
import { GetBusinessImagesService } from 'src/app/services/business-images-and-ratings/get-business-images.service';
import { BusinessProfileService } from 'src/app/services/business-profile/business-profile.service';
import {SearchService} from '../../services/search/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-business-listings',
  templateUrl: './business-listings.component.html',
  styleUrls: ['./business-listings.component.css']
})
export class BusinessListingsComponent implements OnInit {
  title: string;
  loading: boolean;
  businessListings;
  constructor(private businessListingService: BusinessListingService,
              private imageService: GetBusinessImagesService,
              private businessProfileService: BusinessProfileService,
              private searchService: SearchService,
              private router: Router) { }

  ngOnInit() {
    let userCurrentLat: number;
    let userCurrentLong: number;
    let businessLat: number;
    let businessLong: number;
    let distance: number;
    this.loading = true;
    this.businessListingService.getBusinessListings().subscribe( businessListings => {
      // add filter here to filter business by proximity
      this.businessListings = businessListings;
      console.log(this.businessListings);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          userCurrentLat = position.coords.latitude * Math.PI / 180;
          userCurrentLong = position.coords.longitude * Math.PI / 180;
          this.businessListings.forEach((business) => {
            businessLat = business.latitude * Math.PI / 180;
            businessLong = business.longitude * Math.PI / 180;
            const x: number = (businessLong - userCurrentLong) * Math.cos((userCurrentLat + businessLat) / 2);
            const y: number = (businessLat - userCurrentLat);
            distance = Math.sqrt(x * x + y * y) * 6371;
            business.proximity = distance;
            if (business.idFeaturedImage === null) {
              business.ftImg = {
                url: 'https://i.imgur.com/BNtJWJM.png'
              };
            } else {
              this.imageService.getFeaturedImage(business.idFeaturedImage)
                .subscribe((image) => {
                    business.ftImg = image;
                });
            }
          });
          this.businessListings.sort((a, b) => (a.proximity > b.proximity) ? 1 : -1)
          this.businessListings = this.businessListings.slice(0, 50);
          console.log(this.businessListings);
        });
      }
      
      this.loading = false;
    });
  }

  checkListing(business) {
    console.log(business);
  }

  goToProfile(business) {
    this.businessProfileService.changeProfile(business);
    this.router.navigate(['/', 'business-profile']);
  }
  onSubmit() {
    this.searchService.searchForBusiness(this.title).subscribe( searchResults => {
      this.businessListings = searchResults;
      this.businessListings.forEach((business) => {
        this.imageService.getImageById(business.id)
          .subscribe((image) => {
            if (image) {
              business.ftImg = image;
            } else {
              business.ftImg = {
                url: 'https://i.imgur.com/BNtJWJM.png'
              };
            }
          });
      });
    });
  }

}
