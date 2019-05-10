import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hadnet';

  constructor(private authService: AuthService) {}

  OnInit() {
    this.authService.refreshUserBusiness();
  }
}
