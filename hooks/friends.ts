import { useQuery } from 'react-query'
import { getAllFriends } from '../services/api/friends'
import { AllFriends } from '../ts/friends'

export const useFetchAllFriends = () => {
  const { data, isLoading, error } = useQuery<AllFriends>(
    'friends',
    getAllFriends,
  )
  return { data, isLoading, error }
}