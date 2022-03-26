import request, { apiRequest } from '../request'

const API_ENDPOINTS = {
  CHATS: '/api/chats',
  MESSAGES: '/api/messages'
}

export const getAllChats = async () =>
  apiRequest(request.get(API_ENDPOINTS.CHATS))

export const getMessages = async (chatId: string) =>
  apiRequest(request.get(`${API_ENDPOINTS.MESSAGES}?chatId=${chatId}`))