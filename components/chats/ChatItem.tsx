import React, { FC, useContext } from 'react'
import { Chat } from '../../ts/chats'
import { ChatsContext } from '../../providers/ChatsProvider'

type ChatItemProps = {
  chat: Chat
}

const ChatItem: FC<ChatItemProps> = ({ chat }) => {
  const { selectedChat, setSelectedChat } = useContext(ChatsContext)
  const { friend, lastMessage } = chat

  return (
    <div
      data-testid='chat-item'
      className={`cursor-pointer border py-4 ${selectedChat?._id === chat._id && 'bg-gray-300'}`}
      onClick={() => setSelectedChat(chat)}
    >
      <div>{`${friend.firstName} ${friend.lastName}`}</div>
      <div>{lastMessage.textTranslated || lastMessage.text}</div>
    </div>
  )
}

export default ChatItem