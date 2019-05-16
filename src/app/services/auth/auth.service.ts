/**
 * This service handles all auth and user info.
 * @namespace AuthService
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
/**
 * AuthService is a class for handling all auth related operations.
 * @class AuthService
 */
export class AuthService {
  /**
   * user contains all Firebase related user information.
   * This is only for use with Firebase related operations.
   */
  user: User;
  /**
   * localUser contains all the user information stored in Hadnet's database.
   * This should be used most of the time when dealing with user info.
   */
  localUser;
  /**
   * usersBusiness is the business that is claimed by the logged in user.
   * This is used to bring up that business's profile when needed.
   */
  usersBusiness = null;
  /**
   * In the constructor, we attempt to initialize the user through Firebase
   * And then using the Firebase UID, we find the user in the database and set localUser.
   */
  constructor(public afAuth: AngularFireAuth, public router: Router, public http: HttpClient) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        this.refreshUserBusiness();
        this.http.get(`/api/user/firebaseId/${this.user.uid}`).subscribe(localUser => this.localUser = localUser);
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }

  /**
   * Attempts to sign up a new user with the information they provided.
   * @param email A string representing the email the user is attempting to sign up with.
   * @param password A string representing the password the user is attempting to sign up with.
   * @param displayName A string representing the displayName the user is attempting to sign up with.
   */
  async signup(email: string, password: string, displayName: string) {
    try {
      await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      await this.user.updateProfile({ displayName });
      const userObj = {
        email: this.user.email,
        displayName: this.user.displayName,
        firebaseId: this.user.uid,
        accountType: 'User',
        urlImage: 'https://i.imgur.com/BNtJWJM.png'
      };
      this.http.post<any>('/api/user', userObj).subscribe();
      await this.http.get(`/api/user/firebaseId/${this.user.uid}`).subscribe(user => this.localUser = user);
      this.router.navigate(['']);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/weak-password') {
        alert('Error! The password is too weak.');
      } else {
        alert('Error! ' + errorMessage);
      }
    }
  }

  /**
   * Attempts to log in the user using the information they provided.
   * @param email A string representing an email the user is attempting to log in with.
   * @param password A string representing a password the user is attempting to log in with.
   */
  async login(email: string, password: string) {
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      await this.http.get(`/api/user/firebaseId/${this.user.uid}`).subscribe(user => this.localUser = user);
      await this.refreshUserBusiness();
      this.router.navigate(['']);
    } catch (e) {
      alert('Error! ' + e.message);
    }
  }

  /**
   * Logs out the currently logged in user.
   */
  async logout() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.localUser = null;
    this.usersBusiness = null;
    this.router.navigate(['login']);
  }

  /**
   * Logs in the user with their Facebook information.
   */
  async fbLogin() {
    try {
      const provider = new firebase.auth.FacebookAuthProvider();
      await this.afAuth.auth.signInWithPopup(provider);
      const userObj = {
        email: this.user.email,
        displayName: this.user.displayName,
        firebaseId: this.user.uid,
        accountType: 'User',
        urlImage: this.user.photoURL
      };
      this.http.post<any>('/api/user', userObj).subscribe();
      await this.http.get(`/api/user/firebaseId/${this.user.uid}`).subscribe(user => this.localUser = user);
      await this.refreshUserBusiness();
      this.router.navigate(['']);
    } catch (error) {
      alert('Error! ' + error.message);
    }
  }

  /**
   * Returns whether the user is logged in or not.
   * @return A boolean representing whether the user is logged in or not.
   */
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

  /**
   * Returns the currently logged in user's Firebase info.
   * @return A Firebase User object.
   */
  get currentUser() {
    return this.user;
  }

  /**
   * Returns the currently logged in user's local info.
   * @return A user's local information object.
   */
  get currentLocalUser() {
    return this.localUser;
  }

  /**
   * Returns the currently logged in user's claimed business.
   * @return A user's claimed business.
   */
  get currentUsersBusiness() {
    return this.usersBusiness;
  }

  /**
   * Attempts to reset a user's business.
   */
  refreshUserBusiness() {
    return this.http.get(`/api/business/firebaseId/${this.user.uid}`).subscribe(business => {
      this.usersBusiness = business;
    });
  }

  /**
   * Returns whether or not the currently logged in user has claimed a business.
   * @return A boolean representing whether the user has a claimed business.
   */
  hasBusiness() {
    return !!this.usersBusiness;
  }

  /**
   * Returns whether or not the currently logged in user can claim a business.
   * @return A boolean representing whether ther user can claim a business.
   */
  canClaimBusiness() {
    return !this.usersBusiness;
  }
}
