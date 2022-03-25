import React, { FC } from 'react'
import { Chat } from '../../ts/chats'
import ChatItem from './ChatItem'

type ChatsListProps = {
  chats: Chat[]
}

const ChatsList: FC<ChatsListProps> = ({ chats = [] }) => {
  return (
    <div className='flex flex-col h-full w-full overflow-y-scroll'>
      {chats.map(chat => <ChatItem key={chat._id} chat={chat} />)}
    </div>
  )
}

export default ChatsList