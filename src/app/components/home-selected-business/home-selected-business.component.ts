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

  goToProfile(business) {
    this.businessProfileService.changeProfile(business);
    this.router.navigate(['/', 'business-profile']);
  }
}
