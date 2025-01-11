export type UserDetails = {
    _id: string;
    name: string;
    userName: string;
    email?: string;
    profilePicture?: string;
    following?: string[];
    followers?: string[];
    createdAt?: string;
  };
  
  export type Comment = {
    _id: string;
    user: UserDetails;
    text: string;
    createdAt: string;
  };
  
  export interface TweetData {
    _id: string;
    user: UserDetails;
    text: string;
    media?: string[];
    likes: string[];
    saved: string[];
    comments: Comment[];
    reposts: string[];
    createdAt: string;
  }
  
  export interface CommentData {
    _id: string;
    user: UserDetails;
    tweet: TweetData[];
    text: string;
  }

export type NotificationData = {
    _id: string;
    sender: UserDetails;
    receiver: UserDetails;
    reference: string;
    createdAt: string;
    message: string;
    image: string;
    isRead: boolean;
  };


  export type FollowUser = {
    _id?: string;
    name?: string | undefined;
    profilePicture?: string;
    userName?: string;
    bio?: string;
    followers?: [];
    following?: [];
  };
  
  export interface User {
    _id: string;
    createdAt: string;
    email: string;
    name: string;
    password: string;
    profilePicture: string;
    bgImage: string;
    updatedAt: string;
    userName: string;
    followers: FollowUser[];
    following: FollowUser[];
    bio?: string;
    location?: string;
    web?: string;
    tweets: string[];
  }