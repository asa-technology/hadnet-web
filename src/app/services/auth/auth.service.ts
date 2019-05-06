import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  constructor(public afAuth: AngularFireAuth, public router: Router) { 
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    })
  }

  async signup(email: string, password: string) {
    try {
      await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      this.router.navigate(['']);
    } catch (error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      if (errorCode === 'auth/weak-password') {
        alert('Error! The password is too weak.')
      } else {
        alert("Error! " + errorMessage)
      }
      console.log(error);
    }
  }

  async login(email: string, password: string) {
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      this.router.navigate(['']);
    } catch (e) {
      alert("Error! " + e.message);
    }
  }
  
  async logout() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['login'])
  }
  
  async fbLogin() {
    try {
      let provider = new firebase.auth.FacebookAuthProvider();
      await this.afAuth.auth.signInWithPopup(provider)
      this.router.navigate(['']);
    } catch(error) {
      alert("Error! " + error.message);
    }
  }
  
  async googleLogin() {
    try {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      await this.afAuth.auth.signInWithPopup(provider)
      this.router.navigate(['']);
    } catch(error) {
      alert("Error! " + error.message);
    }
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

  get currentUser() {
    return this.user;
  }
}
