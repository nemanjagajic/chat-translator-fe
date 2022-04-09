import { useAuthRedirection } from '../../hooks/auth'
import { renderHook } from '@testing-library/react-hooks'
import { useRouter } from 'next/router'

jest.mock('next/router')
const useRouterMock = useRouter as jest.Mock

describe('Auth hooks', () => {
  it('verifies useAuthRedirection redirects to auth when no user is logged in', () => {
    let currentPath = ''
    jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation(() => null)
    useRouterMock.mockImplementation(() => ({
      replace: (path: string) => { currentPath = path },
      pathname: currentPath
    }))
    renderHook(useAuthRedirection)
    expect(currentPath).toBe('/auth')
  })

  it('verifies useAuthRedirection redirects to home when user is logged in', () => {
    let currentPath = '/auth'
    jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation(() => (
      '{ email: \'test@gmail.com\', firstName: \'test\', lastName: \'test\' }'
    ))
    useRouterMock.mockImplementation(() => ({
      replace: (path: string) => { currentPath = path },
      pathname: currentPath
    }))
    renderHook(useAuthRedirection)
    expect(currentPath).toBe('/')
  })
})