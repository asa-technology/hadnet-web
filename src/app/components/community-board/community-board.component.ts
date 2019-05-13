import { Component, OnInit } from '@angular/core';
import { CommunityListingsService } from '../../services/community-listings/community-listings.service';
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-community-board',
  templateUrl: './community-board.component.html',
  styleUrls: ['./community-board.component.css']
})
export class CommunityBoardComponent implements OnInit {
  communityBoardListingsArray: any;
  constructor(private communityListingsService: CommunityListingsService,
              public authService: AuthService) { }

  ngOnInit() {
    this.getAllListings();
    console.log(this.communityBoardListingsArray);
    // testing all the functions
    // this.addListing('bbq', 'come to my backyard barbecue', '2019-05-12',
    // 'https://cdn.stockphotosecrets.com/wp-content/uploads/2018/08/hide-the-pain-stockphoto-840x560.jpg');
    // this.searchForListings('bb');
    // this.getAllListings();
    // this.removeListing(12, 2);
  }

    // dateExpire needs a format of '2019-05-12'
  addListing(title, body, dateExpire, imageUrl) {
      if (this.authService.isLoggedIn) {
        return this.communityListingsService.addCommunityListing(title, body, imageUrl, dateExpire, this.authService.currentLocalUser)
      .subscribe(addedListing => console.log(addedListing));
      }
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
    .subscribe(allListings => console.log(allListings));
  }

  searchForListings(title) {
    console.log(title);
    return this.communityListingsService.searchForCommunityListings(title)
    .subscribe(searchResults => console.log(searchResults));
  }
}
