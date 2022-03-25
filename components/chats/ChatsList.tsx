import React, { FC } from 'react'
import { Chat } from '../../ts/chats'
import ChatItem from './ChatItem'

type ChatsListProps = {
  chats: Chat[]
}

const ChatsList: FC<ChatsListProps> = ({ chats = [] }) => {
  return (
    <>
      {chats.map(chat => <ChatItem key={chat._id} chat={chat} />)}
    </>
  )
}

export default ChatsList