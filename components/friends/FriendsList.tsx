import React, { FC } from 'react'
import { Friend } from '../../ts/friends'
import FriendItem from './FriendItem'

type MyFriendsListProps = {
  friends: Friend[]
}

const FriendsList: FC<MyFriendsListProps> = ({ friends }) => {
  if (!friends) return null

  return (
    <div>
      {friends.map(friend => <FriendItem key={friend._id} friend={friend} />)}
    </div>
  )
}

export default FriendsList