import { useEffect } from 'react'
import { useRouter } from 'next/router'

const IS_SERVER = typeof window === 'undefined'
const AUTH_ROUTE = '/auth'

export const useAuthRedirection = () => {
  const router = useRouter()
  const isLoggedIn = !IS_SERVER && !!localStorage.token
  const isAuthPage = router.pathname === AUTH_ROUTE

  useEffect(() => {
    if (!isLoggedIn && !isAuthPage) router.replace(AUTH_ROUTE)
    if (isLoggedIn && isAuthPage) router.replace('/')
  }, [isLoggedIn])
}

export const useLogOut = () => {
  const router = useRouter()
  const logOut = () => {
    !IS_SERVER && localStorage.removeItem('token')
    router.reload()
  }
  return { logOut }
}