import React, { FC } from 'react'
import { Friend } from '../../../ts/friends'

type MyFriendItemProps = {
  friend: Friend
}

const MyFriendItem: FC<MyFriendItemProps> = ({ friend: { firstName, lastName } }) => {
  return (
    <div className='flex flex-row'>
      <div>{firstName}</div>
      <div>{lastName}</div>
    </div>
  )
}

export default MyFriendItem