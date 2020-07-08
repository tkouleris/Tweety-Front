import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TweetService } from '../services/tweet.service';
import { AuthService } from '../services/auth.service';
import { TweetyFeedResponse } from '../dto/tweety-feed-response';
import { SingleTweet } from '../dto/single-tweet';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TweetModalContent } from '../modals/tweet-modal/tweet-modal.component';

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
    private router:Router,
    private modalService:NgbModal
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

  editTweet(tweetid:number)
  {
    this.tweetService.getTweet(tweetid).subscribe( (data:SingleTweet) =>{
        console.log(data);
        const ref = this.modalService.open(TweetModalContent)
        ref.componentInstance.tweet = data.data
        //https://www.youtube.com/watch?v=XnSYkbRnVHE
    },(err:any)=>{

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
