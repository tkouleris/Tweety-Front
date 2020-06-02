import { TweetyUser } from './tweety-user';

export class TweetPayload
{
    tweet_id:number;
    tweet_message:string;
    tweet_user_id:TweetyUser = null;
}