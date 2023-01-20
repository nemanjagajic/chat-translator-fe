"use strict";
exports.id = 632;
exports.ids = [632];
exports.modules = {

/***/ 632:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "b": () => (/* binding */ useLocale)
});

// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(853);
;// CONCATENATED MODULE: ./locales/en.js
/* harmony default export */ const en = ({
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
        chatWith: (friend)=>`Chat settings for ${friend}`
        ,
        friendTyping: 'Friend typing...',
        selectLanguage: 'Select language',
        apply: 'Apply'
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
            addNewFriend: 'Add new friend',
            received: 'Received',
            sent: 'Sent'
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
});

;// CONCATENATED MODULE: ./hooks/i18n.ts


const useLocale = ()=>{
    const { locale  } = (0,router_.useRouter)();
    // Other languages will come here in future
    const t = locale === 'en' ? en : en;
    return {
        t
    };
};


/***/ })

};
;