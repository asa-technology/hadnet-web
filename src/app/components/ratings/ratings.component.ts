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
  reviews;
  userProfilePic: string;
  userDisplayName: string;
  showReviewForm = false;
  constructor(private getBusinessRatingsService: GetBusinessRatingsService,
              private getUsersWhoReviewedService: GetUsersWhoReviewedService,
              private authService: AuthService,
              private ratingsService: RatingsService,
              private profileService: BusinessProfileService,
              private updateRatingService: UpdateRatingService) { }

  ngOnInit() {
    const profile = this.profileService.currentProfile;
    // the id of 1 needs to be dynamic, it'll happen through data binding but no time
    this.getBusinessRatingsService.getBusinessRatings(profile.id) // needs to be the business's id
    .subscribe((reviews) => {
      this.reviews = reviews;
      // return usernames from the id's held on these reviews
      this.reviews.forEach ((review) => {
        this.getUsersWhoReviewedService.getUsersWhoReviewed(review.idUser)
        .subscribe((user) => {
            review.userImage = user.urlImage;
            review.userName = user.displayName;
          });
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
    };
    const review = {
      text: reviewText,
      ratingNumber: rating,
      idBusiness: profile.id,
      idUser: currentUser.uid,

    };
    this.ratingsService.sendUserReview(review).subscribe((response) => {
    });
    this.updateRatingService.sendUserReview({id: profile.id}).subscribe(() => {
    });
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
    this.toggleForm();
  }

}
