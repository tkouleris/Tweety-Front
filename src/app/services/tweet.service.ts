import { Injectable } from '@angular/core';
import { TweetPayload } from '../dto/tweet-payload';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../config/app-config';
import { TweetyFeedResponse } from '../dto/tweety-feed-response';
import { SingleTweet } from '../dto/single-tweet';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  private feed_url: string = "tweet/feed";
  private create_tweet_url: string = "tweet/create";
  private user_tweet_url: string = "tweet/user/"
  private delete_tweet_url: string = "tweet/"
  private get_tweet_url: string = "tweet/"

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

  getTweet(tweetid:number)
  {
    let full_tweet_url :string = this.appConfig.api_url + this.get_tweet_url + tweetid;
    return this.httpClient.get<SingleTweet>(full_tweet_url);
  }

  getUserTweets(user_id)
  {
    let full_feed_url :string = this.appConfig.api_url + this.user_tweet_url + user_id;
    return this.httpClient.get<TweetyFeedResponse>(full_feed_url);
  }

  deleteTweet(tweetid)
  {
    let full_delete_url :string = this.appConfig.api_url + this.delete_tweet_url + tweetid;
    return this.httpClient.delete<any>(full_delete_url);
  }
}
