import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { Friend, FriendStatus } from '../../ts/friends'
import { useSendFriendRequest } from '../../hooks/friends'
import { toast } from 'react-toastify'
import ToastSuccess from '../shared/ToastSuccess'
import { useLocale } from '../../hooks/i18n'
import { useThemeContext } from '../../providers/ThemeProvider'
import socket from '../../sockets'
import { Close } from 'react-ionicons'
import * as Sentry from '@sentry/react'
import ToastError from '../shared/ToastError'

type FriendItemProps = {
  friend: Friend,
  isSearchList?: boolean,
  status?: FriendStatus | null
  setIsSettingsModalOpen?: Dispatch<SetStateAction<boolean>>
  setActiveFriendIdToDelete?: Dispatch<SetStateAction<string>>
}

const FriendItem: FC<FriendItemProps> = (
  { friend: { _id, firstName, lastName, email},
  isSearchList = false, status , setIsSettingsModalOpen, setActiveFriendIdToDelete}
) => {
  const { isDark } = useThemeContext()
  const { t } = useLocale()

  const { mutate: sendFriendRequest } = useSendFriendRequest(() => {
    socket.emit('friendSentRequest', _id)
    toast(<ToastSuccess text={t.friends.successfullySentFriendRequest} />)
  }, (error: any) => {
    toast(<ToastError text={t.friends.failedToAddFriend} />)
    Sentry.captureException({ user: error.user, userId: _id })
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

  const renderRemoveFriendIcon = () => (
    <div
      onClick={() => {
        setIsSettingsModalOpen?.(true)
        setActiveFriendIdToDelete?.(_id)
      }}
      className='flex items-center justify-center bg-red-400 w-10 h-10 rounded-full cursor-pointer mx-2 my-1'
    >
      <Close height='20px' width='15px' color='#ffffff' />
    </div>
  )

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
      {isSearchList ? renderFriendStatusLabel() : renderRemoveFriendIcon()}
    </div>
  )
}

export default FriendItem