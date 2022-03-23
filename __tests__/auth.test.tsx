import { render, screen } from '@testing-library/react'
import Auth from '../pages/auth'
import * as i18nHooks from '../hooks/i18n'
import en from '../locales/en'

describe('Auth', () => {
  beforeAll(() => {
    jest.spyOn(i18nHooks, 'useLocale').mockReturnValue({ t: en })
  })

  it('renders auth form', () => {
    render(<Auth />)
    screen.getByPlaceholderText(en.auth.placeholders.email)
    screen.getByPlaceholderText(en.auth.placeholders.password)
    screen.getByText(en.auth.buttons.logIn)
  })
})