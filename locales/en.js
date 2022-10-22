export default {
  general: {
    title: 'Chat translator',
    yes: 'Yes',
    no: 'No'
  },
  auth: {
    pageTitle: 'Break language barrier.',
    pageDescription: 'Chat with messages instantly translated to desired language',
    login: 'Login',
    register: 'Register',
    placeholders: {
      usernameOrEmail: 'Username or email',
      password: 'Password',
      firstName: 'First name',
      lastName: 'Last name'
    },
    buttons: {
      logIn: 'Log in',
      logOut: 'Log out',
      register: 'Register'
    }
  },
  chats: {
    emptyChatList: 'There are no chats yet, start by adding a friend!',
    noMessages: 'Send a message to start the conversation!',
    settings: {
      myLanguage: 'My language',
      friendsLanguage: 'Friend\'s language',
      languageNotSelected: 'Language not selected',
      settingsSuccessfullyChanged: 'Settings successfully changed',
      showOriginalMessages: 'Show original messages'
    },
    chatWillAppear: 'Selected chat will appear here',
    addFriend: 'Add friend',
    noMessagesYet: 'No messages yet',
    chatWith: (friend) => `Chat settings for ${friend}`,
    friendTyping: 'Friend typing...',
    selectLanguage: 'Select language'
  },
  messages: {
    fetchOlder: 'Fetch older',
    new: 'new',
    messageNotSent: 'Message not sent'
  },
  navbar: {
    chats: 'Chats',
    friends: 'Friends'
  },
  friends: {
    tabTitles: {
      myFriends: 'My friends',
      receivedRequests: 'Received requests',
      sentRequests: 'Sent requests',
      addNewFriend: 'Add new friend'
    },
    searchResultsWillAppearHere: 'Search results will appear here',
    noUsersMatchingSearch: 'No users found matching this search',
    successfullySentFriendRequest: 'Successfully sent friend request',
    successfullyRespondedToRequest: 'Successfully responded to request',
    sendRequest: 'Send request',
    friendStatus: {
      me: 'Me',
      friend: 'Friend',
      requestSent: 'Request sent',
      requestReceived: 'Request received'
    },
    requestListIsEmpty: 'Request list is empty',
    friendListEmpty: 'Friend list is empty',
    newFriendRequest: 'new friend request',
    addFriendInputPlaceholder: 'Type user name or email',
    areYouSureDeleteMessage: 'Are you sue you want to delete a friend?',
    friendRemoved: 'Friend removed',
    failedToAddFriend: 'Failed to add friend'
  }
}