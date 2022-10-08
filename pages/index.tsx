import type { NextPage } from 'next'
import { useFetchAllChats } from '../hooks/chats'
import { useLoggedUser } from '../hooks/auth'
import ChatsDrawer from '../components/chats/ChatsDrawer'
import Chat from '../components/chats/Chat'
import ChatsProvider from '../providers/ChatsProvider'
import { useEffect } from 'react'
import socket from '../sockets/index'
import { SocketEvents } from '../ts/sockets'
import { configureToast } from '../utils/toast'
import { useLocale } from '../hooks/i18n'
import useWindowFocus from '../hooks/helpers/useWindowFocus'

const Home: NextPage = () => {
  const loggedUser = useLoggedUser()
  const { t } = useLocale()
  const isWindowFocused = useWindowFocus()

  const { data: chats = [], isLoading: isLoadingChats, invalidateChats } = useFetchAllChats()

  useEffect(() => {
    socket.on(SocketEvents.connect, () => {
      if (loggedUser) {
        socket.emit('createUserSession', {
          userId: loggedUser._id,
          socketId: socket.id
        })
      }
    })
  }, [loggedUser])

  useEffect(() => {
    configureToast()
    socket.on(SocketEvents.loadChatSettings, invalidateChats)
    socket.on(SocketEvents.updateFriendVisitData, invalidateChats)
    socket.on(SocketEvents.newFriendRequest, handleFriendRequest)
    return () => {
      socket.off(SocketEvents.loadChatSettings, invalidateChats)
      socket.off(SocketEvents.updateFriendVisitData, invalidateChats)
      socket.off(SocketEvents.newFriendRequest, handleFriendRequest)
    }
  }, [])

  useEffect(() => {
    configureToast()
    socket.on(SocketEvents.newFriendRequest, handleFriendRequest)
    return () => {
      socket.off(SocketEvents.newFriendRequest, handleFriendRequest)
    }
  }, [isWindowFocused])

  const handleFriendRequest = () => {
    if (!isWindowFocused) {
      document.title = `${t.general.title} (${t.friends.newFriendRequest})`
    }
  }

  return (
    <div className='h-screen' data-cy='homeScreen'>
      <ChatsProvider>
        <div className='flex flex-row h-[92%]'>
          <ChatsDrawer chats={chats} isLoadingChats={isLoadingChats} />
          <Chat invalidateChats={invalidateChats} />
        </div>
      </ChatsProvider>
    </div>
  )
}

export default Home
