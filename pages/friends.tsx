import React, { useEffect, useState } from 'react'
import { FriendsSelectedTab } from '../ts/friends'
import { useFetchAllFriends, useSearchUser } from '../hooks/friends'
import FriendsList from '../components/friends/FriendsList'
import { useLocale } from '../hooks/i18n'
import FriendRequestsList from '../components/friendRequests/FriendRequestsList'
import useDebounce from '../hooks/helpers/useDebounce'
import { configureToast } from '../utils/toast'

const SEARCH_FRIEND_OFFSET = 0
const SEARCH_FRIEND_LIMIT = 10
const SEARCH_INPUT_DEBOUNCE_TIMEOUT_MS = 500

const Friends = () => {
  const { t } = useLocale()
  const [selectedTab, setSelectedTab] = useState<FriendsSelectedTab>(FriendsSelectedTab.myFriends)
  const [searchText, setSearchText] = useState('')
  const debouncedSearchText = useDebounce(searchText, SEARCH_INPUT_DEBOUNCE_TIMEOUT_MS)

  const { data: allFriends } = useFetchAllFriends()
  const { data: searchFriendList, refetch: fetchUsers, isRefetching: isRefetchingUsers } =
    useSearchUser(debouncedSearchText, SEARCH_FRIEND_OFFSET, SEARCH_FRIEND_LIMIT)

  useEffect(() => {
    configureToast()
  }, [])

  useEffect(() => {
    if (debouncedSearchText) fetchUsers()
  }, [debouncedSearchText])

  const renderFriendsTab = (tab: FriendsSelectedTab, title: string) => (
    <div
      className='p-2 mx-4'
      onClick={() => setSelectedTab(tab)}
    >
      {title}
    </div>
  )

  const renderSearchResultList = () => {
    if (debouncedSearchText && searchFriendList) return (
      <FriendsList
        friends={searchFriendList}
        isSearchList
        isRefetching={isRefetchingUsers}
      />
    )

    return <div>{t.friends.searchResultsWillAppearHere}</div>
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
    <div className='flex flex-col h-screen bg-gray-50 items-center'>
      <div className='flex flex-row w-full pt-8 items-center justify-center'>
        {friendsTabs.map(tabItem => renderFriendsTab(tabItem.tab, tabItem.title))}
      </div>
      {allFriends && (
        <div className='flex flex-col items-center w-[1024px] mt-6'>
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
              <input className='w-52' onInput={onSearchInputChange} value={searchText}/>
              {renderSearchResultList()}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Friends