import { render, screen } from '@testing-library/react'
import { chats } from '../../__mocks__/chats'
import ChatItem from '../../../components/chats/ChatItem'
import React, { useState } from 'react'
import { Chat } from '../../../ts/chats'
import { useChatsContext } from '../../../providers/ChatsProvider'

jest.mock('../../../providers/ChatsProvider', () => ({
  useChatsContext: jest.fn()
}))
const useChatsContextMock = useChatsContext as jest.Mock;

describe('ChatsList component', () => {
  it ('renders chat items correctly', () => {
    const chat = chats[0]
    const activeChatClass = 'bg-gray-300'
    useChatsContextMock.mockImplementation(() => {
      const [activeChat, setActiveChat] = useState<Chat | null>(null)
      return { selectedChat: activeChat, setSelectedChat: () => setActiveChat(chat) }
    })

    render(<ChatItem chat={chat} />)
    const chatItem = screen.getByTestId('chat-item')
    expect(chatItem).not.toHaveClass(activeChatClass)
    chatItem.click()
    expect(chatItem).toHaveClass(activeChatClass)
  })
})