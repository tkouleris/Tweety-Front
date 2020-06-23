import { Component, OnInit } from '@angular/core';
import { TweetService } from '../services/tweet.service';
import { Observable } from 'rxjs';
import { TweetPayload } from '../dto/tweet-payload';
import { TweetyFeedResponse } from '../dto/tweety-feed-response';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css']
})
export class TweetsComponent implements OnInit {

  tweets :TweetyFeedResponse;
  constructor(private tweetService: TweetService, private authService: AuthService, private router:Router)
  {
    this.tweets = {
      data: null
    }
  }

  ngOnInit(): void {
    this.tweetService.getFeed().subscribe( (data:TweetyFeedResponse) =>{
      this.tweets = data;
    },(err:any)=>{
      this.authService.logout();
      this.router.navigate(["/"]);
    });
  }

  show_comments(tweet_id)
  {
    console.log(tweet_id);
  }
}
