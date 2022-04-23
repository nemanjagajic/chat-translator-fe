import React, { FC, useEffect, useRef, useState } from 'react'
import { useChatsContext } from '../../providers/ChatsProvider'
import { useFetchMessages, useSetChatVisited } from '../../hooks/chats'
import MessagesList from '../messages/MessagesList'
import { InfiniteData, useQueryClient } from 'react-query'
import MessageInput from '../messages/MessageInput'
import Modal from '../shared/Modal'
import ChatSettings from './ChatSettings'
import socket from '../../sockets/index'
import { Message } from '../../ts/messages'
import { useLoggedUser } from '../../hooks/auth'
import { ChatTypingUpdate } from '../../ts/chats'
import { SocketEvents } from '../../ts/sockets'

const PAGINATION_LIMIT = 50

type ChatProps = {
  invalidateChats: () => Promise<void>
}

const Chat: FC<ChatProps> = ({ invalidateChats }) => {
  const queryClient = useQueryClient()
  const { selectedChat } = useChatsContext()
  const selectedChatId = selectedChat ? selectedChat._id : ''
  const loggedUser = useLoggedUser()

  const [nextPageParam, setNextPageParam] = useState(1)
  const [isLastPageReached, setIsLastPageReached] = useState(false)
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const [isFriendTyping, setIsFriendTyping] = useState(false)

  const { data: allMessages, fetchNextPage, isLoading } = useFetchMessages(selectedChatId, PAGINATION_LIMIT)
  const allMessagesRef = useRef<InfiniteData<Message[]>>()
  const { mutateAsync: setChatVisited } = useSetChatVisited()

  useEffect(() => {
    setIsFriendTyping(false)
    if (!selectedChat || !loggedUser) return
    socket.on(SocketEvents.loadMessage, onLoadMessage)
    socket.on(SocketEvents.friendStartedTyping, onFriendStartedTyping)
    socket.on(SocketEvents.friendStoppedTyping, onFriendStoppedTyping)
    handleChatVisited(true)

    return () => {
      resetQueryAndPageParamData()
      socket.off(SocketEvents.loadMessage, onLoadMessage)
      socket.off(SocketEvents.friendStartedTyping, onFriendStartedTyping)
      socket.off(SocketEvents.friendStoppedTyping, onFriendStoppedTyping)
    }
  }, [selectedChatId])

  useEffect(() => {
    allMessagesRef.current = allMessages
    checkIsLastPageReached()
  }, [allMessages])

  const onLoadMessage = async (message: Message) => {
    if (message.chatId === selectedChatId) {
      fetchNewestMessages()
      await handleChatVisited()
    }
    invalidateChats()
  }

  const onFriendStartedTyping = ({ chatId }: ChatTypingUpdate) => {
    if (chatId === selectedChat?._id) setIsFriendTyping(true)
  }

  const onFriendStoppedTyping = ({ chatId }: ChatTypingUpdate) => {
    if (chatId === selectedChat?._id) setIsFriendTyping(false)
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

  const handleChatVisited = async (updateChats = false) => {
    if (!loggedUser || !selectedChat) return
    const userId = loggedUser._id
    const chatId = selectedChat._id
    await setChatVisited({ userId, chatId })
    if (updateChats) await invalidateChats()
    socket.emit('friendVisitedChat', { userId, chatId })
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
        <MessagesList messagesPages={allMessages.pages} friendLastVisit={selectedChat.friend.lastVisit} />
      ) : (
        <div className='flex flex-col-reverse h-full w-full overflow-y-scroll' />
      )}
      {isFriendTyping && <div>Typing...</div>}
      <MessageInput fetchNewestMessages={fetchNewestMessages} />
    </div>
  )
}

export default Chat