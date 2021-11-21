import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat';
import UserCredential = firebase.auth.UserCredential;

import { AuthService } from '../../auth.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseLoginService {
  constructor(
    private router: Router,
    public firebAuth: AngularFireAuth,
    private _authService: AuthService
  ) {}

  signIn(email: string, pass: string) {
    this.firebAuth
      .signInWithEmailAndPassword(email, pass)
      .then((result: UserCredential) => {
        console.log('Login success');
        this.saveData();
      })
      .catch((error: Error) => {
        console.log(error);
      });
  }

  saveData() {
    this.firebAuth.user.subscribe((user) => {
      if (user) {
        let token = '';
        let refreshToken = user.refreshToken || '';
        let email = user.email || '';
        user.getIdToken().then((idToken: string) => {
          token = idToken;
          this._authService.saveTokens(email, token, refreshToken);
        });
      } else {
        this.router.navigate(['']);
      }
    });
  }
}
