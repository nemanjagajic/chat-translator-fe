import { render, screen } from '@testing-library/react'
import { chats } from '../../__mocks__/chats'
import ChatItem from '../../../components/chats/ChatItem'
import React from 'react'

describe('ChatItem component', () => {
  it ('renders active chat when chat is selected', () => {
    const activeChatClass = 'bg-gray-300'
    render(<ChatItem chat={chats[0]} selectedChat={chats[0]} setSelectedChat={() => {}} />)
    const chatItem = screen.getByTestId('chat-item')
    expect(chatItem).toHaveClass(activeChatClass)
  })

  it ('renders inactive chat when chat not selected', () => {
    const activeChatClass = 'bg-gray-300'
    render(<ChatItem chat={chats[0]} selectedChat={chats[1]} setSelectedChat={() => {}} />)
    const chatItem = screen.getByTestId('chat-item')
    expect(chatItem).not.toHaveClass(activeChatClass)
  })
})