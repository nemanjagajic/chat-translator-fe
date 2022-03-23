import React, { useState } from 'react'
import { UserAuthData } from '../ts/userTypes'
import { logIn } from '../services/api/auth'
import { useLocale } from '../hooks/i18n'
import { useRouter } from 'next/router'

const initialAuthData = { email: '', password: '' }

const Auth = () => {
  const router = useRouter()
  const { t } = useLocale()

  const [userData, setUserData] = useState<UserAuthData>(initialAuthData)
  const [authError, setAuthError] = useState('')

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget
    setUserData({ ...userData, [name]: value })
  }

  const handleLogIn = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    try {
      const response = await logIn(userData)
      localStorage.setItem('token', response.data.token)
      await router.replace('/')
    } catch (error: any) {
      setAuthError(error?.response?.data?.message || '')
    }
  }

  return (
    <div>
      <form>
        <input
          type={'email'}
          onChange={onChange}
          name={'email'}
          placeholder={t.auth.placeholders.email}
          value={userData.email}
        />
        <input
          onChange={onChange}
          name={'password'}
          placeholder={t.auth.placeholders.password}
          type={'password'}
          value={userData.password}
        />
        <input
          type={'submit'}
          value={t.auth.buttons.logIn}
          onClick={handleLogIn}
          onSubmit={handleLogIn}
        />
        <div data-testid={'error-message'}>{authError}</div>
      </form>
    </div>
  )
}

export default Auth