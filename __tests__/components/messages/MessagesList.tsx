import { render, screen } from '@testing-library/react'
import MessagesList from '../../../components/messages/MessagesList'
import { messages } from '../../__mocks__/messages'
import moment from 'moment'
import en from '../../../locales/en'

jest.mock('../../../hooks/i18n', () => ({
  useLocale: () => ({ t: en })
}))

const messagesPages = messages

describe('MessagesList component', () => {
  it ('renders messages correctly', () => {
    let numberOfMessages = 0
    messagesPages.forEach(page => numberOfMessages += page.length)

    render(<MessagesList messagesPages={messagesPages} friendLastVisit={undefined}  fetchOlderMessages={() => {}} isLastPageReached={false} showOriginalMessages={false}/>)
    expect(screen.getAllByTestId('message-item').length).toBe(numberOfMessages)
    messages.forEach(messagePage => {
      messagePage.forEach(message => {
        expect(screen.getAllByText(`${message.text || message.textTranslated}`).length).toBe(1)
        expect(screen.getAllByText(`${moment(message.createdAt).format('HH:mm')}`).length).toBeGreaterThanOrEqual(1)
      })
    })
  })

  it('shows empty list message', () => {
    render(<MessagesList messagesPages={[[]]} friendLastVisit={undefined}  fetchOlderMessages={() => {}} isLastPageReached={false} showOriginalMessages={false}/>)
    screen.getByText(en.chats.noMessages)
    expect(screen.queryAllByTestId('message-item').length).toBe(0)
  })
})