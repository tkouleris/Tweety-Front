import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { TweetService } from 'src/app/services/tweet.service';
import { TweetPayload } from 'src/app/dto/tweet-payload';
import { Router } from '@angular/router';
import { SingleTweet } from 'src/app/dto/single-tweet';

@Component({
  selector: 'tweet-modal-content',
  templateUrl: './tweet-modal.content.html'
})
export class TweetModalContent {

  tweetPayload: TweetPayload;
  addTweetForm: FormGroup;
  tweet = new FormControl('');

  constructor(public activeModal: NgbActiveModal, private tweetService: TweetService, private router: Router)
  {
    this.addTweetForm = new FormGroup({
      tweet: this.tweet,
    });

    this.tweetPayload = {
      tweet_id: null,
      tweet_message: '',
      tweet_user_id: null
    }
  }

  loadData(tweetid:number)
  {
    this.tweetService.getTweet(tweetid).subscribe( (data:SingleTweet) =>{
      this.tweetPayload.tweet_id = data.data.tweet_id;
      this.addTweetForm.controls.tweet.setValue(data.data.tweet_message);
    },(error:any)=>{
      alert(error);
    });
  }

  update()
  {
    this.tweetPayload.tweet_message = this.addTweetForm.get('tweet').value;
    this.tweetService.updateTweet(this.tweetPayload).subscribe( data=>{
      window.location.reload();
    },error =>{
      alert(error);
    });
  }

  save(){
    if(this.tweetPayload.tweet_id > 0){
      this.update();
      return;
    }
    this.tweetPayload.tweet_message = this.addTweetForm.get('tweet').value;
    this.tweetService.newTweet(this.tweetPayload).subscribe( data=>{
      window.location.reload();
    }, error => {
      alert(error);
    });
  }

}

@Component({
  selector: 'tweet-modal',
  templateUrl: './tweet-modal.component.html'
})
export class TweetModalComponent {
  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(TweetModalContent);
  }


}
