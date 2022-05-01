interface LastMessage {
  _id: string
  text: string
  textTranslated?: string
  createdAt: string
  senderId: string
}

interface ChatParticipator {
  _id: string
  email: string
  firstName: string
  lastName: string
  showOriginalMessages: boolean
  sendLanguage?: string
  receiveLanguage?: string
  lastVisit?: string
}

export interface Chat {
  _id: string
  lastMessage: LastMessage
  me: ChatParticipator
  friend: ChatParticipator
}

export enum ChatSettingsProperty {
  SEND_LANGUAGE = 'sendLanguage',
  RECEIVE_LANGUAGE = 'receiveLanguage',
  SHOW_ORIGINAL_MESSAGES = 'showOriginalMessages'
}

export interface ChatSettingsInput {
  chatId: string
  property: ChatSettingsProperty
  value: string | boolean
}

export interface ChatLastVisitRequest {
  userId: string,
  chatId: string
}

export interface ChatTypingUpdate {
  chatId: string
}