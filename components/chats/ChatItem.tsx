import React, { FC } from 'react'
import { Chat } from '../../ts/chats'

type ChatItemProps = {
  chat: Chat
}

const ChatItem: FC<ChatItemProps> = ({ chat: { friend, lastMessage } }) => {
  return (
    <div data-testid='chat-item'>
      <div>{`${friend.firstName} ${friend.lastName}`}</div>
      <div>{lastMessage.textTranslated || lastMessage.text}</div>
    </div>
  )
}

export default ChatItem