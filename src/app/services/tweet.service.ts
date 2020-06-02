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
  private tweets:Array<TweetPayload>;
  private tweet:TweetPayload;
  private tweety_user : TweetyUser;

  constructor(private appConfig: AppConfig, private httpClient: HttpClient)
  {
    this.tweety_user = new TweetyUser();

    this.tweet = {
      tweet_id: null,
      tweet_message: null,
      tweet_user_id: new TweetyUser()
    }
    this.tweets = [];
  }

  getFeed(): Observable<TweetyFeedResponse>
  {
    let full_feed_url :string = this.appConfig.api_url + this.feed_url;
    // console.log(this.httpClient.get<Array<TweetPayload>>(full_feed_url));
    return this.httpClient.get<TweetyFeedResponse>(full_feed_url);
  //   return this.httpClient.get<TweetyFeedResponse>(full_feed_url).pipe(
  //     map( response => {
  //         // response.data.forEach(element => {
  //         //   this.tweet.tweet_id = element.tweet_id;
  //         //   this.tweet.tweet_message = element.tweet_message;
  //         //   var t = new TweetyUser();
  //         //   t.username = element.tweet_user_id.username;
  //         //   t.email = element.tweet_user_id.email;
  //         //   t.user_id = element.tweet_user_id.user_id;
  //         //   this.tweet.tweet_user_id = t;


  //         //   this.tweets.push(this.tweet);
  //         //   console.log(this.tweets);
  //         // });

  //         return this.tweets;
  //     }),
  //     catchError( error => {
  //         return throwError(error); // From 'rxjs'
  //     })
  //  ); // end of pipe

  }

}
