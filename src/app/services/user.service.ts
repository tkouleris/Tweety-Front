import { Injectable } from '@angular/core';
import { AppConfig } from '../config/app-config';
import { HttpClient } from '@angular/common/http';
import { TweetersResponse } from '../dto/tweeters-response';
import { Observable } from 'rxjs';
import {UserPayload} from "../dto/user-payload";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  protected users_url:string = "user/list"
  protected subscribe_url:string = "follow/user/"
  protected unsubscribe_url:string = "unfollow/user/"
  protected password_change_url:string = "user/change_password";

  constructor(private appConfig: AppConfig, private httpClient: HttpClient){}

  getUserList(): Observable<TweetersResponse>
  {
    let full_tweeters_list_url :string = this.appConfig.api_url + this.users_url;
    return this.httpClient.get<TweetersResponse>(full_tweeters_list_url);
  }

  subscribeToUser(user_id:number)
  {
    let full_subscription_url :string = this.appConfig.api_url + this.subscribe_url + user_id;
    return this.httpClient.post(full_subscription_url,null);
  }

  unsubscribeToUser(user_id:number)
  {
    let full_subscription_url :string = this.appConfig.api_url + this.unsubscribe_url + user_id;
    return this.httpClient.delete(full_subscription_url);
  }

  changePassword(userPayload:UserPayload)
  {
    let full_password_change_url :string = this.appConfig.api_url + this.password_change_url;
    return this.httpClient.post(full_password_change_url, userPayload);
  }
}
