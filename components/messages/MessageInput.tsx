import React, { FC, useEffect, useRef, useState } from 'react'
import { useSendMessage } from '../../hooks/chats'
import { useChatsContext } from '../../providers/ChatsProvider'
import socket from '../../sockets'

type MessageInputProps = {
  fetchNewestMessages: Function
}

const MessageInput: FC<MessageInputProps> = ({ fetchNewestMessages }) => {
  const { selectedChat } = useChatsContext()
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>
  const [text, setText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const { mutate: sendMessage } = useSendMessage(fetchNewestMessages)

  useEffect(() => {
    const isInputFocused = document.activeElement === inputRef.current
    if (text !== '' && isInputFocused && !isTyping) setIsTyping(true)
    if (text === '' && isTyping) setIsTyping(false)
  }, [text, isTyping])

  useEffect(() => {
    if (!selectedChat) return
    socket.emit(isTyping ? 'startedTyping' : 'stoppedTyping', {
      chatId: selectedChat._id,
      friendId: selectedChat.friend._id
    })
  }, [isTyping, selectedChat])

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
    <div className='flex w-full h-12 bg-white'>
      <input
        ref={inputRef}
        className='focus:outline-none w-full'
        type='text'
        value={text} onChange={handleTextChange}
        onKeyDown={handleKeyDown}
        onBlur={() => setIsTyping(false)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  )
}

export default MessageInput