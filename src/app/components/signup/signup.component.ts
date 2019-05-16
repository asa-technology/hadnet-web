/**
 * SignupComponent
 */
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  /** Variable "accountType" is set to 'User' by default. */
  accountType = 'User';
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  /**
   * @description Function changeAcctType changes the type of an account to a business, or a regular user.
   * @param type Type takes a string representing a business owner, or a regular user.
   */
  changeAcctType(type: string) {
    this.accountType = type;
  }
}
