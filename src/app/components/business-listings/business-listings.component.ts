/**
 * BusinessListingsComponent
 */

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
 /** String representing the name of a business */
  title: string;
 /** Boolean representing whether or not business listings have all been loaded to page */
  loading: boolean;
 /** Array of businesses retrieved from database */
  businessListings;
  constructor(private businessListingService: BusinessListingService,
              private imageService: GetBusinessImagesService,
              private businessProfileService: BusinessProfileService,
              private searchService: SearchService,
              private router: Router) { }

  ngOnInit() {
    /** User's current latitude */
    let userCurrentLat: number;
    /** User's current longitude */
    let userCurrentLong: number;
    /** Variable representing the latitude of businesses, used for determining proximity */
    let businessLat: number;
    /** Variable representing the longitude of a business, used for determining proximity */
    let businessLong: number;
    /** Distance that one set of coordinates is from another set of coordinates */
    let distance: number;
    this.loading = true;
    this.businessListingService.getBusinessListings().subscribe( businessListings => {
      this.businessListings = businessListings;

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
          this.businessListings.sort((a, b) => (a.proximity > b.proximity) ? 1 : -1);
          this.businessListings = this.businessListings.slice(0, 50);
        });
      }
      this.loading = false;
    });
  }
/**
 * @description Function goToProfile takes in a business, changes the business displayed in
 *  business-profile component to the business argument, then redirects the user
 *  to the business-profile component
 * @param business Takes a business, and using the businessProfileService,
 * changes the business that business-profile displays
 */
  goToProfile(business) {
    this.businessProfileService.changeProfile(business);
    this.router.navigate(['/', 'business-profile']);
  }

  /**
   * @description onSubmit calls to the searchService method [searchForBusiness]
   * returning all businesses that match the search query
   *
   * "this.title" is the variable that the database is queried for
   */
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
