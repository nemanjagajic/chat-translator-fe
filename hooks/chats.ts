import { useQuery } from 'react-query'
import { Chat } from '../ts/chats'
import { getAllChats, getMessages } from '../services/api/chats'
import { Message } from '../ts/messages'

export const useFetchAllChats = () => {
  const { data, isLoading, error } = useQuery<Chat[]>(
    'chats',
    getAllChats,
  )
  return { data, isLoading, error }
}

export const useFetchMessages = (chatId: string) => {
  const { data, isLoading, error } = useQuery<Message[]>(
    ['messages', chatId],
    () => getMessages(chatId),
    { enabled: !!chatId }
  )
  return { data, isLoading, error }
}