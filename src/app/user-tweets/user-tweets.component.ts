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

  constructor(
    private authService:AuthService,
    private tweetService:TweetService,
    private route: ActivatedRoute,
    private router:Router
  )
  {
    this.tweets = {
      data: null
    }
  }

  ngOnInit(): void {
    let user_id = this.route.snapshot.paramMap.get('user_id');
    this.tweetService.getUserTweets(user_id).subscribe( (data:TweetyFeedResponse) =>{
      this.tweets = data;
      console.log(this.tweets);
    },(err:any)=>{
      this.authService.logout();
      this.router.navigate(["/"]);
    });
  }

}
