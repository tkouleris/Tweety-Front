import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JsonAppConfigService } from './config/json-app-config.service';
import { AppConfig } from './config/app-config';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { RouterModule } from '@angular/router';
import { TweetsComponent } from './tweets/tweets.component';
import { HttpClientInterceptor } from './http-api-interceptor';
import { TweetModalComponent, TweetModalContent } from './modals/tweet-modal/tweet-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommentsComponent } from './comments/comments.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login-guard';
import { TweetersComponent } from './tweeters/tweeters.component';
import { UserTweetsComponent } from './user-tweets/user-tweets.component';

export function initializerFn(jsonAppConfigService: JsonAppConfigService) {
  return () => {
    return jsonAppConfigService.load();
  };
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    TweetsComponent,
    TweetModalComponent,
    TweetModalContent,
    CommentsComponent,
    TweetersComponent,
    UserTweetsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent},
      {path: '', component: LoginComponent, canActivate:[LoginGuard]},
      {path: 'register', component: RegisterComponent},
      {path: 'tweets', component: TweetsComponent, canActivate:[AuthGuard]},
      {path: 'comments/tweet/:tweet_id', component: CommentsComponent, canActivate:[AuthGuard]},
      {path: 'tweeters', component: TweetersComponent, canActivate:[AuthGuard]},
      {path: 'usertweets/:user_id', component: UserTweetsComponent, canActivate:[AuthGuard]},
    ]),
    NgbModule,
  ],
  providers: [
    AuthGuard,
    LoginGuard,
    {
      provide: AppConfig,
      deps: [HttpClient],
      useExisting: JsonAppConfigService
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [JsonAppConfigService],
      useFactory: initializerFn
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpClientInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
