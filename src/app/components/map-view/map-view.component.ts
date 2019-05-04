import { Component, OnInit } from '@angular/core';
import { BusinessListingService } from 'src/app/services/business-listings/business-listing.service';
declare let L;
declare let tomtom: any;

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit {
  // gets all business listings for rendering on map
  constructor(private businessListingService: BusinessListingService) { }

  ngOnInit() {
    const map = tomtom.L.map('map', {
      key: 'BATuQkjG9LX7IGcAzxbZVkXG1GUPsF68',
      basePath: '/assets/sdk',
      center: [ 30, -91 ],
      zoom: 15,
      source : 'vector'
    });
    this.businessListingService.getBusinessListings().subscribe( (businessListings) => businessListings.forEach((listing) => {
      const businessMarker: any = tomtom.L.marker([listing.latitude, listing.longitude]).addTo(map);
      businessMarker.bindPopup(`<strong>${listing.name}</strong><br>${listing.address}`);
      console.log(listing);
    }));
    const marker: any = tomtom.L.marker([29.9511, -90.0715]).addTo(map);
    marker.bindPopup('hadnet headquarters', 'address').openPopup();
  }

}
