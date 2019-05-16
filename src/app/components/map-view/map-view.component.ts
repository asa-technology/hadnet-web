/**
 * MapViewComponent
 */
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { BusinessListingService } from 'src/app/services/business-listings/business-listing.service';
import { BusinessListing } from '../../models/BusinessListing';
import { environment } from 'src/environments/environment';
declare let L;
declare let tomtom: any;

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit {
  /** Variable "lat" is a variable representing the user's current latitude. */
  lat: number;
  /** Variable "long" is a variable representing the user's current longitude. */
  long: number;
  /** Variable "loading" is a boolean representing whether or not the map has loaded. */
  loading: boolean;
  /** Variable "selectedBusiness" is a [[BusinessListing]] which represents the business on the map that's been selected by the user. */
  selectedBusiness: BusinessListing;
  constructor(private businessListingService: BusinessListingService) { }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.long = position.coords.longitude;
        this.renderMap();
      });
    } else {
      this.lat =  29.9511;
      this.long = -90.0715;
      this.renderMap();
    }
// placeholder business so there's an initial value
    this.selectedBusiness = {
      id: 123123,
      name: 'Hadnet Headquarters',
      idBusinessType: 2352354,
      phoneNumber: 5044311223,
      email: 'autoserv@yahoo.com',
      urlHomepage: 'autoserv.com',
      address: '1800 North Broad St New Orleans',
      idFeaturedImage: 235235,
      latitude: 29.9511,
      longitude:  -90.077200,
      idUser: 2352345,
      averageRating: 3,
      legalBusinessName: 'Hadnet Headquarterz',
    };
  }

  /**
   * @description Function renderMap renders the map through the Tomtom Map API. RenderMap defines the product info,
   * references the path to where the css for the map is located, as well as info the map might need.
   *
   * A call to the businessListingService is made in order to render all business on the map by lat/long.
   */
  renderMap() {
    this.loading = true;
    tomtom.setProductInfo('Hadnet', '0.1');
    const map = tomtom.L.map('map', {
      key: environment.MAPS_API_KEY,
      basePath: '/assets/sdk',
      center: [ this.lat, this.long ],
      zoom: 15,
      source : 'vector'
    });
    this.businessListingService.getBusinessListings().subscribe( (businessListings) => {
      this.loading = false;
      businessListings.forEach((listing) => {
      const businessMarker: any = tomtom.L.marker([listing.latitude, listing.longitude]).addTo(map);
      // what shows up when a user clicks a pin on the map
      businessMarker.bindPopup(
        `<div>
        <strong>${listing.name}</strong><br>
        ${listing.address}<br>
        </div>`);
      businessMarker.on('click', () => {
        this.selectedBusiness = listing;
      });
    });
  });
  }
}
