import { useState, useEffect } from 'react'

const hasFocus = () => typeof document !== 'undefined' && document.hasFocus()

const useWindowFocus = () => {
  const [focused, setFocused] = useState(hasFocus)

  useEffect(() => {
    setFocused(hasFocus())

    const onFocus = () => setFocused(true)
    const onBlur = () => setFocused(false)
    const onVisibilityChange = () => {
      const isTabVisible = document.visibilityState === 'visible'
      setFocused(isTabVisible)
    }

    window.addEventListener('focus', onFocus)
    window.addEventListener('blur', onBlur)
    window.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      window.removeEventListener('focus', onFocus)
      window.removeEventListener('blur', onBlur)
      window.addEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])

  return focused
}

export default useWindowFocus