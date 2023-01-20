import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useSetSettingsProperty } from '../../hooks/chats'
import { useChatsContext } from '../../providers/ChatsProvider'
import { useLocale } from '../../hooks/i18n'
import languages from '../../utils/languages'
import { ChatSettingsProperty } from '../../ts/chats'
import socket from '../../sockets'
import { toast } from 'react-toastify'
import ToastSuccess from '../shared/ToastSuccess'
import Toggle from '../shared/Toggle'
import { BeatLoader } from 'react-spinners'

type ChatSettingsProps = {
  onApplyChanges: () => void
}

const ChatSettings = ({ onApplyChanges }: ChatSettingsProps) => {
  const { t } = useLocale()
  const { selectedChat } = useChatsContext()

  const { mutateAsync: setSettingsProperty, invalidateChats } = useSetSettingsProperty()
  const [language, setLanguage] = useState('')
  const [isApplyingChanges, setIsApplyingChanges] = useState(false)
  const [showOriginalMessages, setShowOriginalMessages] = useState(false)
  const [isInitialFetchingFinished, setIsInitialFetchingFinished] = useState(false)

  useEffect(() => {
    if (selectedChat?.me.sendLanguage) setLanguage(selectedChat.me.sendLanguage)
    if (selectedChat?.me.showOriginalMessages) setShowOriginalMessages(selectedChat?.me.showOriginalMessages)
    setIsInitialFetchingFinished(true)
  }, [selectedChat])

  const applyChanges = async () => {
    if (!selectedChat || !language) return
    setIsApplyingChanges(true)

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
    await setSettingsProperty({
      chatId: selectedChat._id,
      property: ChatSettingsProperty.SHOW_ORIGINAL_MESSAGES,
      value: showOriginalMessages
    })
    await invalidateChats()
    socket.emit('chatSettingChanged', selectedChat)
    toast(<ToastSuccess text={t.chats.settings.settingsSuccessfullyChanged} />)
    setIsApplyingChanges(false)
    onApplyChanges()
  }

  const isLanguageChanged = !!language && selectedChat?.me.sendLanguage !== language
  const isShowOriginalMessagesChanged = selectedChat?.me.showOriginalMessages !== showOriginalMessages
  const hasChanges = isLanguageChanged || isShowOriginalMessagesChanged

  const renderSelectLanguage = (value: string, onChange: Dispatch<SetStateAction<string>>) => (
    <select
      className='outline-0 cursor-pointer'
      value={value}
      onChange={(event) => onChange(event.target.value)}
      data-cy='selectLanguageDropdown'
    >
      <option className='hidden'>{t.chats.selectLanguage}</option>
      {languages.map(language => (
        <option key={language.code} value={language.code}>{language.name}</option>
      ))}
    </select>
  )

  const friendsLanguage = selectedChat?.friend.sendLanguage || t.chats.settings.languageNotSelected

  if (!isInitialFetchingFinished) return (
    <div className='w-[430.5px] h-[312px] bg-white' />
  )

  return (
    <div className='p-4'>
      <div className={'flex items-center justify-center h-8 w-full mb-10 text-indigo-500'}>
        {t.chats.chatWith(`${selectedChat?.friend.firstName} ${selectedChat?.friend.lastName}`)}
      </div>
      <div className='flex flex-row mb-6'>
        <div className='text-gray-500 w-60'>{t.chats.settings.myLanguage}:</div>
        {renderSelectLanguage(language, setLanguage)}
      </div>
      <div className='flex flex-row mb-6'>
        <div className='text-gray-500 w-60'>{t.chats.settings.friendsLanguage}:</div>
        <div className='pl-1'>{friendsLanguage}</div>
      </div>
      <div className='flex flex-row items-center'>
        <div className='text-gray-500 w-60'>{t.chats.settings.showOriginalMessages}:</div>
        <Toggle
          isChecked={showOriginalMessages}
          onChange={() => setShowOriginalMessages(prevState => !prevState)}
        />
      </div>
      <div className='flex items-center justify-center mt-12'>
        <div
          className={`
          px-6 py-2 rounded-xl text-white 
          ${(hasChanges && !isApplyingChanges) ? 'bg-teal-400 cursor-pointer' : 'bg-gray-300 cursor-default'}`
        }
          onClick={() => hasChanges && !isApplyingChanges && applyChanges()}
          data-cy='applySettingsButton'
        >
          {isApplyingChanges ? <BeatLoader color={'#808080'} size={10} /> : t.chats.apply}
        </div>
      </div>
    </div>
  )
}

export default ChatSettings