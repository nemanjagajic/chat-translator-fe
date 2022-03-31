import React, { FC, useState } from 'react'
import { useSendMessage } from '../../hooks/chats'
import { useChatsContext } from '../../providers/ChatsProvider'

type MessageInputProps = {
  fetchNewestMessages: Function
}

const MessageInput: FC<MessageInputProps> = ({ fetchNewestMessages }) => {
  const { selectedChat } = useChatsContext()
  const[text, setText] = useState('')
  const{ mutate: sendMessage } = useSendMessage(fetchNewestMessages)

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
  }

  const handleSendMessage = () => {
    const typedText = text
    const chatId = selectedChat?._id || ''
    if (!chatId || !typedText) return

    setText('')
    sendMessage({ chatId, text: typedText })
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') handleSendMessage()
  }

  return (
    <div className="flex w-full h-12 bg-white">
      <input
        className="focus:outline-none w-full"
        type='text'
        value={text} onChange={handleTextChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  )
}

export default MessageInput