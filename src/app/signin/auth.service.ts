import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MsalService } from '@azure/msal-angular';
import { environment } from '../../environments/environment';
import { CognitoUserPool } from 'amazon-cognito-identity-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _loginProvider: BehaviorSubject<string> = new BehaviorSubject(
    'firebase'
  );
  private authStatusListener = new Subject<boolean>();

  constructor(
    private _router: Router,
    private firebAuth: AngularFireAuth,
    private msalAuth: MsalService
  ) {}
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  setAuthStatusListener(val: boolean) {
    this.authStatusListener.next(val);
  }
  setProvider(val: string) {
    if (val) {
      this._loginProvider.next(val);
    }
  }
  getProvider(): Observable<string> {
    return this._loginProvider.asObservable();
  }

  logout(provider: string) {
    switch (provider) {
      case 'firebase':
        this.logoutFirebase();
        break;
      case 'azure':
        this.logoutAzure();
        break;
      default:
        this.logoutAws();
    }
  }

  logoutFirebase() {
    this.firebAuth
      .signOut()
      .then(() => {
        this.clearAuthInfo();
      })
      .catch((error) => console.log(error));
  }
  logoutAzure() {
    this.msalAuth
      .logoutPopup({
        mainWindowRedirectUri: '/',
      })
      .subscribe((data) => {
        this.clearAuthInfo();
      });
  }
  logoutAws() {
    let poolData = {
      UserPoolId: environment.awsConfig.cognitoUserPoolId,
      ClientId: environment.awsConfig.cognitoAppClientId,
    };
    let userPool = new CognitoUserPool(poolData);
    let cognitoUser = userPool.getCurrentUser();
    cognitoUser?.signOut();
    this.clearAuthInfo();
    this._router.navigate([''])
  }
  saveTokens(email: string, token: string, rToken: string) {
    let userObj = {
      email: email,
      token: token,
      refreshToken: rToken,
    };
    localStorage.setItem('userData', JSON.stringify(userObj));
    this.authStatusListener.next(true);
    this._router.navigate(['dashboard']).catch((error) => console.log(error));
  }
  clearAuthInfo() {
    this.setAuthStatusListener(false);
    localStorage.setItem('userData', '');
  }
}
