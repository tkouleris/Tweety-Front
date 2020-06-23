import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { TweetModalComponent } from '../modals/tweet-modal/tweet-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  authService : AuthService;
  constructor(authService : AuthService, private router : Router)
  {
    this.authService = authService;
  }

  ngOnInit(): void
  {
  }

  logout()
  {
    this.authService.logout();
    this.router.navigateByUrl('');
  }



}
