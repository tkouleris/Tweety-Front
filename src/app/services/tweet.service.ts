import { Injectable } from '@angular/core';
import { TweetPayload } from '../dto/tweet-payload';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../config/app-config';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  private feed_url: string = "tweet/feed";
  private tweets:Array<TweetPayload>;
  private tweet:TweetPayload;

  constructor(private appConfig: AppConfig, private httpClient: HttpClient)
  {
    this.tweet = {
      tweet_id: null,
      tweet_message: null
    }
    this.tweets = [];
  }

  getFeed(): Observable<Array<TweetPayload>>
  {
    let full_feed_url :string = this.appConfig.api_url + this.feed_url;
    console.log(this.tweet.tweet_id);
    return this.httpClient.get<any>(full_feed_url).pipe(
      map( response => {
          response.data.forEach(element => {
            this.tweet.tweet_id = element.tweet_id;
            this.tweet.tweet_message = element.tweet_message;

            this.tweets.push(this.tweet);
          });

          return this.tweets;
      }),
      catchError( error => {
          return throwError(error); // From 'rxjs'
      })
   ); // end of pipe

  }

}
