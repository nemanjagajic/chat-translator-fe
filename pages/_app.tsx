import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query'
import { useAuthRedirection } from '../hooks/auth'
import Navbar from '../components/navbar/Navbar'
import React from 'react'
import { useRouter } from 'next/router'
import ThemeProvider from '../providers/ThemeProvider'
import Head from 'next/head'
import { useLocale } from '../hooks/i18n'
import { toast } from 'react-toastify'
import ToastError from '../components/shared/ToastError'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  },
  queryCache: new QueryCache({
    onError: () => {
      toast(<ToastError text={'Failed to fetch data'} />)
    },
  })
})

function MyApp({ Component, pageProps }: AppProps) {
  useAuthRedirection()
  const router = useRouter()
  const { t } = useLocale()

  return (
    <>
      <Head>
        <title>{t.general.title}</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <div className='h-screen overflow-hidden'>
            {router.pathname !== '/auth' && <Navbar />}
            <Component {...pageProps} />
          </div>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  )
}

export default MyApp