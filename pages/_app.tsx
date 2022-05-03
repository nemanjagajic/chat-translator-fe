import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useAuthRedirection } from '../hooks/auth'
import Navbar from '../components/navbar/Navbar'
import React from 'react'
import { useRouter } from 'next/router'

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

  return (
    <QueryClientProvider client={queryClient}>
      <div className='h-screen overflow-hidden'>
        {router.pathname !== '/auth' && <Navbar />}
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  )
}

export default MyApp