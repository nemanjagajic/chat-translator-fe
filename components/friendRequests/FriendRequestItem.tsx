import React, { FC } from 'react'
import { FriendRequest } from '../../ts/friends'
import { useRespondToFriendRequest } from '../../hooks/friends'
import { toast } from 'react-toastify'
import ToastSuccess from '../shared/ToastSuccess'
import { useLocale } from '../../hooks/i18n'

type FriendRequestItemProps = {
  friendRequest: FriendRequest
}

const FriendRequestItem: FC<FriendRequestItemProps> = ({
 friendRequest: { _id, firstName, lastName, requestedByMe = false }
}) => {
  const { t } = useLocale()

  const { mutate: respondToFriendRequest } = useRespondToFriendRequest(() => {
    toast(<ToastSuccess text={t.friends.successfullyRespondedToRequest} />)
  })

  return (
    <div className='flex flex-row'>
      <div>{firstName}</div>
      <div>{lastName}</div>
      {!requestedByMe && (
        <div className='flex flex-row'>
          <div onClick={() => respondToFriendRequest({ userId: _id, accept: true })}>Accept</div>
          <div onClick={() => respondToFriendRequest({ userId: _id, accept: false })}>Decline</div>
        </div>
      )}
    </div>
  )
}

export default FriendRequestItem