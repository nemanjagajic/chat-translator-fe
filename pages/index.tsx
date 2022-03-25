import type { NextPage } from 'next'
import { useLocale } from '../hooks/i18n'
import { useFetchAllChats } from '../hooks/chats'
import { useLogOut } from '../hooks/auth'
import ChatsDrawer from '../components/chats/ChatsDrawer'
import Chat from '../components/chats/Chat'

const Home: NextPage = () => {
  const { t } = useLocale()
  const { logOut } = useLogOut()

  const { data: chats = [] } = useFetchAllChats()

  return (
    <div className='h-screen bg-gray-200'>
      <div
        className='p-2 mx-4 cursor-pointer text-base font-medium h-[8%]'
        onClick={logOut}
      >
        {t.auth.buttons.logOut}
      </div>
      <div className='flex flex-row h-[92%]'>
        <ChatsDrawer chats={chats} />
        <Chat />
      </div>
    </div>
  )
}

export default Home
