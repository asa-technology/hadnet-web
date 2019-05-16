/**
 * RatingsComponent
 */

import { Component, OnInit } from '@angular/core';
import { BusinessRating } from '../../models/BusinessRating';
import { GetBusinessRatingsService } from '../../services/business-images-and-ratings/get-business-ratings.service';
import { GetUsersWhoReviewedService } from '../../services/business-images-and-ratings/get-users-who-reviewed.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RatingsService } from '../../services/ratings/ratings.service';
import { BusinessProfileService } from '../../services/business-profile/business-profile.service';
import { UpdateRatingService } from '../../services/business-ratings/update-rating.service';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})

export class RatingsComponent implements OnInit {
  /** Variable "reviews" are all reviews for given profile. Defined by a call to the getBusinessRatingsService method
   * getBusinessRatings.
   */
  reviews;
  /**
   * Variable "userProfilePic" represents an image url associated with the current user.
   */
  userProfilePic: string;
  /**
   * Variable "userDisplayName" is the current user's display name.
   */
  userDisplayName: string;
  /**
   * Variable "showReviewForm" is a boolean representing whether or not the user has the ability to review a business.
   * Users must be logged in to review businesses.
   */
  showReviewForm = false;
  constructor(private getBusinessRatingsService: GetBusinessRatingsService,
              private getUsersWhoReviewedService: GetUsersWhoReviewedService,
              private authService: AuthService,
              private ratingsService: RatingsService,
              private profileService: BusinessProfileService,
              private updateRatingService: UpdateRatingService) { }

  ngOnInit() {
    const profile = this.profileService.currentProfile;
    this.getBusinessRatingsService.getBusinessRatings(profile.id)
    .subscribe((reviews) => {
      this.reviews = reviews;
      // return userNames and userImages from the id's held on these reviews
      this.reviews.forEach ((review) => {
        this.getUsersWhoReviewedService.getUsersWhoReviewed(review.idUser)
        .subscribe((user) => {
            review.userImage = user.urlImage;
            review.userName = user.displayName;
          });
      });
    });
  }

  /**
   * @description Function toggleForm toggles whether or not a review form is available, which is dependant on whether or not a user
   * is logged in.
   */
  toggleForm() {
    this.showReviewForm = !this.showReviewForm;
  }

  /**
   * @description Function submitReview takes in review text, and a rating between 1 and 5. These are recorded and show up
   * on a business profile page.
   * @param reviewText ReviewText is the text body of a review.
   * @param rating Rating is a number, 1-5 representing the user's experience with a given business.
   */
  submitReview(reviewText, rating) {
    const profile = this.profileService.currentProfile;
    const currentUser = this.authService.currentUser;
    const userInfo = {
      displayName: currentUser.displayName,
      email: currentUser.email,
      photoURL: currentUser.photoURL,
      uid: currentUser.uid
    };
    const review = {
      text: reviewText,
      ratingNumber: rating,
      idBusiness: profile.id,
      idUser: currentUser.uid,
    };
    this.ratingsService.sendUserReview(review).subscribe((response) => {
      this.updateRatingService.sendUserReview({id: profile.id}).subscribe(() => {
        this.getBusinessRatingsService.getBusinessRatings(profile.id) // needs to be the business's id
        .subscribe((reviews) => {
          this.reviews = reviews;
          // return usernames from the id's held on these reviews
          this.reviews.forEach ((rev) => {
            this.getUsersWhoReviewedService.getUsersWhoReviewed(rev.idUser)
            .subscribe((user) => {
                rev.userImage = user.urlImage;
                rev.userName = user.displayName;
              });
          });
          this.reviews = reviews;
        });
      });
    });
    this.toggleForm();
  }
}
