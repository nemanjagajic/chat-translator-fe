import React, { FC } from 'react'
import { Message as IMessage } from '../../ts/messages'
import Message from './Message'

type MessagesListProps = {
  messagesPages: IMessage[][] | null
}

const MessagesList: FC<MessagesListProps> = ({ messagesPages = null }) => {
  return (
    <div className='flex flex-col-reverse h-full w-full overflow-y-scroll'>
      {messagesPages?.map(messages => messages.map(message => <Message key={message._id} message={message} />))}
    </div>
  )
}

export default MessagesList