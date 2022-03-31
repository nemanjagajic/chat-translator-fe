export interface Message {
  _id: string
  chatId: string
  text: string
  textTranslated?: string
  senderId: string
  receiverId: string
  createdAt: string
}

export interface MessageInput {
  chatId: string,
  text: string
}