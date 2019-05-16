import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { BusinessProfileService } from 'src/app/services/business-profile/business-profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService,
              private profileService: BusinessProfileService) { }

  ngOnInit() {
  }
}
