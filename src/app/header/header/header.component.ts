import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { SigninService } from '../../signin/signin.service';
import { SigninComponent } from '../../signin/signin.component';
import { MatRadioChange } from '@angular/material/radio';
import { take } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  provider: string;
  constructor(
    public dialog: MatDialog,
    public auth: AngularFireAuth,
    public signInService: SigninService
  ) {}

  logout() {
    this.auth
      .signOut()
      .then(() => {
        localStorage.setItem('userData', '');
        console.log('Logout success');
      })
      .catch((error) => console.log(error));
  }
  openDialog() {
    this.dialog.open(SigninComponent);
  }
  onChange(event: MatRadioChange) {
    this.signInService.setProvider(event.value);
  }
  ngOnInit() {
    this.signInService
      .getProvider()
      .pipe(take(1))
      .subscribe((providerName: string) => (this.provider = providerName));
  }
}
