export enum FriendsSelectedTab {
  myFriends = 'myFriends',
  receivedRequests = 'receivedRequests',
  sentRequests = 'sentRequests',
  addNewFriend = 'addNewFriend'
}

export interface Friend {
  _id: string
  firstName: string
  lastName: string
  email: string
}

export interface FriendRequest extends Friend{
  requestedByMe?: boolean
}

export interface FriendSearchItem extends Friend{
  isFriend?: boolean
}

export type AllFriends = {
  friends: Friend[],
  friendRequests: FriendRequest[]
}