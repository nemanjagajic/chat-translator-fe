export interface UserAuthData {
  email: string
  password: string
}

export interface UserRegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface User {
  token: string
  _id: string
  email: string
  firstName: string
  lastName: string
}