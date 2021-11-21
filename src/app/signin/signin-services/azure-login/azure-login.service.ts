import { Injectable } from '@angular/core';

import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';

import { AuthService } from '../../auth.service';

@Injectable({
  providedIn: 'root',
})
export class AzureLoginService {
  constructor(
    private _authService: MsalService,
    private _signService: AuthService
  ) {}

  signIn() {
    this._authService.loginPopup().subscribe(
      (response: AuthenticationResult) => {
        if (response.account) {
          this._authService.instance.setActiveAccount(response.account);
          this._signService.saveTokens(
            response.account.username,
            response.idToken,
            'use AcquireTokenSilent'
          );
        }
      },
      (error) => console.log(error)
    );
  }
}
