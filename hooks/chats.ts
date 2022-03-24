import { useQuery } from 'react-query'
import { Chat } from '../ts/chats'
import { getAllChats } from '../services/api/chats'

export const useFetchAllChats = () => {
  const { data, isLoading, error } = useQuery<Chat>(
    'chats',
    getAllChats
  )
  return { data, isLoading, error }
}