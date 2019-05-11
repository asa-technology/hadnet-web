import { Component, OnInit } from '@angular/core';
import { CommunityListingsService } from '../../services/community-listings/community-listings.service';
import { CommunityListing } from 'src/app/models/CommunityListing';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-community-board',
  templateUrl: './community-board.component.html',
  styleUrls: ['./community-board.component.css']
})
export class CommunityBoardComponent implements OnInit {
  allListings: CommunityListing[];
  title: any;
  body: any;
  dateExpire: any;
  idUser: any;
  imageUrl: any;


  constructor(private communityListingsService: CommunityListingsService, private getUserId: AuthService
    ) { }

  ngOnInit() {
this.getAllListings();
    // testing all the functions
    // this.addListing('bbq', 'come to my backyard barbecue', '2019-05-12', 1, 'https://cdn.stockphotosecrets.com/wp-content/uploads/2018/08/hide-the-pain-stockphoto-840x560.jpg');
    // this.searchForListings('bb');
    // this.getAllListings();
    // this.removeListing(12, 2);
  }

    // dateExpire needs a format of '2019-05-12'
  addListing(title, body, dateExpire, imageUrl) {
    //console.log(title, body);
    const currentUser = this.getUserId.currentLocalUser;
    return this.communityListingsService.addCommunityListing(title, body, imageUrl, dateExpire, currentUser)
    .subscribe(addedListing => this.getAllListings());
  }

  removeListing(listingId, idUser) {
    console.log(listingId, idUser);
    return this.communityListingsService.removeCommunityListing(listingId, idUser)
    .subscribe(removedListing => {
      console.log(removedListing, ' was removed from the database');
      // after this, get all listings
    });
  }

  getAllListings() {
    // assign this to state and *ngFor over all this data to display community listings
    return this.communityListingsService.getAllCommunityListings()
    .subscribe(allListings => this.allListings = allListings);
  }

  searchForListings(title) {
    console.log(title);
    return this.communityListingsService.searchForCommunityListings(title)
    .subscribe(searchResults => console.log(searchResults));
  }
  eventForm() {

  }
  addEvent(title, body, dateExpire, imageUrl): void {

    this.addListing(title, body, dateExpire, imageUrl);


  }
}
