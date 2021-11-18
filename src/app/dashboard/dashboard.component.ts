import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public email?: string;
  public token: string;
  public refreshToken: string;
  constructor() {}

  ngOnInit(): void {
    if (localStorage.getItem('userData')){
      let info = JSON.parse(<string>localStorage.getItem('userData'));
      this.email = info['email']  || '';
      this.token = info['token']  || '';
      this.refreshToken = info['refreshToken']  || '';
    }
  }
}
