import { Injectable } from '@angular/core';
import { TweetPayload } from '../dto/tweet-payload';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../config/app-config';
import { CredentialsPayload } from '../dto/credentials-payload';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  private feed_url: string = "tweet/feed";

  constructor(private appConfig: AppConfig, private httpClient: HttpClient) { }

  getFeed(): Observable<Array<TweetPayload>>
  {
    let full_feed_url :string = this.appConfig.api_url + this.feed_url;
    return this.httpClient.get<Array<TweetPayload>>(full_feed_url);
  }
}
