import en from '../../../locales/en'
import { render } from '@testing-library/react'
import Chat from '../../../components/chats/Chat'
import { useQueryClient } from 'react-query'
import { useFetchMessages } from '../../../hooks/chats'
import MessageInput from '../../../components/messages/MessageInput'

jest.mock('../../../hooks/i18n', () => ({
  useLocale: () => ({ t: en })
}))

jest.mock('react-query', () => ({
  useQueryClient: () => ({
    removeQueries: () => {},
    setQueryData: () => {},
    refetchQueries: () => {},
    useInfiniteQuery: () => {}
  })
}))

jest.mock('../../../components/messages/MessageInput', () => () => 'MessageInput')

jest.mock('../../../hooks/chats', () => ({
  useFetchMessages: () => ({
    data: [],
    fetchNextPage: () => {},
    isLoading: false
  })
}))

describe('Chat', () => {
  it ('renders', () => {
    render(<Chat />)
  })
})