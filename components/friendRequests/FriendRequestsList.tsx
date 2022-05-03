import React, { FC } from 'react'
import { FriendRequest } from '../../ts/friends'
import FriendRequestItem from './FriendRequestItem'

type FriendRequestsListProps = {
  friendsRequests: FriendRequest[]
}

const FriendRequestsList: FC<FriendRequestsListProps> = ({ friendsRequests }) => {
  if (!friendsRequests) return null

  return (
    <div>
      {friendsRequests.map(friendRequest => (
        <FriendRequestItem key={friendRequest._id} friendRequest={friendRequest} />
      ))}
    </div>
  )
}

export default FriendRequestsList