import request, { apiRequest } from '../request'

const API_ENDPOINTS = {
  FRIENDS: '/api/friends',
  SEARCH_USER: '/api/friends/searchUser',
  SEND_FRIEND_REQUEST: '/api/friends/sendFriendRequest',
  RESPOND_TO_FRIEND_REQUEST: '/api/friends/respondToFriendRequest',
  REMOVE_FRIEND: '/api/friends/remove'
}

export const getAllFriends = async () => apiRequest(request.get(API_ENDPOINTS.FRIENDS))

export const getSearchUser = async (text: string, offset: number, limit: number) =>
  apiRequest(request.get(`${API_ENDPOINTS.SEARCH_USER}?text=${text}&offset=${offset}&limit=${limit}`))

export const sendFriendRequest = async (userId: string) =>
  apiRequest(request.post(API_ENDPOINTS.SEND_FRIEND_REQUEST, { userId }))

export const respondToFriendRequest = async (userId: string, accept: boolean) =>
  apiRequest(request.post(API_ENDPOINTS.RESPOND_TO_FRIEND_REQUEST, { userId, accept }))

export const removeFriend = async (userId: string) =>
  apiRequest(request.delete(API_ENDPOINTS.REMOVE_FRIEND, { data: { userId } }))