import React, { FC, memo } from 'react'
import { Message } from '../../ts/messages'
import { useLoggedUser } from '../../hooks/auth'
import moment from 'moment'
import { Checkmark, CheckmarkDone } from 'react-ionicons'

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
        className={
          `flex flex-col 
          ${isMessageMine ? 'self-end bg-indigo-500 mt-1' : 'self-start bg-gray-200 mt-2'} 
          mx-4 max-w-[50%] rounded-3xl px-4 pt-2 pb-1 break-words`
        }
      >
        <div className={`${isMessageMine ? 'text-white' : 'text-gray-800'}`}>
          {isMessageMine ? text : (textTranslated || text)}
        </div>
        <div className={`flex flex-row items-center w-full ${isMessageMine ? 'justify-end' : 'justify-start'}`}>
          <div className={`text-xs mr-1 ${isMessageMine ? 'text-gray-300' : 'text-gray-500'}`}>{moment(createdAt).format('HH:mm')}</div>
          {isMessageMine && (
            <div>{isRead
              ? <CheckmarkDone height='15px' width='15px' color='#2dd4bf' />
              : <Checkmark height='15px' width='15px' color='#2dd4bf' />}
            </div>
          )}
        </div>
      </div>
      {showDateSeparator && (
        <div className='flex flex-row w-full items-center py-8 px-12'>
          <div className='flex flex-1 h-[1px] bg-gray-200' />
          <div className='px-6 text-gray-500 text-sm'>{moment(nextMessageDate).format('MMM DD, YYYY')}</div>
          <div className='flex flex-1 h-[1px] bg-gray-200' />
        </div>
      )}
    </>
  )
}

export default memo(Message, (prevProps, nextProps) => {
  return JSON.stringify(prevProps.message) === JSON.stringify(nextProps.message) && prevProps.isRead === nextProps.isRead
})