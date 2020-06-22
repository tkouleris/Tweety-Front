import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../services/comment.service';
import { CommentsResponse } from '../dto/comments-response';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  comments:CommentsResponse;

  constructor(private route: ActivatedRoute, private commentService:CommentService) { }

  ngOnInit(): void
  {
    let tweet_id = this.route.snapshot.paramMap.get('tweet_id');
    this.commentService.getTweetComments(tweet_id).subscribe( (data:CommentsResponse) =>{
      this.comments = data;
    },(err:any)=>{
      alert("Failure");
    });
  }


}
