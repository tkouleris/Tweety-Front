import { Injectable } from '@angular/core';
import { AppConfig } from '../config/app-config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private appConfig: AppConfig) { }

  login()
  {
    console.log(this.appConfig.api_url);
  }
}
