import { Injectable } from '@angular/core';
import { TweetPayload } from '../dto/tweet-payload';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../config/app-config';
import { TweetyFeedResponse } from '../dto/tweety-feed-response';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  private feed_url: string = "tweet/feed";
  private create_tweet_url: string = "tweet/create";
  private user_tweet_url: string = "tweet/user/"

  constructor(private appConfig: AppConfig, private httpClient: HttpClient)
  {

  }

  getFeed(): Observable<TweetyFeedResponse>
  {
    let full_feed_url :string = this.appConfig.api_url + this.feed_url;
    return this.httpClient.get<TweetyFeedResponse>(full_feed_url);
  }

  newTweet(tweetPayload:TweetPayload)
  {
    let full_new_tweet_url :string = this.appConfig.api_url + this.create_tweet_url;
    return this.httpClient.post(full_new_tweet_url, tweetPayload);
  }

  getUserTweets(user_id)
  {
    let full_feed_url :string = this.appConfig.api_url + this.user_tweet_url + user_id;
    return this.httpClient.get<TweetyFeedResponse>(full_feed_url);
  }
}
