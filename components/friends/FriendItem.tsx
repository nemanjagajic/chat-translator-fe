import React, { FC } from 'react'
import { Friend } from '../../ts/friends'
import { useSendFriendRequest } from '../../hooks/friends'
import { toast } from 'react-toastify'
import ToastSuccess from '../shared/ToastSuccess'
import { useLocale } from '../../hooks/i18n'

type FriendItemProps = {
  friend: Friend,
  isSearchList?: boolean
}

const FriendItem: FC<FriendItemProps> = (
  { friend: { _id, firstName, lastName},
  isSearchList = false }
) => {
  const { t } = useLocale()

  const { mutate: sendFriendRequest } = useSendFriendRequest(() => {
    toast(<ToastSuccess text={t.friends.successfullySentFriendRequest} />)
  })

  return (
    <div className='flex flex-row'>
      <div>{firstName}</div>
      <div>{lastName}</div>
      {isSearchList && (
        <div
          onClick={() => sendFriendRequest({ userId: _id })}
        >
          Send friend request
        </div>
      )}
    </div>
  )
}

export default FriendItem