import { useAuthRedirection, useLogOut } from '../../hooks/auth'
import { renderHook } from '@testing-library/react-hooks'
import { useRouter } from 'next/router'

jest.mock('next/router')
const useRouterMock = useRouter as jest.Mock

describe('Auth hooks', () => {
  describe('useAuthRedirection', () => {
    it('redirects to auth when no user is logged in', () => {
      const replaceMock = jest.fn()
      jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation(() => null)
      useRouterMock.mockImplementation(() => ({
        replace: replaceMock,
        pathname: ''
      }))

      renderHook(useAuthRedirection)
      expect(replaceMock).toBeCalledWith('/auth')
    })

    it('redirects to home when user is logged in', () => {
      const replaceMock = jest.fn()
      jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation(() => (
        '{ email: \'test@gmail.com\', firstName: \'test\', lastName: \'test\' }'
      ))
      useRouterMock.mockImplementation(() => ({
        replace: replaceMock,
        pathname: '/auth'
      }))

      renderHook(useAuthRedirection)
      expect(replaceMock).toBeCalledWith('/')
    })
  })

  describe('useLogOut', () => {
    const reloadMock = jest.fn()
    useRouterMock.mockImplementation(() => ({
      reload: reloadMock
    }))
    jest.spyOn(window.localStorage.__proto__, 'removeItem').mockImplementation()

    const { result } = renderHook(useLogOut)
    result.current.logOut()
    expect(window.localStorage.__proto__.removeItem).toBeCalledWith('user')
    expect(reloadMock).toBeCalled()
  })
})