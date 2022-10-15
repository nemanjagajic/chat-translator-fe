import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from 'react-query'
import { Chat, ChatLastVisitRequest, ChatSettingsInput } from '../ts/chats'
import {
  createChat,
  getAllChats,
  getMessages,
  sendMessage,
  setChatVisited,
  setSettingProperty
} from '../services/api/chats'
import { Message, MessageInput } from '../ts/messages'
import socket from '../sockets'
import { useLoggedUser } from './auth'

export const useFetchAllChats = (showRemovedFriends = false) => {
  const queryClient = useQueryClient()
  const loggedUser = useLoggedUser()
  const invalidateChats = () => queryClient.invalidateQueries('chats')
  const { data, isLoading, error } = useQuery<Chat[]>(
    'chats',
    () => getAllChats(showRemovedFriends),
    {
      enabled: !!loggedUser
    }
  )
  return { data, isLoading, error, invalidateChats }
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

export const useSendMessage = (onSuccess?: Function, onError?: Function) => {
  const queryClient = useQueryClient()
  const { mutate, isLoading, error } = useMutation(
    ({ chatId, text }: MessageInput) => sendMessage(chatId, text),
    {
      onSuccess: ({ message }) => {
        socket.emit('chatMessageSent', message)
        onSuccess?.()
        queryClient.invalidateQueries('chats')
      },
      onError: (() => {
        onError?.()
      })
    }
  )

  return { mutate, isLoading, error }
}

export const useSetSettingsProperty = () => {
  const queryClient = useQueryClient()
  const invalidateChats = () => queryClient.invalidateQueries('chats')
  const { mutate, mutateAsync, isLoading, error } = useMutation(
    ({ chatId, property, value }: ChatSettingsInput) => setSettingProperty(chatId, property, value)
  )

  return { mutate, mutateAsync, isLoading, error, invalidateChats }
}

export const useSetChatVisited = () => {
  const { mutate, mutateAsync, isLoading, error } = useMutation(
    ({ userId, chatId }: ChatLastVisitRequest) => setChatVisited(userId, chatId)
  )

  return { mutate, mutateAsync, isLoading, error }
}

export const useCreateChat = () => {
  const { mutate, mutateAsync, isLoading, error } = useMutation(
    ({ userId }: { userId: string }) => createChat(userId)
  )

  return { mutate, mutateAsync, isLoading, error }
}