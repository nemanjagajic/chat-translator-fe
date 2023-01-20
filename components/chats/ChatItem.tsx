import React, { FC, memo } from 'react'
import { Chat } from '../../ts/chats'
import moment from 'moment'
import { formatChatPreviewDate } from '../../utils/dateFormatter'
import { useLocale } from '../../hooks/i18n'
import { useThemeContext } from '../../providers/ThemeProvider'
import useWindowDimensions from '../../hooks/helpers/useWindowDimensions'
import { WINDOW_WIDTH_BREAKPOINT_MD, WINDOW_WIDTH_BREAKPOINT_SM } from '../../constants/windowBreakpoints'

type ChatItemProps = {
  chat: Chat,
  selectedChat: Chat | null,
  setSelectedChat: Function
}

const ChatItem: FC<ChatItemProps> = ({ chat, selectedChat, setSelectedChat }) => {
  const { isDark } = useThemeContext()
  const { friend, lastMessage, me } = chat
  const { t } = useLocale()
  const { width: windowWidth } = useWindowDimensions()

  const isLastMessageMine = lastMessage.senderId === me._id
  const isLastMessageRead = moment(me.lastVisit).isSameOrAfter(moment(lastMessage.createdAt)) || isLastMessageMine

  return (
    <div
      data-testid='chat-item'
      data-cy='chatItem'
      className={`relative h-22 cursor-pointer m-3 mb-0 p-4 pr-6 rounded-2xl 
        ${selectedChat?._id === chat._id ? `${isDark ? 'bg-gray-600' : 'bg-indigo-100'}` : ''}`
      }
      onClick={() => setSelectedChat(chat)}
    >
      <div className={`${isDark ? 'text-white' : 'text-gray-800'}`}>{`${friend.firstName} ${friend.lastName}`}</div>
      <div className='flex flex-row items-center justify-between'>
        <div className={
          `overflow-hidden text-ellipsis whitespace-nowrap text-sm
          ${!isLastMessageRead 
            ? `${isDark ? 'text-indigo-300' : 'text-indigo-500'}` 
            : `${isDark ? 'text-gray-400' : 'text-gray-500'}`
          }`
        }>
          {isLastMessageMine ? lastMessage.text : (lastMessage.textTranslated || lastMessage.text || t.chats.noMessagesYet)}
        </div>
        {windowWidth > WINDOW_WIDTH_BREAKPOINT_SM && (
          <div className='text-sm mx-1 text-gray-400 whitespace-nowrap'>{formatChatPreviewDate(lastMessage.createdAt)}</div>
        )}
      </div>
      {!isLastMessageRead && <div className='absolute right-3 top-[36px] rounded-full h-2 w-2 bg-indigo-500' />}
    </div>
  )
}

export default memo(ChatItem, (prevProps, nextProps) => {
  return JSON.stringify(prevProps.chat) === JSON.stringify(nextProps.chat)
    && JSON.stringify(prevProps.selectedChat) === JSON.stringify(nextProps.selectedChat)
})