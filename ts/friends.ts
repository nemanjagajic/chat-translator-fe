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

export interface FriendRequest {
  _id: string
  firstName: string
  lastName: string
  email: string,
  requestedByMe?: boolean
}

export type AllFriends = {
  friends: Friend[],
  friendRequests: FriendRequest[]
}