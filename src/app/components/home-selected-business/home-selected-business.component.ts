/**
 * HomeSelectedBusinessComponent
 */
import { Component, OnInit, Input } from '@angular/core';
import { BusinessProfileService } from 'src/app/services/business-profile/business-profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-selected-business',
  templateUrl: './home-selected-business.component.html',
  styleUrls: ['./home-selected-business.component.css']
})

export class HomeSelectedBusinessComponent implements OnInit {
  @Input() selectedBusiness;
  constructor(private businessProfileService: BusinessProfileService,
              private router: Router) { }
  ngOnInit() {
  }

/**
 * @description Function goToProfile takes in a business object, and calls the businessProfileService's method
 * changeProfile, to switch the variable stored within the businessProfileService representing the current business
 * to the selected business. Upon changing the business profile page's business, the user is redirected to the 'business-profile'
 * component.
 * @param business Business represents the business to change the 'business-profile' component to, before navigating to that page.
 */
  goToProfile(business) {
    this.businessProfileService.changeProfile(business);
    this.router.navigate(['/', 'business-profile']);
  }

  /**
   * @description Function isHadnet checks whether or not the default/placeholder information is in place, and if it is,
   * the user is greeted with a description of how to navigate throughout the home page and the option of creating an account
   * or logging in.
   * @param businessName Businessname is an argument that gets compared to a placeholder, and decides whether or not a description
   * of how to navigate the home page is shown, or that a business has been selected and instructions are
   * replaced with business information.
   */
  isHadnet(businessName) {
    return businessName === 'Hadnet Headquarters' ? true : false;
  }
}
