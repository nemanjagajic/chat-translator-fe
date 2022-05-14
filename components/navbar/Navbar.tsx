import React from 'react'
import { useLoggedUser, useLogOut } from '../../hooks/auth'
import { useLocale } from '../../hooks/i18n'
import { useRouter } from 'next/router'

const CHATS_ROUTE = '/'
const FRIENDS_ROUTE = '/friends'

const Navbar = () => {
  const loggedUser = useLoggedUser()
  const { t } = useLocale()
  const { logOut } = useLogOut()
  const router = useRouter()

  return (
    <div
      className='flex flex-row items-center justify-between h-[8%] px-4 bg-gray-100 border-b drop-shadow-sm'
    >
      <div className='flex flex-row'>
        <div
          className={`mr-6 cursor-pointer text-gray-800 ${router.pathname === CHATS_ROUTE && 'text-indigo-500'}`}
          onClick={() => router.push(CHATS_ROUTE)}
        >
          {t.navbar.chats}
        </div>
        <div
          className={`cursor-pointer text-gray-800 ${router.pathname === FRIENDS_ROUTE && 'text-indigo-500'}`}
          onClick={() => router.push(FRIENDS_ROUTE)}
        >
          {t.navbar.friends}
        </div>
      </div>
      <div className='flex flex-row items-center justify-between'>
        <div
          className='p-2 mr-4 ml-4 cursor-pointer'
          onClick={logOut}
        >
          {t.auth.buttons.logOut}
        </div>
        <div className='mr-6 cursor-default text-gray-800 bg-gray-300 px-4 py-2 rounded-2xl'>{loggedUser?.firstName}</div>
      </div>
    </div>
  )
}

export default Navbar