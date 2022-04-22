import type { NextPage } from 'next'
import { useLocale } from '../hooks/i18n'
import { useFetchAllChats } from '../hooks/chats'
import { useLoggedUser, useLogOut } from '../hooks/auth'
import ChatsDrawer from '../components/chats/ChatsDrawer'
import Chat from '../components/chats/Chat'
import ChatsProvider from '../providers/ChatsProvider'
import { useEffect } from 'react'
import socket from '../sockets/index'

const Home: NextPage = () => {
  const { t } = useLocale()
  const { logOut } = useLogOut()
  const loggedUser = useLoggedUser()

  const { data: chats = [], isLoading: isLoadingChats, invalidateChats } = useFetchAllChats()

  useEffect(() => {
    socket.on('connect', () => {
      if (loggedUser) {
        socket.emit('createUserSession', {
          userId: loggedUser._id,
          socketId: socket.id
        })
      }
    })
  }, [loggedUser])

  useEffect(() => {
    socket.on('loadChatSettings', invalidateChats)
    return () => {
      socket.off('loadChatSettings', invalidateChats)
    }
  }, [])

  return (
    <div className='h-screen bg-gray-200'>
      <div
        className='flex flex-row items-center h-[8%] px-4'
      >
        <div>{loggedUser?.firstName}</div>
        <div
          className='p-2 mx-4 cursor-pointer text-base font-medium'
          onClick={logOut}
        >
          {t.auth.buttons.logOut}
        </div>
      </div>
      <ChatsProvider>
        <div className='flex flex-row h-[92%]'>
          <ChatsDrawer chats={chats} isLoadingChats={isLoadingChats} />
          <Chat />
        </div>
      </ChatsProvider>
    </div>
  )
}

export default Home
