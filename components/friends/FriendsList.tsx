import React, { FC } from 'react'
import { AllFriends, Friend, FriendSearchItem } from '../../ts/friends'
import FriendItem from './FriendItem'
import { useLocale } from '../../hooks/i18n'
import { useLoggedUser } from '../../hooks/auth'

type FriendsListProps = {
  friends: Friend[] | FriendSearchItem[]
  isSearchList?: boolean
  isRefetching?: boolean
  allFriends?: AllFriends
}

const FriendsList: FC<FriendsListProps> = ({
 friends,
 isSearchList = false,
 isRefetching = false,
 allFriends
}) => {
  const { t } = useLocale()
  const loggedUser = useLoggedUser()

  if (!friends) return null
  if (!isSearchList && friends.length === 0 && !isRefetching) return (
    <div className='text-gray-400 mt-8'>{t.friends.friendListEmpty}</div>
  )
  if (isSearchList && friends.length === 0 && !isRefetching) return (
    <div className='text-gray-400 mt-8'>{t.friends.noUsersMatchingSearch}</div>
  )

  const getFriendStatus = (friend: Friend) => ({
    isMe: friend._id === loggedUser?._id,
    isFriend: !!allFriends?.friends.find(currentFriend => currentFriend._id === friend._id),
    isRequestSent: !!allFriends?.friendRequests
      .find(currentFriend => currentFriend._id === friend._id && currentFriend.requestedByMe),
    isRequestReceived: !!allFriends?.friendRequests
      .find(currentFriend => currentFriend._id === friend._id && !currentFriend.requestedByMe)
  })

  return (
    <div>
      {friends.map(friend => (
        <FriendItem
          key={friend._id}
          friend={friend}
          isSearchList={isSearchList}
          status={isSearchList ? getFriendStatus(friend) : null}
        />
      ))}
    </div>
  )
}

export default FriendsList