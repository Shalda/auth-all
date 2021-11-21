import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { FirebaseLoginService } from './signin-services/firebase-login/firebase-login.service';
import { AzureLoginService } from './signin-services/azure-login/azure-login.service';
import { AwsLoginService } from './signin-services/aws-login/aws-login.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit, OnDestroy {
  public email_address: string = '';
  public password: string = '';
  public providerSubscription: Subscription;
  public authStatusSubscription: Subscription;
  public provider: string;

  constructor(
    public dialogRef: MatDialogRef<SigninComponent>,
    private _authService: AuthService,
    private _fbService: FirebaseLoginService,
    private _azService: AzureLoginService,
    private _awsService: AwsLoginService
  ) {}

  onSignIn(form: NgForm) {
    if (!form.valid) return;
    switch (this.provider) {
      case 'firebase':
        this._fbService.signIn(this.email_address, this.password);
        break;
      case 'azure':
        this._azService.signIn();
        break;
      case 'aws':
        this._awsService.signIn(this.email_address, this.password);
        break;
      default:
        this._fbService.signIn(this.email_address, this.password);
    }
  }

  ngOnInit() {
    //get current provider
    this.providerSubscription = this._authService
      .getProvider()
      .subscribe((providerName: string) => {
        this.provider = providerName;
      });
    //close modal window after login
    this.authStatusSubscription = this._authService
      .getAuthStatusListener()
      .subscribe((authStatus: boolean) => {
        if (authStatus && this.provider !== 'azure') {
          this.dialogRef.close();
        }
      });
  }
  ngOnDestroy() {
    this.providerSubscription.unsubscribe();
    this.authStatusSubscription.unsubscribe();
  }
}
