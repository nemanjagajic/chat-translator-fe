import React, { FC } from 'react'
import { Friend, FriendStatus } from '../../ts/friends'
import { useSendFriendRequest } from '../../hooks/friends'
import { toast } from 'react-toastify'
import ToastSuccess from '../shared/ToastSuccess'
import { useLocale } from '../../hooks/i18n'

type FriendItemProps = {
  friend: Friend,
  isSearchList?: boolean,
  status?: FriendStatus | null
}

const FriendItem: FC<FriendItemProps> = (
  { friend: { _id, firstName, lastName, email},
  isSearchList = false, status }
) => {
  const { t } = useLocale()

  const { mutate: sendFriendRequest } = useSendFriendRequest(() => {
    toast(<ToastSuccess text={t.friends.successfullySentFriendRequest} />)
  })

  const renderFriendStatusLabel = () => {
    if (!status) return null
    const { isMe, isFriend, isRequestReceived, isRequestSent } = status
    let onClick = () => {}
    let bgColor = 'bg-gray-400'
    let label = ''
    let cursor = 'cursor-default'

    if (isMe) label = 'Me'
    if (isFriend) label = 'Friend'
    if (isRequestSent) label = 'Request sent'
    if (isRequestReceived) label = 'Request received'
    if (!isMe && !isFriend && !isRequestSent && !isRequestReceived) {
      onClick = () => sendFriendRequest({ userId: _id })
      bgColor = 'bg-teal-400'
      label = t.friends.sendRequest
      cursor = 'cursor-pointer'
    }

    return (
      <div
        onClick={onClick}
        className={`${bgColor} text-white py-1 px-3 rounded-2xl ${cursor}`}
      >
        {label}
      </div>
    )
  }

  return (
    <div className='flex flex-row bg-gray-100 w-96 my-4 mt-6 p-4 rounded-xl drop-shadow-sm justify-between items-center'>
      <div className='flex flex-col'>
        <div className='text-gray-800'>{`${firstName} ${lastName}`}</div>
        <div className='text-sm text-gray-500'>{email}</div>
      </div>
      {isSearchList && renderFriendStatusLabel()}
    </div>
  )
}

export default FriendItem