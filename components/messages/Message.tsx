import React, { FC, memo } from 'react'
import { Message } from '../../ts/messages'
import { useLoggedUser } from '../../hooks/auth'
import moment from 'moment'

type MessageProps = {
  message: Message,
  showDateSeparator: boolean,
  nextMessageDate: string,
  isRead: boolean
}

const Message: FC<MessageProps> = ({ message: {
  text,
  textTranslated,
  senderId,
  createdAt,
},
  showDateSeparator,
  nextMessageDate,
  isRead}) => {
  const loggedUser = useLoggedUser()
  const isMessageMine = senderId === loggedUser?._id

  return (
    <>
      <div
        data-testid='message-item'
        className={`flex flex-col ${isMessageMine ? 'self-end' : 'self-start'} bg-gray-300 m-4 p-2 w-60`}
      >
        <div>{textTranslated || text}</div>
        <div>{moment(createdAt).format('HH:mm')}</div>
        {isMessageMine && (
          <div>{isRead ? 'seen' : 'not seen'}</div>
        )}
      </div>
      {showDateSeparator && (
        <div>{moment(nextMessageDate).format('MMM DD, YYYY')}</div>
      )}
    </>
  )
}

export default memo(Message, (prevProps, nextProps) => {
  return JSON.stringify(prevProps.message) === JSON.stringify(nextProps.message) && prevProps.isRead === nextProps.isRead
})