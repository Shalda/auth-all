import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SigninService {
  private _loginProvider: BehaviorSubject<string> = new BehaviorSubject<string>(
    'firebase'
  );
  constructor(private _router: Router) {}
  setProvider(val: string) {
    if (val) {
      this._loginProvider.next(val);
    }
  }
  getProvider(): Observable<string> {
    return this._loginProvider.asObservable();
  }

  saveTokens(email: string, token: string, rToken: string) {
    let userObj = {
      email: email,
      token: token,
      refreshToken: rToken,
    };
    localStorage.setItem('userData', JSON.stringify(userObj));
    this._router.navigate(['dashboard']).catch((error) => console.log(error));
  }
}
