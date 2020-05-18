import { Injectable } from '@angular/core';
import { AppConfig } from '../config/app-config';
import { HttpClient } from '@angular/common/http';
import { LoginPayload } from '../dto/login-payload';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private login_url: string = "authenticate"

  constructor(private appConfig: AppConfig, private httpClient: HttpClient)
  {

  }

  login(loginPaylod: LoginPayload): Observable<boolean>
  {
    let full_login_url : string = this.appConfig.api_url + this.login_url;
    return this.httpClient.post(full_login_url, loginPaylod).pipe(map(data=>{
      // this.localStorageService.store('authenticationToken', data.authenticationToken);
      // this.localStorageService.store('username', data.username);
      return true;
    }));
  }
}
