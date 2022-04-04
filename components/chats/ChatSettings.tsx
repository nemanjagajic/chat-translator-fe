import React, { ChangeEventHandler, Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useSetSettingsProperty } from '../../hooks/chats'
import { useChatsContext } from '../../providers/ChatsProvider'
import { useLocale } from '../../hooks/i18n'
import languages from '../../utils/languages'
import { ChatSettingsProperty } from '../../ts/chats'

const ChatSettings = () => {
  const { t } = useLocale()
  const { selectedChat } = useChatsContext()

  const { mutateAsync: setSettingsProperty } = useSetSettingsProperty(selectedChat)
  const [sendLanguage, setSendLanguage] = useState('')
  const [receiveLanguage, setReceiveLanguage] = useState('')

  useEffect(() => {
    if (selectedChat?.me.sendLanguage) setSendLanguage(selectedChat?.me.sendLanguage)
    if (selectedChat?.me.receiveLanguage) setReceiveLanguage(selectedChat?.me.receiveLanguage)
  }, [selectedChat])

  const applyChanges = async () => {
    if (!selectedChat || !sendLanguage || !receiveLanguage) return

    await setSettingsProperty({
      chatId: selectedChat._id,
      property: ChatSettingsProperty.SEND_LANGUAGE,
      value: sendLanguage
    })
    await setSettingsProperty({
      chatId: selectedChat._id,
      property: ChatSettingsProperty.RECEIVE_LANGUAGE,
      value: receiveLanguage
    })
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

  const friendsSendLanguage = selectedChat?.friend.sendLanguage || t.chats.settings.languageNotSelected
  const friendsReceiveLanguage = selectedChat?.friend.receiveLanguage || t.chats.settings.languageNotSelected

  return (
    <div>
      <div>Mine</div>
      <div>Send language:</div>
      {renderSelectLanguage(sendLanguage, setSendLanguage)}
      <div>Receive language:</div>
      {renderSelectLanguage(receiveLanguage, setReceiveLanguage)}
      <div>Theirs</div>
      <div>Send language: {friendsSendLanguage}</div>
      <div>Receive language: {friendsReceiveLanguage}</div>

      <div onClick={applyChanges}>
        Apply
      </div>
    </div>
  )
}

export default ChatSettings