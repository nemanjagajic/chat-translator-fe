import React, { FC } from 'react'
import { FriendRequest } from '../../ts/friends'
import FriendRequestItem from './FriendRequestItem'
import { useLocale } from '../../hooks/i18n'

type FriendRequestsListProps = {
  friendsRequests: FriendRequest[]
}

const FriendRequestsList: FC<FriendRequestsListProps> = ({ friendsRequests }) => {
  const { t } = useLocale()
  if (!friendsRequests) return null
  if (friendsRequests.length === 0) return (
    <div className='text-gray-400 mt-8'>{t.friends.requestListIsEmpty}</div>
  )

  return (
    <div>
      {friendsRequests.map(friendRequest => (
        <FriendRequestItem key={friendRequest._id} friendRequest={friendRequest} />
      ))}
    </div>
  )
}

export default FriendRequestsList