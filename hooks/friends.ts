import { useQuery } from 'react-query'
import { getAllFriends, getSearchUser } from '../services/api/friends'
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