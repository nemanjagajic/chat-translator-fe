import React, { FC } from 'react'
import { FriendRequest } from '../../ts/friends'
import { useRespondToFriendRequest } from '../../hooks/friends'
import { toast } from 'react-toastify'
import ToastSuccess from '../shared/ToastSuccess'
import { useLocale } from '../../hooks/i18n'
import { Checkmark } from 'react-ionicons'
import { Close } from 'react-ionicons'
import { useCreateChat } from '../../hooks/chats'

type FriendRequestItemProps = {
  friendRequest: FriendRequest
}

const FriendRequestItem: FC<FriendRequestItemProps> = ({
 friendRequest: { _id, firstName, lastName, email, requestedByMe = false }
}) => {
  const { t } = useLocale()

  const { mutate: createChat } = useCreateChat()
  const { mutate: respondToFriendRequest } = useRespondToFriendRequest(() => {
    toast(<ToastSuccess text={t.friends.successfullyRespondedToRequest} />)
    createChat({ userId: _id })
  })

  return (
    <div className='flex flex-row bg-gray-100 w-96 my-4 mt-6 p-4 rounded-xl drop-shadow-sm justify-between'>
      <div className='flex flex-col'>
        <div className='text-gray-800'>{`${firstName} ${lastName}`}</div>
        <div className='text-sm text-gray-500'>{email}</div>
      </div>
      {!requestedByMe && (
        <div className='flex flex-row'>
          <div
            onClick={() => respondToFriendRequest({ userId: _id, accept: true })}
            className='flex items-center justify-center bg-teal-400 w-10 h-10 rounded-full cursor-pointer mx-2'
          >
            <Checkmark height='20px' width='15px' color='#ffffff' />
          </div>
          <div
            onClick={() => respondToFriendRequest({ userId: _id, accept: false })}
            className='flex items-center justify-center bg-red-400 w-10 h-10 rounded-full cursor-pointer mx-2'
          >
            <Close height='20px' width='15px' color='#ffffff' />
          </div>
        </div>
      )}
    </div>
  )
}

export default FriendRequestItem