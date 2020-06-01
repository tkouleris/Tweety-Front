import { Component, OnInit } from '@angular/core';
import { TweetService } from '../services/tweet.service';
import { Observable } from 'rxjs';
import { TweetPayload } from '../dto/tweet-payload';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css']
})
export class TweetsComponent implements OnInit {

  tweets :Observable<Array<TweetPayload>>;
  constructor(private tweetService: TweetService) { }

  ngOnInit(): void {
    // this.tweetService.getFeed().subscribe(
    //   (err:any)=>{
    //     console.log("Failure");
    //   }
    // );


    this.tweets = this.tweetService.getFeed();

  }

}
