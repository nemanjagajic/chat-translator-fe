import React, { FC } from 'react'
import { Checkmark } from 'react-ionicons'

type ToastSuccessProps = {
  text: string
}

const ToastSuccess: FC<ToastSuccessProps> = ({ text }) => {
  return (
    <div className='flex flex-row justify-center items-center'>
      <div className='w-5 h-5 flex justify-center items-center rounded-full bg-teal-400 mr-2'>
        <Checkmark height='15px' width='15px' color='white' />
      </div>
      <div className='text-gray-400'>{text}</div>
    </div>
  )
}

export default ToastSuccess