import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { TweetService } from 'src/app/services/tweet.service';
import { TweetPayload } from 'src/app/dto/tweet-payload';
import { Router } from '@angular/router';

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

  save(){

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