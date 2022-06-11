import React, { FC, useEffect } from 'react'
import ChatsList from './ChatsList'
import { Chat } from '../../ts/chats'
import { useChatsContext } from '../../providers/ChatsProvider'
import { useThemeContext } from '../../providers/ThemeProvider'

type ChatsDrawerProps = {
  chats: Chat[]
  isLoadingChats: boolean
}

const ChatsDrawer: FC<ChatsDrawerProps> = ({ chats, isLoadingChats }) => {
  const { isDark } = useThemeContext()
  const { selectedChat, setSelectedChat } = useChatsContext()

  useEffect(() => {
    if (!isLoadingChats && !selectedChat && chats[0]) setSelectedChat(chats[0])
    checkAndUpdateSelectedChat()
  }, [chats])

  const checkAndUpdateSelectedChat = () => {
    const selectedChatNewestVersion = chats.find(chat => chat._id === selectedChat?._id)
    if (!selectedChat || !selectedChatNewestVersion) return

    const me = selectedChat.me
    const meNew = selectedChatNewestVersion.me
    const friend = selectedChat.friend
    const friendNew = selectedChatNewestVersion.friend
    const isSelectedChatLanguageChanged = (meNew.sendLanguage !== me.sendLanguage)
      || (meNew.receiveLanguage !== me.receiveLanguage)
      || (meNew.showOriginalMessages !== me.showOriginalMessages)
      || (friendNew.sendLanguage !== friend.sendLanguage)
      || (friendNew.receiveLanguage !== friend.receiveLanguage)
      || (friendNew.lastVisit !== friend.lastVisit)
    if (isSelectedChatLanguageChanged && selectedChatNewestVersion) setSelectedChat(selectedChatNewestVersion)
  }

  return (
    <div className={`flex h-full w-[25%] ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-100'} border-r`}>
      {!isLoadingChats && <ChatsList chats={chats} selectedChat={selectedChat} setSelectedChat={setSelectedChat} />}
    </div>
  )
}

export default ChatsDrawer