import React, { createContext, useState, ReactElement, FC, Dispatch, SetStateAction } from 'react'
import { Chat } from '../ts/chats'

type ChatsContextType = {
  selectedChat: Chat | null
  setSelectedChat: Dispatch<SetStateAction<Chat | null>> | Function
}

type ChatsProviderProps = {
  children: ReactElement
}

const initialValue = {
  selectedChat: null,
  setSelectedChat: () => {}
}

export const ChatsContext = createContext<ChatsContextType>(initialValue)

const ChatsProvider: FC<ChatsProviderProps> = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)

  return (
    <ChatsContext.Provider value={{ selectedChat, setSelectedChat }}>
      {children}
    </ChatsContext.Provider>
  )
}

export default ChatsProvider