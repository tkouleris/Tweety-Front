import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../services/comment.service';
import { CommentsResponse } from '../dto/comments-response';
import { FormGroup, FormControl } from '@angular/forms';
import { CommentPayload } from '../dto/comment-payload';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  comments:CommentsResponse;
  CommenttForm: FormGroup;
  comment = new FormControl('');
  commentPayload : CommentPayload;

  constructor(private route: ActivatedRoute, private commentService:CommentService)
  {
    this.CommenttForm = new FormGroup({
      comment: this.comment,
    });

    this.commentPayload = {
      comment_id:null,
      comment_text:null,
      comment_user_id:null,
      comment_tweet_id:null
    }
  }

  ngOnInit(): void
  {
    let tweet_id = this.route.snapshot.paramMap.get('tweet_id');
    this.commentService.getTweetComments(tweet_id).subscribe( (data:CommentsResponse) =>{
      this.comments = data;
    },(err:any)=>{
      alert("Failure");
    });
  }

  addComment()
  {
    this.commentPayload.comment_text = this.CommenttForm.get('comment').value;
    let tweet_id = this.route.snapshot.paramMap.get('tweet_id');
    this.commentService.sendTweetComment(tweet_id, this.commentPayload).subscribe( data=>{
      window.location.reload();
    }, error => {
      alert(error);
    });
  }
}
