import request, { apiRequest } from '../request'

const API_ENDPOINTS = {
  FRIENDS: '/api/friends'
}

export const getAllFriends = async () => apiRequest(request.get(API_ENDPOINTS.FRIENDS))