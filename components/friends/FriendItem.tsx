import React, { FC } from 'react'
import { Friend } from '../../ts/friends'

type FriendItemProps = {
  friend: Friend
}

const FriendItem: FC<FriendItemProps> = ({ friend: { firstName, lastName } }) => {
  return (
    <div className='flex flex-row'>
      <div>{firstName}</div>
      <div>{lastName}</div>
    </div>
  )
}

export default FriendItem