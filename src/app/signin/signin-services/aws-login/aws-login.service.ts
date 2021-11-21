import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';

import { environment } from 'src/environments/environment';
import { AuthService } from '../../auth.service';

@Injectable({
  providedIn: 'root',
})
export class AwsLoginService {
  constructor(private _router: Router, private _authService: AuthService) {}

  signIn(email: string, pass: string) {
    let authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: pass,
    });

    let poolData = {
      UserPoolId: environment.awsConfig.cognitoUserPoolId,
      ClientId: environment.awsConfig.cognitoAppClientId,
    };

    let userPool = new CognitoUserPool(poolData);

    let userData = {
      Username: email,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result: CognitoUserSession) => {
        this._authService.saveTokens(
          email,
          result.getIdToken().getJwtToken(),
          result.getRefreshToken().getToken()
        );
      },

      onFailure: (err) => {
        console.log(err.message || JSON.stringify(err));
      },
    });
  }
}
