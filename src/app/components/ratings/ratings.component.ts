import { Component, OnInit } from '@angular/core';

import { BusinessRating } from '../../models/BusinessRating';
import { GetBusinessRatingsService } from '../../services/business-images-and-ratings/get-business-ratings.service';
import { GetUsersWhoReviewedService } from '../../services/business-images-and-ratings/get-users-who-reviewed.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RatingsService } from '../../services/ratings/ratings.service';
import { BusinessProfileService } from '../../services/business-profile/business-profile.service';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit {
  reviews: BusinessRating[];
  userProfilePic: string;
  userDisplayName: string;
  showReviewForm: boolean = false;
  constructor(private getBusinessRatingsService: GetBusinessRatingsService,
              private getUsersWhoReviewedService: GetUsersWhoReviewedService,
              private authService: AuthService,
              private ratingsService: RatingsService,
              private profileService: BusinessProfileService,) { }

  ngOnInit() {
    // the id of 1 needs to be dynamic, it'll happen through data binding but no time
    this.getBusinessRatingsService.getBusinessRatings(1) // needs to be the business's id
    .subscribe((reviews) => {
      this.reviews = reviews;
      // return usernames from the id's held on these reviews
      this.getUsersWhoReviewedService.getUsersWhoReviewed(7)
      .subscribe((user) => {
          console.log(user);
          console.log(user[0]);
          this.userProfilePic = user[0].urlImage;
          this.userDisplayName = user[0].displayName;
        });
    });
  }

  toggleForm() {
    this.showReviewForm = !this.showReviewForm;
  }

  submitReview(reviewText, rating) {
    const profile = this.profileService.currentProfile;
    const currentUser = this.authService.currentUser;
    const userInfo = {
      displayName: currentUser.displayName,
      email: currentUser.email,
      photoURL: currentUser.photoURL,
      uid: currentUser.uid
    }
    const review = {
      text: reviewText,
      ratingNumber: rating,
      idBusiness: profile.id,
      idUser: currentUser.uid,

    }
    this.ratingsService.sendUserReview(review).subscribe((response) => {
      console.log(response);
    });
    console.log(review);
    console.log('Review submitted!');
    console.log('User: ', userInfo);
    console.log('Rating: ', rating);
    console.log('Review: ', reviewText);
    this.toggleForm();
  }

}
