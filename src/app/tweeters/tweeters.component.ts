import { Component, OnInit } from '@angular/core';
import { TweetersResponse } from '../dto/tweeters-response';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tweeters',
  templateUrl: './tweeters.component.html',
  styleUrls: ['./tweeters.component.css']
})
export class TweetersComponent implements OnInit {

  tweeters :TweetersResponse;
  constructor(private userService: UserService, private authService: AuthService, private router:Router)
  {
    this.tweeters = {
      data: null
    }
  }

  ngOnInit(): void {
    this.userService.getUserList().subscribe( (data:TweetersResponse) =>{
      this.tweeters = data;
    },(err:any)=>{
      this.authService.logout();
      this.router.navigate(["/"]);
    });
  }
}
