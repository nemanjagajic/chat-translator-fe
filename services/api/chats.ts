import request, { apiRequest } from '../request'
import { ChatSettingsProperty } from '../../ts/chats'

const API_ENDPOINTS = {
  CHATS: '/api/chats',
  MESSAGES: '/api/messages',
  SET_SETTINGS_PROPERTY: 'api/chats/setSettingsProperty',
  SET_CHAT_VISITED: 'api/chats/setChatVisited'
}

export const getAllChats = async () =>
  apiRequest(request.get(API_ENDPOINTS.CHATS))

export const getMessages = async (chatId: string, offset: number, limit: number) =>
  apiRequest(request.get(`${API_ENDPOINTS.MESSAGES}?chatId=${chatId}&offset=${offset}&limit=${limit}`))

export const sendMessage = async (chatId: string, text: string) =>
  apiRequest(request.post(API_ENDPOINTS.MESSAGES, { chatId, text }) )

export const setSettingProperty = async (chatId: string, property: ChatSettingsProperty, value: string | boolean) =>
  apiRequest(request.post(API_ENDPOINTS.SET_SETTINGS_PROPERTY, { chatId, property, value }) )

export const setChatVisited = async (userId: string, chatId: string) =>
  apiRequest(request.post(API_ENDPOINTS.SET_CHAT_VISITED, { userId, chatId }) )