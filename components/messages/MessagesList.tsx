import React, { FC } from 'react'
import { Message as IMessage } from '../../ts/messages'
import Message from './Message'
import { useLocale } from '../../hooks/i18n'
import moment from 'moment'

type MessagesListProps = {
  messagesPages: IMessage[][]
}

const MessagesList: FC<MessagesListProps> = ({ messagesPages }) => {
  const { t } = useLocale()
  const isMessagesListEmpty = !messagesPages[0][0]

  const renderMessages = () => messagesPages?.map(
    messages => messages.map((message, index) => (
      <Message
        key={message._id}
        message={message}
        showDateSeparator={
          index !== 0 && !moment(message.createdAt).isSame(messages[index - 1].createdAt, 'day')
        }
        nextMessageDate={messages[index - 1] && messages[index - 1].createdAt}
      />
    ))
  )

  const renderNoMessagesText = () => (
    <div>{t.chats.noMessages}</div>
  )

  return (
    <div className='flex flex-col-reverse h-full w-full overflow-y-scroll'>
      {isMessagesListEmpty ? renderNoMessagesText() : renderMessages()}
    </div>
  )
}

export default MessagesList