import request from '../request'
import { UserAuthData, UserRegisterData } from '../../ts/user'

const API_ENDPOINTS = {
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register'
}

export const logIn = ({ email, password }: UserAuthData) => {
  return request.post(API_ENDPOINTS.LOGIN, { email, password })
}

export const register = ({ email, password, firstName, lastName }: UserRegisterData) => {
  return request.post(API_ENDPOINTS.REGISTER, { email, password, firstName, lastName })
}
