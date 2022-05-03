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
  { friend: { _id, firstName, lastName, email},
  isSearchList = false }
) => {
  const { t } = useLocale()

  const { mutate: sendFriendRequest } = useSendFriendRequest(() => {
    toast(<ToastSuccess text={t.friends.successfullySentFriendRequest} />)
  })

  return (
    <div className='flex flex-row bg-gray-100 w-96 my-4 mt-6 p-4 rounded-xl drop-shadow-sm justify-between items-center'>
      <div className='flex flex-col'>
        <div className='text-gray-800'>{`${firstName} ${lastName}`}</div>
        <div className='text-sm text-gray-500'>{email}</div>
      </div>
      {isSearchList && (
        <div
          onClick={() => sendFriendRequest({ userId: _id })}
          className='bg-teal-400 text-white py-1 px-3 rounded-2xl cursor-pointer'
        >
          {t.friends.sendRequest}
        </div>
      )}
    </div>
  )
}

export default FriendItem