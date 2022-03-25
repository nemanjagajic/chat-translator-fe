import React, { FC } from 'react'
import ChatsList from './ChatsList'
import { Chat } from '../../ts/chats'

type ChatsDrawerProps = {
  chats: Chat[]
}

const ChatsDrawer: FC<ChatsDrawerProps> = ({ chats }) => {
  return (
    <div className='flex h-full w-[25%] bg-gray-100'>
      <ChatsList chats={chats} />
    </div>
  )
}

export default ChatsDrawer