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
import { SettingsSharp } from 'react-ionicons'
import { useLocale } from '../../hooks/i18n'
import { useThemeContext } from '../../providers/ThemeProvider'
import useWindowFocus from '../../hooks/helpers/useWindowFocus'

const PAGINATION_LIMIT = 100

type ChatProps = {
  invalidateChats: () => Promise<void>
}

const Chat: FC<ChatProps> = ({ invalidateChats }) => {
  const { isDark } = useThemeContext()
  const queryClient = useQueryClient()
  const { selectedChat } = useChatsContext()
  const selectedChatId = selectedChat ? selectedChat._id : ''
  const loggedUser = useLoggedUser()
  const { t } = useLocale()
  const isWindowFocused = useWindowFocus()

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
    socket.on(SocketEvents.friendStartedTyping, onFriendStartedTyping)
    socket.on(SocketEvents.friendStoppedTyping, onFriendStoppedTyping)
    handleChatVisited(true)

    if (!selectedChat.me.sendLanguage) setIsSettingsModalOpen(true)

    return () => {
      resetQueryAndPageParamData()
      socket.off(SocketEvents.friendStartedTyping, onFriendStartedTyping)
      socket.off(SocketEvents.friendStoppedTyping, onFriendStoppedTyping)
    }
  }, [selectedChatId])

  useEffect(() => {
    socket.on(SocketEvents.loadMessage, onLoadMessage)

    return () => {
      socket.off(SocketEvents.loadMessage, onLoadMessage)
    }
  }, [selectedChatId, isWindowFocused])

  useEffect(() => {
    allMessagesRef.current = allMessages
    checkIsLastPageReached()
  }, [allMessages])

  useEffect(() => {
    if (isWindowFocused && document.title.includes(`(${t.messages.new})`)) {
      document.title = t.general.title
    }
  }, [isWindowFocused])

  const onLoadMessage = async (message: Message) => {
    if (!isWindowFocused) {
      document.title = `${t.general.title} (${t.messages.new})`
    }
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

  if (!selectedChat) return (
    <div className={`flex items-center justify-center w-full text-gray-400 ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
      {t.chats.chatWillAppear}
    </div>
  )

  return (
    <div className={`flex flex-1 flex-col h-full ${isDark ? 'bg-gray-700' : 'bg-gray-50'} overflow-auto`}>
      <Modal
        isOpen={isSettingsModalOpen}
        onClose={() => { setIsSettingsModalOpen(false)} }
      >
        <ChatSettings />
      </Modal>
      {isReady && allMessages?.pages ? (
        <MessagesList
          messagesPages={allMessages.pages}
          friendLastVisit={selectedChat.friend.lastVisit}
          fetchOlderMessages={fetchOlderMessages}
          isLastPageReached={isLastPageReached}
          showOriginalMessages={selectedChat.me.showOriginalMessages}
        />
      ) : (
        <div className='flex flex-col-reverse h-full w-full overflow-y-scroll' />
      )}
      {isFriendTyping && <div className='m-2 ml-4 text-gray-400 italic'>{t.chats.friendTyping}</div>}
      <div className='flex flex-row'>
        <MessageInput fetchNewestMessages={fetchNewestMessages} />
        <div className='m-4 mt-2 cursor-pointer' onClick={() => { setIsSettingsModalOpen(true)} }>
          <SettingsSharp height='24px' width='24px' color={isDark ? '#ccc' : '#6366f1'} />
        </div>
      </div>
    </div>
  )
}

export default Chat