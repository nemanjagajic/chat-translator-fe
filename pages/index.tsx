import type { NextPage } from 'next'
import { useLocale } from '../hooks/i18n'
import { useFetchAllChats } from '../hooks/chats'
import { useLoggedUser, useLogOut } from '../hooks/auth'
import ChatsDrawer from '../components/chats/ChatsDrawer'
import Chat from '../components/chats/Chat'
import ChatsProvider from '../providers/ChatsProvider'
import { useEffect } from 'react'
import socket from '../sockets/index'
import { SocketEvents } from '../ts/sockets'
import Navbar from '../components/navbar/Navbar'

const Home: NextPage = () => {
  const { t } = useLocale()
  const loggedUser = useLoggedUser()

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
    socket.on(SocketEvents.loadChatSettings, invalidateChats)
    socket.on(SocketEvents.updateFriendVisitData, invalidateChats)
    return () => {
      socket.off(SocketEvents.loadChatSettings, invalidateChats)
      socket.off(SocketEvents.updateFriendVisitData, invalidateChats)

    }
  }, [])

  return (
    <div className='h-screen'>
      <Navbar />
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
