import React from 'react'
import { useLoggedUser, useLogOut } from '../../hooks/auth'
import { useLocale } from '../../hooks/i18n'
import { useRouter } from 'next/router'
import { useThemeContext } from '../../providers/ThemeProvider'
import DarkModeToggle from 'react-dark-mode-toggle'

const CHATS_ROUTE = '/'
const FRIENDS_ROUTE = '/friends'

const Navbar = () => {
  const { isDark, setIsDark } = useThemeContext()
  const loggedUser = useLoggedUser()
  const { t } = useLocale()
  const { logOut } = useLogOut()
  const router = useRouter()

  return (
    <div
      className={`flex flex-row items-center justify-between h-[8%] px-4 
      ${isDark ? 'bg-gray-600 border-gray-600' : 'bg-gray-100'} border-b drop-shadow-sm`}
    >
      <div className='flex flex-row'>
        <div
          className={`ml-3 mr-6 cursor-pointer ${isDark ? 'text-gray-100' : 'text-gray-800 '}
          ${router.pathname === CHATS_ROUTE && `${isDark ? 'text-indigo-300' : 'text-indigo-500'}`}`}
          onClick={() => router.push(CHATS_ROUTE)}
        >
          {t.navbar.chats}
        </div>
        <div
          className={`cursor-pointer ${isDark ? 'text-gray-100' : 'text-gray-800 '}
          ${router.pathname === FRIENDS_ROUTE && `${isDark ? 'text-indigo-300' : 'text-indigo-500'}`}`}
          onClick={() => router.push(`${FRIENDS_ROUTE}?myFriends`)}
          data-cy='navbarFriends'
        >
          {t.navbar.friends}
        </div>
      </div>
      {loggedUser && (
        <div className='flex flex-row items-center justify-between'>
          <DarkModeToggle
            onChange={() => setIsDark(!isDark)}
            checked={isDark}
            size={50}
          />
          <div
            className={`p-2 mr-4 ml-4 cursor-pointer ${isDark ? 'text-gray-100' : 'text-gray-800 '}`}
            onClick={logOut}
            data-cy='logOutButton'
          >
            {t.auth.buttons.logOut}
          </div>
          <div className='flex items-center justify-center mr-3 cursor-default text-gray-800 bg-gray-300 px-4 py-2 rounded-2xl'>
            {loggedUser?.firstName}
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar