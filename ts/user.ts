export interface UserAuthData {
  email: string;
  password: string;
}

export interface User {
  token: string
  _id: string
  email: string
  firstName: string
  lastName: string
}