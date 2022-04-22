import React, { useEffect, useRef, useState } from 'react'
import { useChatsContext } from '../../providers/ChatsProvider'
import { useFetchMessages } from '../../hooks/chats'
import MessagesList from '../messages/MessagesList'
import { InfiniteData, useQueryClient } from 'react-query'
import MessageInput from '../messages/MessageInput'
import Modal from '../shared/Modal'
import ChatSettings from './ChatSettings'
import socket from '../../sockets/index'
import { Message } from '../../ts/messages'

const PAGINATION_LIMIT = 50

const Chat = () => {
  const queryClient = useQueryClient()
  const { selectedChat } = useChatsContext()
  const selectedChatId = selectedChat ? selectedChat._id : ''

  const [nextPageParam, setNextPageParam] = useState(1)
  const [isLastPageReached, setIsLastPageReached] = useState(false)
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const [isFriendTyping, setIsFriendTyping] = useState(false)

  const { data: allMessages, fetchNextPage, isLoading } = useFetchMessages(selectedChatId, PAGINATION_LIMIT)
  const allMessagesRef = useRef<InfiniteData<Message[]>>()

  useEffect(() => {
    if (!selectedChat) return
    socket.on('loadMessage', onLoadMessage)
    socket.on('friendStartedTyping', ({ chatId }: { chatId: string }) => {
      if (chatId === selectedChat._id) setIsFriendTyping(true)
    })
    socket.on('friendStoppedTyping', ({ chatId }: { chatId: string }) => {
      if (chatId === selectedChat._id) setIsFriendTyping(false)
    })

    return () => {
      resetQueryAndPageParamData()
      socket.off('loadMessage', onLoadMessage)
      socket.off('friendStartedTyping', ({ chatId }: { chatId: string }) => {
        if (chatId === selectedChat._id) setIsFriendTyping(true)
      })
      socket.off('friendStoppedTyping', ({ chatId }: { chatId: string }) => {
        if (chatId === selectedChat._id) setIsFriendTyping(false)
      })
    }
  }, [selectedChatId])

  useEffect(() => {
    allMessagesRef.current = allMessages
    checkIsLastPageReached()
  }, [allMessages])

  const onLoadMessage = (message: Message) => {
    if (message.chatId === selectedChatId) fetchNewestMessages()
  }

  const resetQueryAndPageParamData = () => {
    setNextPageParam(1)
    queryClient.removeQueries(['messages', selectedChatId])
  }

  const checkIsLastPageReached = () => {
    const pages = allMessages?.pages
    if (pages && pages[pages.length - 1].length < PAGINATION_LIMIT) {
      setIsLastPageReached(true)
      return
    }
    if (isLastPageReached) setIsLastPageReached(false)
  }

  const fetchOlderMessages = async () => {
    await fetchNextPage({ pageParam: nextPageParam })
    setNextPageParam(nextPageParam + 1)
  }

  const fetchNewestMessages = async () => {
    queryClient.setQueryData(['messages', selectedChatId], () => ({
      pages: [allMessagesRef.current?.pages[0]],
      pageParams: [undefined],
    }))
    await queryClient.refetchQueries(['messages', selectedChatId])
    setNextPageParam(1)
  }

  const isReady = !isLoading && selectedChat

  return (
    <div className='flex flex-1 flex-col h-full bg-gray-400'>
      <div
        className='flex flex-row absolute cursor-pointer'
      >
        {!isLastPageReached && (
          <div className='m-2' onClick={fetchOlderMessages}>
            Fetch more
          </div>
        )}
        <div className='m-2' onClick={() => { setIsSettingsModalOpen(true)}}>
          Settings
        </div>
      </div>
      <Modal
        isOpen={isSettingsModalOpen}
        onClose={() => { setIsSettingsModalOpen(false)} }
      >
        <ChatSettings />
      </Modal>
      {isReady && allMessages?.pages ? (
        <MessagesList messagesPages={allMessages.pages} />
      ) : (
        <div className='flex flex-col-reverse h-full w-full overflow-y-scroll' />
      )}
      {isFriendTyping && <div>Typing...</div>}
      <MessageInput fetchNewestMessages={fetchNewestMessages} />
    </div>
  )
}

export default Chat