import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getAllFriends, getSearchUser, respondToFriendRequest, sendFriendRequest } from '../services/api/friends'
import { AllFriends, FriendSearchItem } from '../ts/friends'

export const useFetchAllFriends = () => {
  const { data, isLoading, error } = useQuery<AllFriends>(
    'friends',
    getAllFriends,
  )
  return { data, isLoading, error }
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

export const useSendFriendRequest = (onSuccess?: Function) => {
  const queryClient = useQueryClient()
  const { mutate, isLoading, error } = useMutation(
    ({ userId }: { userId: string }) => sendFriendRequest(userId),
    {
      onSuccess: () => {
        onSuccess?.()
        queryClient.invalidateQueries('friends')
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