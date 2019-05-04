import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BusinessListingService {

  constructor() { }

  getBusinessListings() {
    return [
      {
          id: 1,
          name: 'Autoserv',
          idBusinessType: 1,
          phoneNumber: 5044311231,
          email: 'autoserv@yahoo.com',
          urlHomepage: 'autoserv.com',
          address: '1800 North Broad St New Orleans',
          idFeaturedImage: 1,
          latitude: 29.977350,
          longitude: -90.077200,
          idUser: 1,
          averageRating: 4,
          legalBusinessName: 'Autoserv',
      }, {
          id: 2,
          name: 'John and Sons Attorneys',
          idBusinessType: 2,
          phoneNumber: 5041424231,
          email: 'johnandsons@gmail.com',
          urlHomepage: 'lawyerjohn.com',
          address: '4700 South Carrolton New Orleans',
          idFeaturedImage: 2,
          latitude: 29.955100,
          longitude: -90.121190,
          idUser: 2,
          averageRating: 4,
          legalBusinessName: 'John and Sons Law Offices',
      }, {
          id: 3,
          name: 'Beauty Hair',
          idBusinessType: 3,
          phoneNumber: 5044323412,
          email: 'beautyhair@gmail.com',
          urlHomepage: 'beautyhair.com',
          address: '1800 North Broad St New Orleans',
          idFeaturedImage: 3,
          latitude: 29.975340,
          longitude: -90.078360,
          idUser: 3,
          averageRating: 5,
          legalBusinessName: 'Beautyhair Inc.',
      }];
  }
}
