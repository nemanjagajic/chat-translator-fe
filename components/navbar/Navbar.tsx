import React from 'react'
import { useLoggedUser, useLogOut } from '../../hooks/auth'
import { useLocale } from '../../hooks/i18n'

const Navbar = () => {
  const loggedUser = useLoggedUser()
  const { t } = useLocale()
  const { logOut } = useLogOut()

  return (
    <div
      className='flex flex-row items-center justify-between h-[8%] px-4 bg-gray-100 border-b drop-shadow-sm'
    >
      <div className='font-medium'>{loggedUser?.firstName}</div>
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