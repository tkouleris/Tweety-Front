import { Injectable } from '@angular/core';
import { TweetPayload } from '../dto/tweet-payload';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../config/app-config';
import { map, catchError } from 'rxjs/operators';
import { TweetyUser } from '../dto/tweety-user';
import { TweetyFeedResponse } from '../dto/tweety-feed-response';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  private feed_url: string = "tweet/feed";

  constructor(private appConfig: AppConfig, private httpClient: HttpClient)
  {

  }

  getFeed(): Observable<TweetyFeedResponse>
  {
    let full_feed_url :string = this.appConfig.api_url + this.feed_url;
    return this.httpClient.get<TweetyFeedResponse>(full_feed_url);
  }

}
