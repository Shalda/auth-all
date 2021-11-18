import {Component, OnDestroy, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialogRef } from '@angular/material/dialog';
import { FirebaseLoginService } from './signin-services/firebase-login/firebase-login.service';
import { Subscription } from 'rxjs';
import { SigninService } from './signin.service';
import { AzureLoginService } from './signin-services/azure-login/azure-login.service';
import { AwsLoginService } from './signin-services/aws-login/aws-login.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  email_address: string = '';
  password: string = '';
  providerSubscription: Subscription;
  provider: string;
  constructor(
    private router: Router,
    public fbAuth: AngularFireAuth,
    public dialogRef: MatDialogRef<SigninComponent>,
    private _signService: SigninService,
    private _fbService: FirebaseLoginService,
    private _azService: AzureLoginService,
    private _awsService: AwsLoginService
  ) {}

  onSignIn(form: NgForm) {
    if (!form.valid) return;
    this.isLoading = true;
    switch (this.provider) {
      case 'firebase':
        this._fbService.signIn(this.email_address, this.password);
        break;
      case 'azure':
        this._azService.signIn(this.email_address, this.password);
        break;
      default:
        this._awsService.signIn(this.email_address, this.password);
    }
  }

  ngOnInit() {
    this.providerSubscription = this._signService
      .getProvider()
      .subscribe((providerName: string) => {
        console.log(providerName)
        this.provider = providerName;
      });
    this.fbAuth.onAuthStateChanged((user: any) => {
      if (user) {
        this.dialogRef.close();
      }
    });
  }
  ngOnDestroy() {
    this.providerSubscription.unsubscribe();
  }
}
