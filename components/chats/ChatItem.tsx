import React, { FC, memo } from 'react'
import { Chat } from '../../ts/chats'
import moment from 'moment'
import { formatChatPreviewDate } from '../../utils/dateFormatter'

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
      className={`relative h-20 cursor-pointer m-3 mb-0 p-4 pr-6 rounded-2xl 
        ${selectedChat?._id === chat._id ? 'bg-indigo-100' : ''}`
      }
      onClick={() => setSelectedChat(chat)}
    >
      <div className='text-gray-800'>{`${friend.firstName} ${friend.lastName}`}</div>
      <div className='flex flex-row items-center justify-between'>
        <div className={
          `overflow-hidden text-ellipsis whitespace-nowrap text-sm
          ${!isLastMessageRead ? 'text-indigo-500' : 'text-gray-500'}`
        }>
          {lastMessage.textTranslated || lastMessage.text}
        </div>
        <div className='text-sm mx-1 text-gray-400 whitespace-nowrap'>{formatChatPreviewDate(lastMessage.createdAt)}</div>
      </div>
      {!isLastMessageRead && <div className='absolute right-3 top-[36px] rounded-full h-2 w-2 bg-indigo-500' />}
    </div>
  )
}

export default memo(ChatItem, (prevProps, nextProps) => {
  return JSON.stringify(prevProps.chat) === JSON.stringify(nextProps.chat)
    && JSON.stringify(prevProps.selectedChat) === JSON.stringify(nextProps.selectedChat)
})