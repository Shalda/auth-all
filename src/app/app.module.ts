import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';

import { AngularFireModule } from '@angular/fire/compat';
import { MSAL_INSTANCE, MsalModule, MsalService } from '@azure/msal-angular';
import { AppRoutingModule } from './app-routing.module';
import {
  IPublicClientApplication,
  PublicClientApplication,
} from '@azure/msal-browser';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SigninComponent } from './signin/signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.azureADConfig.clientId,
      // redirectUri: 'http://localhost:4200',
      redirectUri: 'https://shalda.github.io/auth-all/',
      // postLogoutRedirectUri:'https://shalda.github.io/auth-all/'
      redirectUri: 'http://localhost:4200',
      postLogoutRedirectUri:'/'
    },
  });
}

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    DashboardComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    MatRadioModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MsalModule,
  ],
  providers: [
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    MsalService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
