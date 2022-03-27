import React, { FC, useContext, useEffect } from 'react'
import ChatsList from './ChatsList'
import { Chat } from '../../ts/chats'
import { ChatsContext } from '../../providers/ChatsProvider'

type ChatsDrawerProps = {
  chats: Chat[]
  isLoadingChats: boolean
}

const ChatsDrawer: FC<ChatsDrawerProps> = ({ chats, isLoadingChats }) => {
  const { selectedChat, setSelectedChat } = useContext(ChatsContext)

  useEffect(() => {
    if (!isLoadingChats && !selectedChat && chats[0]) setSelectedChat(chats[0])
  }, [chats])

  return (
    <div className='flex h-full w-[25%] bg-gray-100'>
      {!isLoadingChats && <ChatsList chats={chats} />}
    </div>
  )
}

export default ChatsDrawer