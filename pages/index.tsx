import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useLocale } from '../hooks/i18n'

const IS_SERVER = typeof window === 'undefined'

const Home: NextPage = () => {
  const router = useRouter()
  const { t } = useLocale()

  const logOut = () => {
    !IS_SERVER && localStorage.removeItem('token')
    router.reload()
  }

  return (
    <div>
      <div
        className='p-2 mx-4 cursor-pointer text-base font-medium'
        onClick={logOut}
      >
        {t.auth.buttons.logOut}
      </div>
    </div>
  )
}

export default Home
