import { Injectable } from '@angular/core';
import { AppConfig } from '../config/app-config';
import { HttpClient } from '@angular/common/http';
import { TweetersResponse } from '../dto/tweeters-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  protected users_url:string = "user/list"

  constructor(private appConfig: AppConfig, private httpClient: HttpClient)
  {

  }

  getUserList(): Observable<TweetersResponse>
  {
    let full_feed_url :string = this.appConfig.api_url + this.users_url;
    return this.httpClient.get<TweetersResponse>(full_feed_url);
  }
}
