import { fireEvent, render, screen } from '@testing-library/react'
import Auth from '../pages/auth'
import en from '../locales/en'
import * as authService from '../services/api/auth'

jest.mock('../hooks/i18n', () => ({
  useLocale: () => ({ t: en })
}))

describe('Auth', () => {
  beforeEach(() => {
    render(<Auth />)
  })

  it('renders auth form', () => {
    screen.getByPlaceholderText(en.auth.placeholders.email)
    screen.getByPlaceholderText(en.auth.placeholders.password)
    screen.getByText(en.auth.buttons.logIn)
    expect(screen.getByTestId('error-message').textContent).toBe('')
  })

  it('displays error message on bad request', async () => {
    const message = 'There has been some issues in login request'
    const failingLoginRequest = () => Promise.reject({ response: { status: 200, data: { message } } })
    const logIn = jest.spyOn(authService, 'logIn').mockImplementationOnce(failingLoginRequest)

    fireEvent.click(screen.getByText(en.auth.buttons.logIn))
    expect(logIn).toBeCalled()
    const errorMessage = await screen.findByTestId('error-message')
    expect(errorMessage.textContent).toBe(message)
  })
})