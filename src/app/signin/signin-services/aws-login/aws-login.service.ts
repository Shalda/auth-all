import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AwsLoginService {

  constructor() { }
signIn(email: string, pass: string){
    console.log('aws');
}
}
