import React, { useContext } from 'react'
import { ChatsContext } from '../../providers/ChatsProvider'
import { useFetchMessages } from '../../hooks/chats'
import { useLocale } from '../../hooks/i18n'
import Message from '../messages/Message'
import MessagesList from '../messages/MessagesList'

const Chat = () => {
  const { t } = useLocale()

  const { selectedChat } = useContext(ChatsContext)
  const { data: messages = [], isLoading } = useFetchMessages(selectedChat ? selectedChat._id : '')

  const renderMessages = () => (
    <MessagesList messages={messages} />
  )

  const renderNoMessagesText = () => (
    <div>{t.chats.noMessages}</div>
  )

  if (isLoading) {
    return (
      <div className='flex flex-1 h-full bg-gray-400' />
    )
  }

  return (
    <div className='flex flex-1 h-full bg-gray-400'>
      {messages.length > 0 ? renderMessages() : renderNoMessagesText()}
    </div>
  )
}

export default Chat