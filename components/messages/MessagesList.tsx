import React, { FC } from 'react'
import { Message as IMessage } from '../../ts/messages'
import Message from './Message'

type MessagesListProps = {
  messages: IMessage[]
}

const MessagesList: FC<MessagesListProps> = ({ messages = [] }) => {
  return (
    <div className='flex flex-col h-full w-full overflow-y-scroll'>
      {messages.map(message => <Message key={message._id} message={message} />)}
    </div>
  )
}

export default MessagesList