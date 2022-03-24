import request from '../request'
import { UserAuthData } from '../../ts/user'

const API_ENDPOINTS = {
  LOGIN: '/api/auth/login',
}

export const logIn = ({ email, password }: UserAuthData) => {
  return request.post(API_ENDPOINTS.LOGIN, { email, password })
}
