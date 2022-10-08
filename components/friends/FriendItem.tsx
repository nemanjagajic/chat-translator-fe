import React, { FC } from 'react'
import { Friend, FriendStatus } from '../../ts/friends'
import { useSendFriendRequest } from '../../hooks/friends'
import { toast } from 'react-toastify'
import ToastSuccess from '../shared/ToastSuccess'
import { useLocale } from '../../hooks/i18n'
import { useThemeContext } from '../../providers/ThemeProvider'
import socket from '../../sockets'

type FriendItemProps = {
  friend: Friend,
  isSearchList?: boolean,
  status?: FriendStatus | null
}

const FriendItem: FC<FriendItemProps> = (
  { friend: { _id, firstName, lastName, email},
  isSearchList = false, status }
) => {
  const { isDark } = useThemeContext()
  const { t } = useLocale()

  const { mutate: sendFriendRequest } = useSendFriendRequest(() => {
    socket.emit('friendSentRequest', _id)
    toast(<ToastSuccess text={t.friends.successfullySentFriendRequest} />)
  })

  const renderFriendStatusLabel = () => {
    if (!status) return null
    const { isMe, isFriend, isRequestReceived, isRequestSent } = status
    let onClick = () => {}
    let bgColor = 'bg-gray-400'
    let label = ''
    let cursor = 'cursor-default'

    if (isMe) label = t.friends.friendStatus.me
    if (isFriend) label = t.friends.friendStatus.friend
    if (isRequestSent) label = t.friends.friendStatus.requestSent
    if (isRequestReceived) label = t.friends.friendStatus.requestReceived
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
    <div
      className={`flex flex-row ${isDark ? 'bg-gray-300' : 'bg-gray-100'} w-96 my-4 mt-6 p-4 
    rounded-xl drop-shadow-sm justify-between items-center`}
      data-cy='friendItem'
    >
      <div className='flex flex-col'>
        <div className='text-gray-800'>{`${firstName} ${lastName}`}</div>
        <div className='text-sm text-gray-500'>{email}</div>
      </div>
      {isSearchList && renderFriendStatusLabel()}
    </div>
  )
}

export default FriendItem