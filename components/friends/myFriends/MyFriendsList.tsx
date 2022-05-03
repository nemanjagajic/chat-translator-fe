import React, { FC } from 'react'
import { Friend } from '../../../ts/friends'
import MyFriendItem from './MyFriendItem'

type MyFriendsListProps = {
  friends: Friend[]
}

const MyFriendsList: FC<MyFriendsListProps> = ({ friends }) => {
  if (!friends) return null

  return (
    <div>
      {friends.map(friend => <MyFriendItem key={friend._id} friend={friend} />)}
    </div>
  )
}

export default MyFriendsList