import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { Subscription, take } from 'rxjs';

import { AzureLoginService } from '../signin/signin-services/azure-login/azure-login.service';

import { AuthService } from '../signin/auth.service';
import { SigninComponent } from '../signin/signin.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public provider: string;
  public authStatusSubscription: Subscription;
  public authStatus: boolean = false;
  constructor(
    public dialog: MatDialog,
    private _signInService: AuthService,
    private _azService: AzureLoginService
  ) {}

  logout() {
    this._signInService.logout(this.provider);
  }
  onLogin() {
    // if provider is MSAL  use microsoft popup window for login
    if (this.provider === 'azure') {
      this._azService.signIn();
    } else {
      this.dialog.open(SigninComponent);
    }
  }
  onProviderChange(event: MatRadioChange) {
    this._signInService.setProvider(event.value);
  }
  ngOnInit() {
    // get default provider
    this._signInService
      .getProvider()
      .pipe(take(1))
      .subscribe((providerName: string) => (this.provider = providerName));

    this.authStatusSubscription = this._signInService
      .getAuthStatusListener()
      .subscribe((status: boolean) => {
        this.authStatus = status;
      });
  }
  ngOnDestroy() {
    this.authStatusSubscription.unsubscribe();
  }
}
