import { fireEvent, render, screen } from '@testing-library/react'
import Auth from '../../pages/auth'
import en from '../../locales/en'
import * as authService from '../../services/api/auth'

jest.mock('../../hooks/i18n', () => ({
  useLocale: () => ({ t: en })
}))

describe('Auth page', () => {
  it('renders auth form with reactive input fields', () => {
    const email = 'test@email.com'
    const password = 'testpass'

    render(<Auth />)
    const inputEmail = screen.getByPlaceholderText(en.auth.placeholders.email) as HTMLInputElement
    const inputPassword = screen.getByPlaceholderText(en.auth.placeholders.password) as HTMLInputElement
    fireEvent.change(inputEmail, { target: { value: email } })
    fireEvent.change(inputPassword, { target: { value: password } })
    expect(inputEmail.value).toBe(email)
    expect(inputPassword.value).toBe(password)
    screen.getByText(en.auth.buttons.logIn)
    expect(screen.getByTestId('error-message').textContent).toBe('')
  })

  it('displays error message on bad request', async () => {
    render(<Auth />)
    const message = 'There has been some issues in login request'
    const failingLoginRequest = () => Promise.reject({ response: { status: 401, data: { message } } })
    const logIn = jest.spyOn(authService, 'logIn').mockImplementationOnce(failingLoginRequest)

    fireEvent.click(screen.getByText(en.auth.buttons.logIn))
    expect(logIn).toBeCalled()
    const errorMessage = await screen.findByTestId('error-message')
    expect(errorMessage.textContent).toBe(message)
  })
})