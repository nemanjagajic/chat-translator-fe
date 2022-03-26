import React, { FC } from 'react'
import { Message } from '../../ts/messages'
import { useLoggedUser } from '../../hooks/auth'

type MessageProps = {
  message: Message
}

const Message: FC<MessageProps> = ({ message: { text, textTranslated, senderId } }) => {
  const loggedUser = useLoggedUser()

  const isMessageMine = senderId === loggedUser?._id

  return (
    <div className={`flex ${isMessageMine ? 'self-end' : 'self-start'} bg-gray-300 m-4 p-2 w-60`}>
      {textTranslated || text}
    </div>
  )
}

export default Message