import React, { createContext, useState, ReactElement, FC, Dispatch, SetStateAction, useContext } from 'react'
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

const ChatsContext = createContext<ChatsContextType>(initialValue)
export const useChatsContext = () => useContext(ChatsContext)

const ChatsProvider: FC<ChatsProviderProps> = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)

  return (
    <ChatsContext.Provider value={{ selectedChat, setSelectedChat }}>
      {children}
    </ChatsContext.Provider>
  )
}

export default ChatsProvider