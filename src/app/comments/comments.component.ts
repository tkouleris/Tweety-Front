import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfig } from '../config/app-config';
import { HttpClient } from '@angular/common/http';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  private data:any;

  constructor(private route: ActivatedRoute, private commentService:CommentService) { }

  ngOnInit(): void
  {
    let tweet_id = this.route.snapshot.paramMap.get('tweet_id');
    this.commentService.getTweetComments(tweet_id).subscribe( (data:any) =>{
      this.data = data;
    },(err:any)=>{
      alert("Failure");
    });
  }
  }


}
