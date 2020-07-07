import { Injectable } from '@angular/core';
import { AppConfig } from '../config/app-config';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginPayload } from '../dto/login-payload';
import { Observable } from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {LocalStorageService} from 'ngx-webstorage';
import { ApiResponse } from '../dto/api-repsonse';
import { RegistrationPayload } from '../dto/registration-payload';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private login_url: string = "authenticate";
  private register_url: string = "register";

  constructor(
    private appConfig: AppConfig,
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ){ }

  login(loginPaylod: LoginPayload): Observable<boolean>
  {
    let full_login_url : string = this.appConfig.api_url + this.login_url;
    return this.httpClient.post<ApiResponse>(full_login_url, loginPaylod).pipe(
      map(response=>{
        this.localStorageService.store('authenticationToken', response.data.jwt);
        this.localStorageService.store('username', response.data.username);
        this.localStorageService.store('userid', response.data.userid);
        return true;
    }))
  }

  register( registrationPayload: RegistrationPayload): Observable<any>
  {
    let full_register_url : string = this.appConfig.api_url + this.register_url;
    return this.httpClient.post(full_register_url,registrationPayload);
  }

  isAuthenticated():Boolean
  {
    return this.localStorageService.retrieve('username') !=null;
  }

  getLoggedInUserId()
  {
    return this.localStorageService.retrieve('userid');
  }

  logout()
  {
    this.localStorageService.clear('authenticationToken');
    this.localStorageService.clear('username');
    this.localStorageService.clear('userid');
  }
}
