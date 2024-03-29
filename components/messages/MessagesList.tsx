import React, { FC } from 'react'
import { Message as IMessage } from '../../ts/messages'
import Message from './Message'
import { useLocale } from '../../hooks/i18n'
import moment from 'moment'
import { ArrowUp } from 'react-ionicons'

type MessagesListProps = {
  messagesPages: IMessage[][],
  friendLastVisit: string | undefined,
  fetchOlderMessages: () => void,
  isLastPageReached: boolean,
  showOriginalMessages: boolean,
  pendingMessage?: JSX.Element | null
}

const MessagesList: FC<MessagesListProps> = ({
 messagesPages,
 friendLastVisit,
 fetchOlderMessages,
 isLastPageReached,
 showOriginalMessages,
 pendingMessage
}) => {
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
        isRead={!!friendLastVisit && moment(friendLastVisit).isSameOrAfter(moment(message.createdAt))}
        showOriginalMessages={showOriginalMessages}
      />
    ))
  )

  const renderNoMessagesText = () => (
    <div className='flex items-center justify-center mb-4 w-full text-gray-400 h-full'>{t.chats.noMessages}</div>
  )

  return (
    <div className='flex flex-col-reverse h-full w-full overflow-y-scroll py-4'>
      {pendingMessage}
      {isMessagesListEmpty ? renderNoMessagesText() : renderMessages()}
      {!isLastPageReached && (
        <div className='flex justify-center mb-4' onClick={fetchOlderMessages}>
          <div className='flex flex-row justify-center items-center bg-teal-400 text-white rounded-3xl px-4 py-2 cursor-pointer'>
            <ArrowUp height='15px' width='15px' color='white' />
            <div className='pl-1 text-sm'>{t.messages.fetchOlder}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MessagesList