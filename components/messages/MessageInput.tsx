import React, { FC, useEffect, useRef, useState } from 'react'
import { useSendMessage } from '../../hooks/chats'
import { useChatsContext } from '../../providers/ChatsProvider'
import socket from '../../sockets'
import { Send } from 'react-ionicons'
import { useThemeContext } from '../../providers/ThemeProvider'
import { toast } from 'react-toastify'
import ToastError from '../shared/ToastError'
import { useLocale } from '../../hooks/i18n'
import * as Sentry from '@sentry/react'

type MessageInputProps = {
  fetchNewestMessages: Function
}

const MessageInput: FC<MessageInputProps> = ({ fetchNewestMessages }) => {
  const { isDark } = useThemeContext()
  const { selectedChat } = useChatsContext()
  const textAreaRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>
  const [text, setText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const { t } = useLocale()

  const onSendMessageError = (error: any) => {
    toast(<ToastError text={t.messages.messageNotSent} />)
    Sentry.captureException({ user: error.user, text, chatId: selectedChat?._id })
  }
  const { mutate: sendMessage } = useSendMessage(fetchNewestMessages, onSendMessageError)

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
    const chatId = selectedChat?._id
    if (!chatId || !text) return

    setText('')
    sendMessage({ chatId, text })
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      handleSendMessage()
      textAreaRef.current.style.height = ''
    }
  }

  return (
    <div
      className={`flex w-full ${isDark ? 'bg-gray-600 border-gray-500' : 'white'} ml-2 mb-2 rounded-2xl border`}
    >
      <textarea
        ref={textAreaRef}
        className={
          `focus:outline-none w-full p-2 rounded-2xl h-[40px] resize-none ${isDark ? 'bg-gray-600 text-white' : 'white'}`
        }
        value={text}
        onInput={handleTextChange}
        onKeyDown={handleKeyDown}
        onBlur={() => setIsTyping(false)}
        data-cy='messageTextarea'
      />
      <button
        className={`pr-4 ${!!text ? 'cursor-pointer' : 'cursor-auto'}`}
        onClick={handleSendMessage}
        data-cy='sendMessageButton'
      >
        <Send height='20px' width='20px' color={!!text ? '#2dd4bf' : '#d1d5db'} />
      </button>
    </div>
  )
}

export default MessageInput