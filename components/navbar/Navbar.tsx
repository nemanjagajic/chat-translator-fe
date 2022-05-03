import React from 'react'
import { useLoggedUser, useLogOut } from '../../hooks/auth'
import { useLocale } from '../../hooks/i18n'
import { useRouter } from 'next/router'

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
        <div className='font-medium mr-6'>{loggedUser?.firstName}</div>
        <div
          className='mr-6 cursor-pointer'
          onClick={() => router.push('/')}
        >
          {t.navbar.chats}
        </div>
        <div
          className='cursor-pointer'
          onClick={() => router.push('/friends')}
        >
          {t.navbar.friends}
        </div>
      </div>
      <div
        className='p-2 mx-4 cursor-pointer text-base'
        onClick={logOut}
      >
        {t.auth.buttons.logOut}
      </div>
    </div>
  )
}

export default Navbar