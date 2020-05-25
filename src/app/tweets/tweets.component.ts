import { Component, OnInit } from '@angular/core';
import { TweetService } from '../services/tweet.service';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css']
})
export class TweetsComponent implements OnInit {

  constructor(private tweetService: TweetService) { }

  ngOnInit(): void {
    this.tweetService.getFeed().subscribe(
      (err:any)=>{
        console.log("Failure");
      }
    );




  }

}
