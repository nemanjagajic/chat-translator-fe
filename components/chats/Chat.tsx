import React, { useContext, useEffect, useState } from 'react'
import { ChatsContext } from '../../providers/ChatsProvider'
import { useFetchMessages } from '../../hooks/chats'
import { useLocale } from '../../hooks/i18n'
import MessagesList from '../messages/MessagesList'
import { useQueryClient } from 'react-query'

const PAGINATION_LIMIT = 10

const Chat = () => {
  const { t } = useLocale()
  const queryClient = useQueryClient()
  const { selectedChat } = useContext(ChatsContext)
  const selectedChatId = selectedChat ? selectedChat._id : ''

  const [nextPageParam, setNextPageParam] = useState(1)

  const { data: allMessages, fetchNextPage, isLoading } = useFetchMessages(selectedChatId, PAGINATION_LIMIT)

  useEffect(() => {
    return () => {
      resetQueryAndPageParamData()
    }
  }, [selectedChat?._id])

  const resetQueryAndPageParamData = () => {
    setNextPageParam(1)
    queryClient.removeQueries(['messages', selectedChatId])
  }

  const renderMessages = () => (
    <MessagesList messagesPages={allMessages?.pages || null} />
  )

  const renderNoMessagesText = () => (
    <div>{t.chats.noMessages}</div>
  )

  const fetchOlderMessages = async () => {
    await fetchNextPage({ pageParam: nextPageParam })
    setNextPageParam(nextPageParam + 1)
  }

  const fetchNewestMessages = async () => {
    queryClient.setQueryData(['messages', selectedChatId], data => ({
      pages: [allMessages?.pages[0]],
      pageParams: [undefined],
    }))
    await queryClient.refetchQueries(['messages', selectedChatId])
    setNextPageParam(1)
  }

  if (isLoading || !selectedChat) {
    return (
      <div className='flex flex-1 h-full bg-gray-400' />
    )
  }

  const isMessagesListEmpty = !allMessages?.pages[0][0]

  return (
    <div className='flex flex-1 h-full bg-gray-400'>
      <div
        className='flex flex-row absolute cursor-pointer'
      >
        <div className='m-2' onClick={fetchOlderMessages}>
          Fetch more
        </div>
        <div className='m-2' onClick={fetchNewestMessages}>
          Newest
        </div>
      </div>
      {isMessagesListEmpty ? renderNoMessagesText() : renderMessages()}
    </div>
  )
}

export default Chat