import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TweetService } from '../services/tweet.service';
import { AuthService } from '../services/auth.service';
import { TweetyFeedResponse } from '../dto/tweety-feed-response';

@Component({
  selector: 'app-user-tweets',
  templateUrl: './user-tweets.component.html',
  styleUrls: ['./user-tweets.component.css']
})
export class UserTweetsComponent implements OnInit {

  tweets :TweetyFeedResponse;
  authService:AuthService;

  constructor(
    authService:AuthService,
    private tweetService:TweetService,
    private route: ActivatedRoute,
    private router:Router
  )
  {
    this.authService = authService;
    this.tweets = {
      data: null
    }
  }

  ngOnInit(): void {
	  this.route.params.subscribe(routeParams => {
      this.tweetService.getUserTweets(routeParams.user_id).subscribe( (data:TweetyFeedResponse) =>{
            this.tweets = data;
      },(err:any)=>{
        this.authService.logout();
        this.router.navigate(["/"]);
      });
    });
  }

  deleteTweet(tweetid:number)
  {
    this.tweetService.deleteTweet(tweetid).subscribe( (data:any) =>{
      window.location.reload();
    },(err:any)=>{
      alert("Something went wrong")
    });
  }
}
