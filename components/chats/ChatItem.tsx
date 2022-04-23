import React, { FC, memo } from 'react'
import { Chat } from '../../ts/chats'
import moment from 'moment'

type ChatItemProps = {
  chat: Chat,
  selectedChat: Chat | null,
  setSelectedChat: Function
}

const ChatItem: FC<ChatItemProps> = ({ chat, selectedChat, setSelectedChat }) => {
  const { friend, lastMessage, me } = chat

  const isLastMessageRead = moment(me.lastVisit).isSameOrAfter(moment(lastMessage.createdAt)) || lastMessage.senderId === me._id

  return (
    <div
      data-testid='chat-item'
      className={`cursor-pointer border py-4 ${selectedChat?._id === chat._id ? 'bg-gray-300' : ''}`}
      onClick={() => setSelectedChat(chat)}
    >
      <div>{`${friend.firstName} ${friend.lastName}`}</div>
      <div>{lastMessage.textTranslated || lastMessage.text}</div>
      <div>{isLastMessageRead ? 'read' : 'not read'}</div>
    </div>
  )
}

export default memo(ChatItem, (prevProps, nextProps) => {
  return JSON.stringify(prevProps.chat) === JSON.stringify(nextProps.chat)
    && JSON.stringify(prevProps.selectedChat) === JSON.stringify(nextProps.selectedChat)
})