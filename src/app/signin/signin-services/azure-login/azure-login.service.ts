import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AzureLoginService {

  constructor() { }
signIn(email: string, pass: string){
    console.log('azure')
}
}
