import React, { useState } from 'react'
import { UserRegisterData } from '../ts/user'
import { logIn, register } from '../services/api/auth'
import { useLocale } from '../hooks/i18n'
import { useRouter } from 'next/router'

const initialAuthData = { email: '', password: '', firstName: '', lastName: '' }

const Auth = () => {
  const router = useRouter()
  const { t } = useLocale()

  const [userData, setUserData] = useState<UserRegisterData>(initialAuthData)
  const [authError, setAuthError] = useState('')
  const [isLogin, setIsLogin] = useState(true)

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget
    setUserData({ ...userData, [name]: value })
  }

  const handleRegister = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    try {
      await register(userData)
      logInAndReload()
    } catch (error: any) {
      setAuthError(error?.response?.data?.message || '')
    }
  }

  const handleLogIn = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    logInAndReload()
  }

  const logInAndReload = async () => {
    try {
      const { data } = await logIn({ email: userData.email, password: userData.password })
      localStorage.setItem('user', JSON.stringify(data))
      await router.replace('/')
      await router.reload()
    } catch (error: any) {
      setAuthError(error?.response?.data?.message || '')
    }
  }

  return (
    <div className='flex flex-col h-full justify-center items-center bg-indigo-600'>
      <h1 className='text-white text-8xl mb-4'>{t.auth.pageTitle}</h1>
      <h2 className='text-indigo-200 text-3xl mb-20'>{t.auth.pageDescription}</h2>
      <div className='w-[500px] h-[380px]'>
        <div className='flex flex-row justify-around items-center mb-6'>
          <div
            className={`flex justify-center items-center border-b ${isLogin ? 'border-indigo-400' : 'border-indigo-700'} text-white 
            px-4 py-3 flex-1 cursor-pointer mr-4`}
            onClick={() => setIsLogin(true)}
          >
            {t.auth.login}
          </div>
          <div
            className={`flex justify-center items-center border-b ${!isLogin ? 'border-indigo-400' : 'border-indigo-700'} text-white 
            px-4 py-3 flex-1 cursor-pointer ml-4`}
            onClick={() => setIsLogin(false)}
          >
            {t.auth.register}
          </div>
        </div>
        <form className='flex flex-col justify-center items-center'>
          <input
            className='focus:outline-none py-3 px-4 m-2 rounded-3xl w-full'
            type={'email'}
            onChange={onChange}
            name={'email'}
            placeholder={t.auth.placeholders.usernameOrEmail}
            value={userData.email}
          />
          <input
            className='focus:outline-none py-3 px-4 m-2 rounded-3xl w-full'
            onChange={onChange}
            name={'password'}
            placeholder={t.auth.placeholders.password}
            type={'password'}
            value={userData.password}
          />
          {!isLogin && (
            <div className='flex flex-row w-full'>
              <input
                className='focus:outline-none py-3 px-4 mr-2 mt-2 rounded-3xl flex-1'
                type={'text'}
                onChange={onChange}
                name={'firstName'}
                placeholder={t.auth.placeholders.firstName}
                value={userData.firstName}
              />
              <input
                className='focus:outline-none py-3 px-4 ml-2 mt-2 rounded-3xl flex-1'
                type={'text'}
                onChange={onChange}
                name={'lastName'}
                placeholder={t.auth.placeholders.lastName}
                value={userData.lastName}
              />
            </div>
          )}
          <input
            className='bg-teal-400 w-[50%] h-12 mt-6 rounded-3xl font-bold text-white tracking-wide cursor-pointer'
            type={'submit'}
            value={isLogin ? t.auth.buttons.logIn : t.auth.buttons.register}
            onClick={isLogin ? handleLogIn : handleRegister}
            onSubmit={isLogin ? handleLogIn : handleRegister}
          />
          <div className='mt-4 text-red-400 h-6'>
            <div data-testid={'error-message'}>{authError}</div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Auth