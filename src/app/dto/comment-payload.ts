import { TweetPayload } from './tweet-payload';
import { TweetyUser } from './tweety-user';

export class CommentPayload{
    comment_id:number;
    comment_text:string;
    comment_user_id:TweetyUser
    comment_tweet_id:TweetPayload
}