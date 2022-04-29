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

  const isLanguageChanged = !!language && selectedChat?.me.sendLanguage !== language

  const renderSelectLanguage = (value: string, onChange: Dispatch<SetStateAction<string>>) => (
    <select
      className='outline-0 cursor-pointer'
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
    <div className='p-4'>
      <div className='flex flex-row mb-6'>
        <div className='text-gray-500 w-44'>{t.chats.myLanguage}:</div>
        {renderSelectLanguage(language, setLanguage)}
      </div>
      <div className='flex flex-row'>
        <div className='text-gray-500 w-44'>{t.chats.friendsLanguage}:</div>
        <div className='pl-1'>{friendsLanguage}</div>
      </div>
      <div className='flex items-center justify-center mt-12'>
        <div
          className={`
          px-6 py-2 rounded-xl text-white 
          ${isLanguageChanged ? 'bg-teal-400 cursor-pointer' : 'bg-gray-300 cursor-default'}`
        }
          onClick={() => isLanguageChanged && applyChanges()}
        >
          Apply
        </div>
      </div>
    </div>
  )
}

export default ChatSettings