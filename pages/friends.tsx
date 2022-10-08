import React, { useEffect, useState } from 'react'
import { FriendsSelectedTab } from '../ts/friends'
import { useFetchAllFriends, useSearchUser } from '../hooks/friends'
import FriendsList from '../components/friends/FriendsList'
import { useLocale } from '../hooks/i18n'
import FriendRequestsList from '../components/friendRequests/FriendRequestsList'
import useDebounce from '../hooks/helpers/useDebounce'
import { configureToast } from '../utils/toast'
import { useRouter } from 'next/router'
import { useThemeContext } from '../providers/ThemeProvider'
import socket from '../sockets'
import { SocketEvents } from '../ts/sockets'

const SEARCH_FRIEND_OFFSET = 0
const SEARCH_FRIEND_LIMIT = 10
const SEARCH_INPUT_DEBOUNCE_TIMEOUT_MS = 500

const Friends = () => {
  const { isDark } = useThemeContext()
  const { t } = useLocale()
  const router = useRouter()
  const [selectedTab, setSelectedTab] = useState<FriendsSelectedTab>(FriendsSelectedTab.myFriends)
  const [searchText, setSearchText] = useState('')
  const debouncedSearchText = useDebounce(searchText, SEARCH_INPUT_DEBOUNCE_TIMEOUT_MS)

  const { data: allFriends, invalidateFriends } = useFetchAllFriends()
  const { data: searchFriendList, refetch: fetchUsers, isRefetching: isRefetchingUsers } =
    useSearchUser(debouncedSearchText, SEARCH_FRIEND_OFFSET, SEARCH_FRIEND_LIMIT)

  useEffect(() => {
    configureToast()
    socket.on(SocketEvents.newFriendRequest, handleFriendRequest)
    return () => {
      socket.off(SocketEvents.newFriendRequest, handleFriendRequest)
    }
  }, [])

  useEffect(() => {
    if (debouncedSearchText) fetchUsers()
  }, [debouncedSearchText])

  useEffect(() => {
    const path = router.asPath
    if (path === `/friends?${FriendsSelectedTab.myFriends}`) setSelectedTab(FriendsSelectedTab.myFriends)
    if (path === `/friends?${FriendsSelectedTab.receivedRequests}`) setSelectedTab(FriendsSelectedTab.receivedRequests)
    if (path === `/friends?${FriendsSelectedTab.sentRequests}`) setSelectedTab(FriendsSelectedTab.sentRequests)
    if (path === `/friends?${FriendsSelectedTab.addNewFriend}`) setSelectedTab(FriendsSelectedTab.addNewFriend)
  }, [router.asPath])

  const handleFriendRequest = () => {
    invalidateFriends()
  }

  const renderFriendsTab = (tab: FriendsSelectedTab, title: string) => (
    <div
      className={`
        flex flex-row px-4 py-3 mx-4 rounded-3xl cursor-pointer w-52 justify-center items-center
        ${tab === selectedTab ? 'bg-indigo-500 text-white' : 'text-gray-600 bg-gray-200'}`
    }
      onClick={() => router.push(`/friends?${tab}`)}
    >
      <div>{title}</div>
      {tab !== FriendsSelectedTab.addNewFriend && (
        <div className='flex items-center justify-center bg-white text-gray-500 rounded-full px-2 ml-2 text-sm border'>
          {getItemsNumberByTab(tab)}
        </div>
      )}
    </div>
  )

  const getItemsNumberByTab = (tab: FriendsSelectedTab) => {
    if (!allFriends) return 0
    if (tab === FriendsSelectedTab.myFriends)
      return allFriends.friends.length
    if (tab === FriendsSelectedTab.sentRequests)
      return allFriends.friendRequests.filter(request => request.requestedByMe).length
    if (tab === FriendsSelectedTab.receivedRequests)
      return allFriends.friendRequests.filter(request => !request.requestedByMe).length
    return 0
  }

  const renderSearchResultList = () => {
    if (debouncedSearchText && searchFriendList) return (
      <FriendsList
        friends={searchFriendList}
        isSearchList
        isRefetching={isRefetchingUsers}
        allFriends={allFriends}
      />
    )

    return <div className='text-gray-400 mt-8'>{t.friends.searchResultsWillAppearHere}</div>
  }

  const onSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  const friendsTabs = [
    { tab: FriendsSelectedTab.myFriends, title: t.friends.tabTitles.myFriends },
    { tab: FriendsSelectedTab.receivedRequests, title: t.friends.tabTitles.receivedRequests },
    { tab: FriendsSelectedTab.sentRequests, title: t.friends.tabTitles.sentRequests },
    { tab: FriendsSelectedTab.addNewFriend, title: t.friends.tabTitles.addNewFriend }
  ]

  const myFriends = allFriends?.friends
  const receivedRequests = allFriends && allFriends.friendRequests.filter(friendRequest => !friendRequest.requestedByMe)
  const sentRequests = allFriends && allFriends.friendRequests.filter(friendRequest => friendRequest.requestedByMe)

  return (
    <div className={`flex flex-col h-screen ${isDark ? 'bg-gray-700' : 'bg-gray-50'} items-center`}>
      <div className='flex flex-row w-full pt-8 items-center justify-center'>
        {friendsTabs.map(tabItem => renderFriendsTab(tabItem.tab, tabItem.title))}
      </div>
      {allFriends && (
        <div className='flex flex-col items-center w-[1024px] mt-6 overflow-y-scroll mb-20'>
          {selectedTab === FriendsSelectedTab.myFriends && myFriends && (
            <FriendsList friends={myFriends} />
          )}
          {selectedTab === FriendsSelectedTab.receivedRequests && receivedRequests && (
            <FriendRequestsList friendsRequests={receivedRequests} />
          )}
          {selectedTab === FriendsSelectedTab.sentRequests && sentRequests && (
            <FriendRequestsList friendsRequests={sentRequests} />
          )}
          {selectedTab === FriendsSelectedTab.addNewFriend && (
            <div className='w-full flex flex-col items-center'>
              <input
                className='w-80 focus:outline-none p-2 rounded-2xl h-[40px] resize-none border mt-6'
                onInput={onSearchInputChange}
                value={searchText}
                placeholder={t.friends.addFriendInputPlaceholder}
                data-cy='addFriendSearchInput'
              />
              {renderSearchResultList()}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Friends