import React, { FC } from 'react'
import { Chat } from '../../ts/chats'
import ChatItem from './ChatItem'
import { useLocale } from '../../hooks/i18n'

type ChatsListProps = {
  chats: Chat[]
}

const ChatsList: FC<ChatsListProps> = ({ chats }) => {
  const { t } = useLocale()

  const renderAllChats = () => chats.map(chat => <ChatItem key={chat._id} chat={chat} />)
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