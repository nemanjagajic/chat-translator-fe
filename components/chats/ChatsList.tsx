import React, { FC } from 'react'
import { Chat } from '../../ts/chats'
import ChatItem from './ChatItem'
import { useLocale } from '../../hooks/i18n'

type ChatsListProps = {
  chats: Chat[]
  selectedChat: Chat | null
  setSelectedChat: Function
}

const ChatsList: FC<ChatsListProps> = ({ chats, selectedChat, setSelectedChat }) => {
  const { t } = useLocale()

  const renderAllChats = () => chats.map(chat => (
    <ChatItem key={chat._id} chat={chat} selectedChat={selectedChat} setSelectedChat={setSelectedChat} />
  ))
  const renderEmptyListText = () => (
    <div>
      {t.chats.emptyChatList}
    </div>
  )

  return (
    <div className='flex flex-col h-full w-full overflow-y-scroll'>
      {chats.length > 0 ? renderAllChats() : renderEmptyListText()}
    </div>
  )
}

export default ChatsList