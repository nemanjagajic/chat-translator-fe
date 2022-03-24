import request, { apiRequest } from '../request'

const API_ENDPOINTS = {
  CHATS: '/api/chats',
}

export const getAllChats = async () => apiRequest(request.get(API_ENDPOINTS.CHATS))