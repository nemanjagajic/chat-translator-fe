import React, { FC, useEffect, useRef, useState } from 'react'
import { useSendMessage } from '../../hooks/chats'
import { useChatsContext } from '../../providers/ChatsProvider'
import socket from '../../sockets'

type MessageInputProps = {
  fetchNewestMessages: Function
}

const MessageInput: FC<MessageInputProps> = ({ fetchNewestMessages }) => {
  const { selectedChat } = useChatsContext()
  const textAreaRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>
  const [text, setText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const { mutate: sendMessage } = useSendMessage(fetchNewestMessages)

  useEffect(() => {
    const isInputFocused = document.activeElement === textAreaRef.current
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

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value === '\n') return
    setText(event.target.value)
    textAreaRef.current.style.height = ''
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px'
  }

  const handleSendMessage = () => {
    const typedText = text
    const chatId = selectedChat?._id || ''
    if (!chatId || !typedText) return

    setText('')
    sendMessage({ chatId, text: typedText })
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      handleSendMessage()
      textAreaRef.current.style.height = ''
    }
  }

  return (
    <div
      className='flex w-full bg-white ml-2 mb-2 rounded-2xl border'
    >
      <textarea
        ref={textAreaRef}
        className='focus:outline-none w-full p-2 rounded-2xl h-[40px] resize-none'
        value={text}
        onInput={handleTextChange}
        onKeyDown={handleKeyDown}
        onBlur={() => setIsTyping(false)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  )
}

export default MessageInput