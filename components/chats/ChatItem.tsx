import React, { FC } from 'react'
import { Chat } from '../../ts/chats'

type ChatItemProps = {
  chat: Chat
}

const ChatItem: FC<ChatItemProps> = ({ chat: { friend, lastMessage } }) => {
  return (
    <div>
      <div>{`${friend.firstName} ${friend.lastName}`}</div>
      <div>{lastMessage.text}</div>
    </div>
  )
}

export default ChatItem