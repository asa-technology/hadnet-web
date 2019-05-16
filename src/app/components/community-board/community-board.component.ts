/**
 * CommunityBoardComponent
 */
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
  /** "loggedIn" is a variable representing whether or not a user is logged in, and thus, may or may not post to community listings. */
  loggedIn: boolean;
  /** "allListings" is a variable representing an array of all [[CommunityListing]]s in the database. */
  allListings: CommunityListing[];
  /** "title" is a variable representing the value of the title for a community listing in the form, to be submitted to the database. */
  title: any;
  /** "body" is a variable representing the value of the listing's body for a community listing in the form,
   * to be submitted to the database.
   */
  body: any;
  /** "dateExpire" is a variable representing the expiration date of an event to be posted in the community listings board. */
  dateExpire: any;
  /** "idUser" is a variable representing the ID of a user, to allow a user to remove listings if associated with their user ID. */
  idUser: any;
  /** "imageUrl" is a variable representing the URL of an image a user would like to associate with their community listing. */
  imageUrl: any;
  constructor(private communityListingsService: CommunityListingsService,
              public authService: AuthService) { }

  ngOnInit() {
    this.getAllListings();
  }

    /**
     * @description Function addListing takes in a title, body, expiration date, and an optional image url for a community
     * listings post.
     * @param title Title is the title of a community listing post.
     * @param body Body is the body of text describing a community listing.
     * @param dateExpire DateExpire requires a format similar to '2019-05-12', and is one day after the community listing event
     * is supposed to take place.
     * @param imageUrl ImageUrl is the url of an image the user wants to add to their community listing.
     */
  addListing(title, body, dateExpire, imageUrl) {
      return this.communityListingsService.addCommunityListing(title, body, imageUrl, dateExpire, this.authService.currentLocalUser.id)
      .subscribe(addedListing => this.getAllListings());
  }

  /**
   * @description Function removeListing takes in a listingId and an idUser, and removes the selected post if the user who posted
   * would like to delete it.
   * @param listingId ListingId is the ID associated with a community listing.
   * @param idUser IdUser is the ID associated with the currently logged in user.
   */
  removeListing(listingId, idUser) {
    return this.communityListingsService.removeCommunityListing(listingId, idUser)
    .subscribe(removedListing => {
      // after this, get all listings
    });
  }

  /**
   * @description Function getAllListings is called whenever the list of all community listings needs to be refreshed,
   * or accurately represent all community listings in the database.
   */
  getAllListings() {
    // assign this to state and *ngFor over all this data to display community listings
    return this.communityListingsService.getAllCommunityListings()
    .subscribe(allListings => this.allListings = allListings );
  }

  /**
   * @description Function searchForListings takes in the title of a community listing, and returns all community
   * listings matching part of the query.
   * @param title Title is the title of a community listing, to query the database for.
   */
  searchForListings(title) {
    return this.communityListingsService.searchForCommunityListings(title)
    .subscribe(searchResults => {});
  }

  /**
   * @description Function addEvent takes in a title, a body, a date of expiration, and an image url. It is called upon to add
   * a listing.
   * @param title Title represents the title of a community listing.
   * @param body Body represents the body of a community listing.
   * @param dateExpire DateExpire represents the date of expiration of a community listing.
   * @param imageUrl ImageUrl represents the image associated with a community listing.
   */
  addEvent(title, body, dateExpire, imageUrl): void {
    this.addListing(title, body, dateExpire, imageUrl);
  }
}
