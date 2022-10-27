import { useState, useEffect } from 'react'

const getWindowDimensions = () => {
  try {
    const {innerWidth: width, innerHeight: height} = window
    return {
      width,
      height
    }
  } catch (e) {
    return {
      width: 0,
      height: 0
    }
  }
}

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}

export default useWindowDimensions