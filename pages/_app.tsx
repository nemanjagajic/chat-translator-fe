import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useAuthRedirection } from '../hooks/auth'
import Navbar from '../components/navbar/Navbar'
import React from 'react'
import { useRouter } from 'next/router'
import ThemeProvider from '../providers/ThemeProvider'
import Head from 'next/head'
import { useLocale } from '../hooks/i18n'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
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