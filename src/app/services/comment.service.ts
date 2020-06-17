import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../config/app-config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private tweet_url:string = "tweet/";
  private comment_url:string = "/comment"

  constructor( private httpClient: HttpClient, private appConfig: AppConfig) { }

  getTweetComments(tweet_id): Observable<any>
  {
    let full_tweet_comments_url :string = this.appConfig.api_url + this.tweet_url + tweet_id + this.comment_url;
    return this.httpClient.get<any>(full_tweet_comments_url);
    // console.log(this.httpClient.get<any>(full_tweet_comments_url));
  }
}
