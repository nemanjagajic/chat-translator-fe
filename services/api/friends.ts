import request, { apiRequest } from '../request'

const API_ENDPOINTS = {
  FRIENDS: '/api/friends',
  SEARCH_USER: '/api/friends/searchUser'
}

export const getAllFriends = async () => apiRequest(request.get(API_ENDPOINTS.FRIENDS))
export const getSearchUser = async (text: string, offset: number, limit: number) =>
  apiRequest(request.get(`${API_ENDPOINTS.SEARCH_USER}?text=${text}&offset=${offset}&limit=${limit}`))