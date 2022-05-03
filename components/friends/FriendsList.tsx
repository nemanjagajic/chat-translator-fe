import React, { FC } from 'react'
import { Friend, FriendSearchItem } from '../../ts/friends'
import FriendItem from './FriendItem'
import { useLocale } from '../../hooks/i18n'

type MyFriendsListProps = {
  friends: Friend[] | FriendSearchItem[]
  isSearchList?: boolean
  isRefetching?: boolean
}

const FriendsList: FC<MyFriendsListProps> = ({
 friends,
 isSearchList = false,
 isRefetching = false
}) => {
  const { t } = useLocale()

  if (!friends) return null
  if (friends.length === 0 && isSearchList && !isRefetching) return (
    <div>{t.friends.noUsersMatchingSearch}</div>
  )

  return (
    <div>
      {friends.map(friend => <FriendItem key={friend._id} friend={friend} />)}
    </div>
  )
}

export default FriendsList