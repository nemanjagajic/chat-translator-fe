import { render, screen } from '@testing-library/react'
import ChatsList from '../../../components/chats/ChatsList'
import { chats } from '../../__mocks__/chats'
import en from '../../../locales/en'

jest.mock('../../../hooks/i18n', () => ({
  useLocale: () => ({ t: en })
}))

describe('ChatsList component', () => {
  it ('renders chat items correctly', () => {
    render(<ChatsList chats={chats} />)
    expect(screen.getAllByTestId('chat-item').length).toBe(chats.length)
    chats.forEach(chat => {
      expect(screen.getAllByText(`${chat.friend.firstName} ${chat.friend.lastName}`).length).toBe(1)
      expect(screen.getAllByText(`${chat.lastMessage.textTranslated || chat.lastMessage.text}`).length).toBe(1)
    })
  })

  it('shows empty list message', () => {
    render(<ChatsList chats={[]} />)
    screen.getByText(en.chats.emptyChatList)
    expect(screen.queryAllByTestId('chat-item').length).toBe(0)
  })
})