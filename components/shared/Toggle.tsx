import React, { FC } from 'react'

type ToggleProps = {
  isChecked: boolean
  onChange: () => void
}

const Toggle: FC<ToggleProps> = ({ isChecked, onChange }) => {
  return (
    <div className='relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in'>
      <label className='relative flex justify-between items-center group ml-[-16px] text-xl'>
        <input
          checked={isChecked}
          type='checkbox'
          className='absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md cursor-pointer'
          onClick={onChange}
        />
        <span
          className='w-12 h-6 flex items-center flex-shrink-0 ml-4 bg-gray-300
              rounded-full duration-300 ease-in-out peer-checked:bg-teal-400 after:w-8 after:h-8
              after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-6
              after:w-6 after:h-6 cursor-pointer'
        />
      </label>
    </div>
  )
}

export default Toggle