import React, { createContext, Dispatch, FC, ReactElement, useContext, useState } from 'react'

type ThemeContextType = {
  isDark: boolean,
  setIsDark: Dispatch<boolean> | Function
}

type ThemeProviderProps = {
  children: ReactElement
}

const initialValue = {
  isDark: false,
  setIsDark: () => {}
}

const ThemeContext = createContext<ThemeContextType>(initialValue)
export const useThemeContext = () => useContext(ThemeContext)

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState(false)

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider