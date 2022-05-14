import React, { FC } from 'react'
import { Chat } from '../../ts/chats'
import ChatItem from './ChatItem'
import { useLocale } from '../../hooks/i18n'
import { useRouter } from 'next/router'

type ChatsListProps = {
  chats: Chat[]
  selectedChat: Chat | null
  setSelectedChat: Function
}

const ChatsList: FC<ChatsListProps> = ({ chats, selectedChat, setSelectedChat }) => {
  const { t } = useLocale()
  const router = useRouter()

  const renderAllChats = () => chats.map(chat => (
    <ChatItem key={chat._id} chat={chat} selectedChat={selectedChat} setSelectedChat={setSelectedChat} />
  ))
  const renderEmptyListText = () => (
    <div className='flex flex-col m-4 text-gray-500 items-center text-center'>
      {t.chats.emptyChatList}
      <div
        className='flex cursor-pointer bg-indigo-500 text-white p-2 rounded-3xl w-32 items-center justify-center mt-4'
        onClick={() => router.push('/friends')}
      >
        {t.chats.addFriend}
      </div>
    </div>
  )

  return (
    <div className='flex flex-col h-full w-full overflow-y-scroll'>
      {chats.length > 0 ? renderAllChats() : renderEmptyListText()}
    </div>
  )
}

export default ChatsList