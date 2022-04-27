import React, { FC, useEffect } from 'react'
import ChatsList from './ChatsList'
import { Chat } from '../../ts/chats'
import { useChatsContext } from '../../providers/ChatsProvider'

type ChatsDrawerProps = {
  chats: Chat[]
  isLoadingChats: boolean
}

const ChatsDrawer: FC<ChatsDrawerProps> = ({ chats, isLoadingChats }) => {
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
      || (friendNew.sendLanguage !== friend.sendLanguage)
      || (friendNew.receiveLanguage !== friend.receiveLanguage)
      || (friendNew.lastVisit !== friend.lastVisit)
    if (isSelectedChatLanguageChanged && selectedChatNewestVersion) setSelectedChat(selectedChatNewestVersion)
  }

  return (
    <div className='flex h-full w-[25%] bg-gray-100 border-r'>
      {!isLoadingChats && <ChatsList chats={chats} selectedChat={selectedChat} setSelectedChat={setSelectedChat} />}
    </div>
  )
}

export default ChatsDrawer