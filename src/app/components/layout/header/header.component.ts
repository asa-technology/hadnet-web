import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { BusinessProfileService } from 'src/app/services/business-profile/business-profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showDescription1 = false;
  showDescription2 = false;
  showDescription3 = false;
  showDescription4 = false;
  showDescription5 = false;
  constructor(private authService: AuthService,
              private profileService: BusinessProfileService) { }

  ngOnInit() {
  }
}
