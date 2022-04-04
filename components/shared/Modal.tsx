import React, { FC, ReactElement, useEffect, useRef } from 'react'

type ModalProps = {
  children: ReactElement
  isOpen: boolean
  onClose: Function
}

const Modal: FC<ModalProps> = ({ children, isOpen, onClose }) => {
  const wrapperRef = useRef(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (wrapperRef.current && !(wrapperRef.current as any).contains(event.target)) {
      onClose()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  if (!isOpen) return null

  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black/30'>
      <div
        ref={wrapperRef}
        className='fixed bg-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-4 rounded-lg'
      >
        {children}
      </div>
    </div>
  )
}

export default Modal