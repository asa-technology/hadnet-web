import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  accountType: string = "User";
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  changeAcctType(type: string) {
    this.accountType = type;
  }
}
