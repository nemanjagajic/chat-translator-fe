import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useSetSettingsProperty } from '../../hooks/chats'
import { useChatsContext } from '../../providers/ChatsProvider'
import { useLocale } from '../../hooks/i18n'
import languages from '../../utils/languages'
import { ChatSettingsProperty } from '../../ts/chats'
import socket from '../../sockets'

const ChatSettings = () => {
  const { t } = useLocale()
  const { selectedChat } = useChatsContext()

  const { mutateAsync: setSettingsProperty, invalidateChats } = useSetSettingsProperty()
  const [language, setLanguage] = useState('')

  useEffect(() => {
    if (selectedChat?.me.sendLanguage) setLanguage(selectedChat.me.sendLanguage)
  }, [selectedChat])

  const applyChanges = async () => {
    if (!selectedChat || !language) return

    await setSettingsProperty({
      chatId: selectedChat._id,
      property: ChatSettingsProperty.SEND_LANGUAGE,
      value: language
    })
    await setSettingsProperty({
      chatId: selectedChat._id,
      property: ChatSettingsProperty.RECEIVE_LANGUAGE,
      value: language
    })
    await invalidateChats()
    socket.emit('chatSettingChanged', selectedChat)
  }

  const renderSelectLanguage = (value: string, onChange: Dispatch<SetStateAction<string>>) => (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      {languages.map(language => (
        <option key={language.code} value={language.code}>{language.name}</option>
      ))}
    </select>
  )

  const friendsLanguage = selectedChat?.friend.sendLanguage || t.chats.settings.languageNotSelected

  return (
    <div>
      <div>Mine</div>
      {renderSelectLanguage(language, setLanguage)}
      <div>Their: {friendsLanguage}</div>

      <div onClick={applyChanges}>
        Apply
      </div>
    </div>
  )
}

export default ChatSettings