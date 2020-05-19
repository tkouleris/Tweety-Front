import { Injectable } from '@angular/core';
import { AppConfig } from '../config/app-config';
import { HttpClient } from '@angular/common/http';
import { LoginPayload } from '../dto/login-payload';
import { Observable } from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {LocalStorageService} from 'ngx-webstorage';
import { ApiResponse } from '../dto/api-repsonse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private login_url: string = "authenticate"

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
        if(response.data == null) return false;
        this.localStorageService.store('authenticationToken', response.data.jwt);
        this.localStorageService.store('username', response.data.username);
        return true;
    }));
  }
}
