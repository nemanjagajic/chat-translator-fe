import React, { FC } from 'react'
import { FriendRequest } from '../../../ts/friends'

type FriendRequestItemProps = {
  friendRequest: FriendRequest
}

const FriendRequestItem: FC<FriendRequestItemProps> = ({
 friendRequest: { firstName, lastName }
}) => {
  return (
    <div className='flex flex-row'>
      <div>{firstName}</div>
      <div>{lastName}</div>
    </div>
  )
}

export default FriendRequestItem