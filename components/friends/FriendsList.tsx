import React, { FC } from 'react'
import { Friend, FriendSearchItem } from '../../ts/friends'
import FriendItem from './FriendItem'
import { useLocale } from '../../hooks/i18n'

type FriendsListProps = {
  friends: Friend[] | FriendSearchItem[]
  isSearchList?: boolean
  isRefetching?: boolean
}

const FriendsList: FC<FriendsListProps> = ({
 friends,
 isSearchList = false,
 isRefetching = false
}) => {
  const { t } = useLocale()

  if (!friends) return null
  if (isSearchList && friends.length === 0 && !isRefetching) return (
    <div className='text-gray-400 mt-8'>{t.friends.noUsersMatchingSearch}</div>
  )

  return (
    <div>
      {friends.map(friend => <FriendItem key={friend._id} friend={friend} isSearchList={isSearchList} />)}
    </div>
  )
}

export default FriendsList