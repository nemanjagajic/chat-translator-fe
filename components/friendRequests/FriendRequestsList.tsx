import React, { FC } from 'react'
import { FriendRequest } from '../../ts/friends'
import FriendRequestItem from './FriendRequestItem'
import { useLocale } from '../../hooks/i18n'
import { Chat } from '../../ts/chats'

type FriendRequestsListProps = {
  friendsRequests: FriendRequest[],
  chats?: Chat[]
}

const FriendRequestsList: FC<FriendRequestsListProps> = ({ friendsRequests, chats }) => {
  const { t } = useLocale()
  if (!friendsRequests) return null
  if (friendsRequests.length === 0) return (
    <div className='text-gray-400 mt-8'>{t.friends.requestListIsEmpty}</div>
  )

  return (
    <div>
      {friendsRequests.map(friendRequest => (
        <FriendRequestItem key={friendRequest._id} friendRequest={friendRequest} chats={chats} />
      ))}
    </div>
  )
}

export default FriendRequestsList