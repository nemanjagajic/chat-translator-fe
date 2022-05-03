import React, { useState } from 'react'
import { FriendsSelectedTab } from '../ts/friends'
import { useFetchAllFriends } from '../hooks/friends'
import MyFriendsList from '../components/friends/myFriends/MyFriendsList'

const Friends = () => {
  const [selectedTab, setSelectedTab] = useState<FriendsSelectedTab>(FriendsSelectedTab.myFriends)

  const { data: allFriends } = useFetchAllFriends()

  const renderFriendsTab = (tab: FriendsSelectedTab, title: string) => (
    <div
      className='p-2 mx-4'
      onClick={() => setSelectedTab(tab)}
    >
      {title}
    </div>
  )

  const friendsTabs = [
    FriendsSelectedTab.myFriends, FriendsSelectedTab.receivedRequests,
    FriendsSelectedTab.sentRequests, FriendsSelectedTab.addNewFriend
  ]

  return (
    <div className='flex flex-col h-screen bg-gray-50 items-center'>
      <div className='flex flex-row w-full pt-8 items-center justify-center'>
        {friendsTabs.map(tab => renderFriendsTab(tab, tab))}
      </div>
      {allFriends && (
        <div className='flex flex-col items-center w-[1024px] mt-6'>
          {selectedTab === FriendsSelectedTab.myFriends && (
            <MyFriendsList friends={allFriends.friends} />
          )}
          {selectedTab === FriendsSelectedTab.receivedRequests && (
            <div>Received requests</div>
          )}
          {selectedTab === FriendsSelectedTab.sentRequests && (
            <div>Sent requests</div>
          )}
          {selectedTab === FriendsSelectedTab.addNewFriend && (
            <div>Add new friend</div>
          )}
        </div>
      )}
    </div>
  )
}

export default Friends