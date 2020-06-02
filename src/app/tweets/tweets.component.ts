import { Component, OnInit } from '@angular/core';
import { TweetService } from '../services/tweet.service';
import { Observable } from 'rxjs';
import { TweetPayload } from '../dto/tweet-payload';
import { TweetyFeedResponse } from '../dto/tweety-feed-response';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css']
})
export class TweetsComponent implements OnInit {

  tweets :TweetyFeedResponse;
  constructor(private tweetService: TweetService) { }

  ngOnInit(): void {
    // this.tweetService.getFeed().subscribe(
    //   (err:any)=>{
    //     console.log("Failure");
    //   }
    // );


    this.tweetService.getFeed().subscribe( (data:TweetyFeedResponse) =>{
      console.log(data);

    },(err:any)=>{
      console.log("Failure");
    });

  }

}
