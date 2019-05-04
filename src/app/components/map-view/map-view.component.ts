import { Component, OnInit } from '@angular/core';
declare let L;
declare let tomtom: any;

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const map = tomtom.L.map('map', {
      key: 'BATuQkjG9LX7IGcAzxbZVkXG1GUPsF68',
      basePath: '/assets/sdk',
      center: [ 30, -91 ],
      zoom: 15,
      source : 'vector'
    });
    const marker: any = tomtom.L.marker([29.9511, -90.0715]).addTo(map);
    marker.bindPopup('hadnet headquarters', 'address').openPopup();
  }

}
