import React, { FC } from 'react'
import ChatsList from './ChatsList'
import { Chat } from '../../ts/chats'

type ChatsDrawerProps = {
  chats: Chat[]
  isLoadingChats: boolean
}

const ChatsDrawer: FC<ChatsDrawerProps> = ({ chats, isLoadingChats }) => {
  return (
    <div className='flex h-full w-[25%] bg-gray-100'>
      {!isLoadingChats && <ChatsList chats={chats} />}
    </div>
  )
}

export default ChatsDrawer