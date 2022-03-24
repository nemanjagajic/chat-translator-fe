interface LastMessage {
  _id: string
  text: string
  createdAt: string
  senderId: string
}

interface ChatParticipator {
  _id: string
  email: string
  firstName: string
  lastName: string
  showOriginalMessage: boolean
}

export interface Chat {
  _id: string
  lastMessage: LastMessage
  me: ChatParticipator
  friend: ChatParticipator
}