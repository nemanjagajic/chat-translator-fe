import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { User } from '../ts/user'

const IS_SERVER = typeof window === 'undefined'
const AUTH_ROUTE = '/auth'

export const useAuthRedirection = () => {
  const router = useRouter()
  const isLoggedIn = !IS_SERVER && !!localStorage.user
  const isAuthPage = router.pathname === AUTH_ROUTE

  useEffect(() => {
    if (!isLoggedIn && !isAuthPage) router.replace(AUTH_ROUTE)
    if (isLoggedIn && isAuthPage) router.replace('/')
  }, [isLoggedIn])
}

export const useLogOut = () => {
  const router = useRouter()
  const logOut = () => {
    !IS_SERVER && localStorage.removeItem('user')
    router.reload()
  }
  return { logOut }
}

export const useGetLoggedUser = (): User | null => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const user = !IS_SERVER && localStorage.getItem('user')
    if (user) setUser(JSON.parse(user))
  }, [])

  return user
}