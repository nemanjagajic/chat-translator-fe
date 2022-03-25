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
}

export interface Chat {
  _id: string
  lastMessage: LastMessage
  me: ChatParticipator
  friend: ChatParticipator
}