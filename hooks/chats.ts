import { useInfiniteQuery, useMutation, useQuery } from 'react-query'
import { Chat } from '../ts/chats'
import { getAllChats, getMessages, sendMessage } from '../services/api/chats'
import { Message, MessageInput } from '../ts/messages'

export const useFetchAllChats = () => {
  const { data, isLoading, error } = useQuery<Chat[]>(
    'chats',
    getAllChats,
  )
  return { data, isLoading, error }
}

export const useFetchMessages = (chatId: string, limit: number) => {
  const { data, fetchNextPage, isLoading, error } = useInfiniteQuery<Message[]>(
    ['messages', chatId],
    ({ pageParam = 0 }) => getMessages(chatId, pageParam, limit),
    {
      enabled: !!chatId
    }
  )
  return { data, fetchNextPage, isLoading, error }
}

export const useSendMessage = (onSuccess?: Function) => {
  const { mutate, isLoading, error } = useMutation(
    ({ chatId, text }: MessageInput) => sendMessage(chatId, text),
    {
      onSuccess: () => onSuccess?.()
    }
  )

  return { mutate, isLoading, error }
}