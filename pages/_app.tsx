import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useAuthRedirection } from '../hooks/auth'
import ChatsProvider from '../providers/ChatsProvider'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

function MyApp({ Component, pageProps }: AppProps) {
  useAuthRedirection()

  return (
    <QueryClientProvider client={queryClient}>
      <ChatsProvider>
        <Component {...pageProps} />
      </ChatsProvider>
    </QueryClientProvider>
  )
}

export default MyApp