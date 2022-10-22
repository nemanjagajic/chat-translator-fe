import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  getAllFriends,
  getSearchUser,
  removeFriend,
  respondToFriendRequest,
  sendFriendRequest
} from '../services/api/friends'
import { AllFriends, FriendSearchItem } from '../ts/friends'
import { useLoggedUser } from './auth'

export const useFetchAllFriends = () => {
  const queryClient = useQueryClient()
  const invalidateFriends = () => queryClient.invalidateQueries('friends')
  const { data, isLoading, error } = useQuery<AllFriends>(
    'friends',
    getAllFriends,
  )
  return { data, isLoading, error, invalidateFriends }
}

export const useSearchUser = (text: string, offset: number, limit: number) => {
  const { data, isLoading, error, refetch, isRefetching } = useQuery<FriendSearchItem[]>(
    'searchUser',
    () => getSearchUser(text, offset, limit),
    {
      enabled: text !== '',
    }
  )
  return { data, isLoading, error, refetch, isRefetching }
}

export const useSendFriendRequest = (onSuccess?: Function, onError?: Function) => {
  const queryClient = useQueryClient()
  const loggedUser = useLoggedUser()
  const { mutate, isLoading, error } = useMutation(
    ({ userId }: { userId: string }) => sendFriendRequest(userId),
    {
      onSuccess: () => {
        onSuccess?.()
        queryClient.invalidateQueries('friends')
      },
      onError: () => {
        onError?.({ user: loggedUser })
      }
    }
  )

  return { mutate, isLoading, error }
}

export const useRespondToFriendRequest = (onSuccess?: Function) => {
  const queryClient = useQueryClient()
  const { mutate, isLoading, error } = useMutation(
    ({ userId, accept }: { userId: string, accept: boolean }) => respondToFriendRequest(userId, accept),
    {
      onSuccess: () => {
        onSuccess?.()
        queryClient.invalidateQueries('friends')
      }
    }
  )

  return { mutate, isLoading, error }
}

export const useRemoveFriend = (onSuccess?: Function) => {
  const queryClient = useQueryClient()
  const { mutate, isLoading, error } = useMutation(
    ({ userId }: { userId: string }) => removeFriend(userId),
    {
      onSuccess: () => {
        onSuccess?.()
        queryClient.invalidateQueries('friends')
      }
    }
  )

  return { mutate, isLoading, error }
}