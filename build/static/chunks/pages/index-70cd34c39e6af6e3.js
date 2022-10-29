(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{45301:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(87916)}])},89949:function(e,t,n){"use strict";var a=n(85893),r=n(67294);t.Z=function(e){var t=e.children,n=e.isOpen,i=e.onClose,s=(0,r.useRef)(null),c=function(e){s.current&&!s.current.contains(e.target)&&i()};return(0,r.useEffect)((function(){return document.addEventListener("click",c,!0),function(){document.removeEventListener("click",c,!0)}}),[]),n?(0,a.jsx)("div",{className:"fixed top-0 left-0 w-full h-full bg-black/30 z-[10]",children:(0,a.jsx)("div",{ref:s,className:"fixed bg-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-4 rounded-2xl",children:t})}):null}},86011:function(e,t,n){"use strict";var a=n(85893),r=(n(67294),n(56239));t.Z=function(e){var t=e.text;return(0,a.jsxs)("div",{className:"flex flex-row justify-center items-center",children:[(0,a.jsx)("div",{className:"w-5 h-5 flex justify-center items-center rounded-full bg-teal-400 mr-2",children:(0,a.jsx)(r.MCw,{height:"15px",width:"15px",color:"white"})}),(0,a.jsx)("div",{className:"text-gray-400",children:t})]})}},57529:function(e,t,n){"use strict";n.d(t,{l$:function(){return L},GX:function(){return j},mA:function(){return N},$3:function(){return C},dr:function(){return k},jR:function(){return S}});var a=n(88767),r=n(34051),i=n.n(r),s=n(54897);function c(e,t,n,a,r,i,s){try{var c=e[i](s),o=c.value}catch(u){return void n(u)}c.done?t(o):Promise.resolve(o).then(a,r)}function o(e){return function(){var t=this,n=arguments;return new Promise((function(a,r){var i=e.apply(t,n);function s(e){c(i,a,r,s,o,"next",e)}function o(e){c(i,a,r,s,o,"throw",e)}s(void 0)}))}}var u="/api/chats",d="/api/messages",l="api/chats/setSettingsProperty",f="api/chats/setChatVisited",h="/api/chats/create",m=function(){var e=o(i().mark((function e(t){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,s.Nv)(s.ZP.get("".concat(u,"?showRemovedFriends=").concat(t))));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),g=function(){var e=o(i().mark((function e(t,n,a){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,s.Nv)(s.ZP.get("".concat(d,"?chatId=").concat(t,"&offset=").concat(n,"&limit=").concat(a))));case 1:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}(),v=function(){var e=o(i().mark((function e(t,n){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,s.Nv)(s.ZP.post(d,{chatId:t,text:n})));case 1:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),x=function(){var e=o(i().mark((function e(t,n,a){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,s.Nv)(s.ZP.post(l,{chatId:t,property:n,value:a})));case 1:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}(),p=function(){var e=o(i().mark((function e(t,n){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,s.Nv)(s.ZP.post(f,{userId:t,chatId:n})));case 1:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),w=function(){var e=o(i().mark((function e(t){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,s.Nv)(s.ZP.post(h,{userId:t})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),y=n(41809),b=n(39187),j=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=(0,a.useQueryClient)(),n=(0,b.xq)(),r=function(){return t.invalidateQueries("chats")},i=(0,a.useQuery)("chats",(function(){return m(e)}),{enabled:!!n}),s=i.data,c=i.isLoading,o=i.error;return{data:s,isLoading:c,error:o,invalidateChats:r}},N=function(e,t){var n=(0,a.useInfiniteQuery)(["messages",e],(function(n){var a=n.pageParam;return g(e,void 0===a?0:a,t)}),{enabled:!!e});return{data:n.data,fetchNextPage:n.fetchNextPage,isLoading:n.isLoading,error:n.error}},C=function(e,t){var n=(0,a.useQueryClient)(),r=(0,b.xq)(),i=(0,a.useMutation)((function(e){var t=e.chatId,n=e.text;return v(t,n)}),{onSuccess:function(t){var a=t.message;y.Z.emit("chatMessageSent",a),null===e||void 0===e||e(),n.invalidateQueries("chats")},onError:function(){null===t||void 0===t||t({user:r})}});return{mutate:i.mutate,isLoading:i.isLoading,error:i.error}},S=function(){var e=(0,a.useQueryClient)(),t=(0,a.useMutation)((function(e){var t=e.chatId,n=e.property,a=e.value;return x(t,n,a)}));return{mutate:t.mutate,mutateAsync:t.mutateAsync,isLoading:t.isLoading,error:t.error,invalidateChats:function(){return e.invalidateQueries("chats")}}},k=function(){var e=(0,a.useMutation)((function(e){var t=e.userId,n=e.chatId;return p(t,n)}));return{mutate:e.mutate,mutateAsync:e.mutateAsync,isLoading:e.isLoading,error:e.error}},L=function(){var e=(0,a.useMutation)((function(e){var t=e.userId;return w(t)}));return{mutate:e.mutate,mutateAsync:e.mutateAsync,isLoading:e.isLoading,error:e.error}}},87916:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return U}});var a=n(85893),r=n(57529),i=n(39187),s=n(67294),c=n(30381),o=n.n(c),u=n(22632),d=n(2740),l=function(e){var t,n=e.chat,r=e.selectedChat,i=e.setSelectedChat,s=(0,d.T)().isDark,c=n.friend,l=n.lastMessage,f=n.me,h=(0,u.b)().t,m=l.senderId===f._id,g=o()(f.lastVisit).isSameOrAfter(o()(l.createdAt))||m;return(0,a.jsxs)("div",{"data-testid":"chat-item","data-cy":"chatItem",className:"relative h-22 cursor-pointer m-3 mb-0 p-4 pr-6 rounded-2xl \n        ".concat((null===r||void 0===r?void 0:r._id)===n._id?"".concat(s?"bg-gray-600":"bg-indigo-100"):""),onClick:function(){return i(n)},children:[(0,a.jsx)("div",{className:"".concat(s?"text-white":"text-gray-800"),children:"".concat(c.firstName," ").concat(c.lastName)}),(0,a.jsxs)("div",{className:"flex flex-row items-center justify-between",children:[(0,a.jsx)("div",{className:"overflow-hidden text-ellipsis whitespace-nowrap text-sm\n          ".concat("".concat(g?s?"text-gray-400":"text-gray-500":s?"text-indigo-300":"text-indigo-500")),children:m?l.text:l.textTranslated||l.text||h.chats.noMessagesYet}),(0,a.jsx)("div",{className:"text-sm mx-1 text-gray-400 whitespace-nowrap",children:(t=l.createdAt,o()(t).isSame(o()(),"day")?o()(t).format("HH:mm"):o()(t).isSame(o()(),"year")?o()(t).format("MMM D"):o()(t).format("MMM DD, YYYY"))})]}),!g&&(0,a.jsx)("div",{className:"absolute right-3 top-[36px] rounded-full h-2 w-2 bg-indigo-500"})]})},f=(0,s.memo)(l,(function(e,t){return JSON.stringify(e.chat)===JSON.stringify(t.chat)&&JSON.stringify(e.selectedChat)===JSON.stringify(t.selectedChat)})),h=n(11163),m=function(e){var t=e.chats,n=e.selectedChat,r=e.setSelectedChat,i=(0,u.b)().t,s=(0,h.useRouter)();return(0,a.jsx)("div",{className:"flex flex-col h-full w-full overflow-y-scroll",children:t.length>0?t.map((function(e){return(0,a.jsx)(f,{chat:e,selectedChat:n,setSelectedChat:r},e._id)})):(0,a.jsxs)("div",{className:"flex flex-col m-4 text-gray-500 items-center text-center",children:[i.chats.emptyChatList,(0,a.jsx)("div",{className:"flex cursor-pointer bg-indigo-500 text-white p-2 rounded-3xl w-32 items-center justify-center mt-4",onClick:function(){return s.push("/friends?addNewFriend")},children:i.chats.addFriend})]})})},g={selectedChat:null,setSelectedChat:function(){}},v=(0,s.createContext)(g),x=function(){return(0,s.useContext)(v)},p=function(e){var t=e.children,n=(0,s.useState)(null),r=n[0],i=n[1];return(0,a.jsx)(v.Provider,{value:{selectedChat:r,setSelectedChat:i},children:t})},w=function(e){var t=e.chats,n=e.isLoadingChats,r=(0,d.T)().isDark,i=x(),c=i.selectedChat,o=i.setSelectedChat;(0,s.useEffect)((function(){n||c||!t[0]||o(t[0]),u()}),[t]);var u=function(){var e=t.find((function(e){return e._id===(null===c||void 0===c?void 0:c._id)}));if(c&&e){var n=c.me,a=e.me,r=c.friend,i=e.friend;(a.sendLanguage!==n.sendLanguage||a.receiveLanguage!==n.receiveLanguage||a.showOriginalMessages!==n.showOriginalMessages||i.sendLanguage!==r.sendLanguage||i.receiveLanguage!==r.receiveLanguage||i.lastVisit!==r.lastVisit)&&e&&o(e)}};return(0,a.jsx)("div",{className:"flex h-full w-[25%] ".concat(r?"bg-gray-700 border-gray-600":"bg-gray-100"," border-r"),children:!n&&(0,a.jsx)(m,{chats:t,selectedChat:c,setSelectedChat:o})})},y=n(34051),b=n.n(y),j=n(56239),N=function(e){var t=e.message,n=t.text,r=t.textTranslated,s=t.senderId,c=t.createdAt,u=e.showDateSeparator,l=e.nextMessageDate,f=e.isRead,h=e.showOriginalMessages,m=(0,d.T)().isDark,g=(0,i.xq)(),v=s===(null===g||void 0===g?void 0:g._id);return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("div",{"data-testid":"message-item",className:"flex flex-col \n          ".concat(v?"self-end bg-indigo-500":"self-start ".concat(m?"bg-gray-500":"bg-gray-200")," \n          mx-4 max-w-[50%] rounded-3xl px-4 pt-2 pb-1 break-words z-[1] mt-1"),children:[(0,a.jsx)("div",{className:"".concat(v||m?"text-white":"text-gray-800"),"data-cy":"translatedMessageText",children:v&&!h?n:r||n}),(0,a.jsxs)("div",{className:"flex flex-row items-center w-full ".concat(v?"justify-end":"justify-start"),children:[(0,a.jsx)("div",{className:"text-xs mr-1 ".concat(v?"text-gray-300":"text-gray-500"),children:o()(c).format("HH:mm")}),v&&(0,a.jsx)("div",{children:f?(0,a.jsx)(j.dIh,{height:"15px",width:"15px",color:"#2dd4bf"}):(0,a.jsx)(j.MCw,{height:"15px",width:"15px",color:"#2dd4bf"})})]})]}),h&&(0,a.jsx)("div",{className:"flex flex-col \n          ".concat(v?"self-end ".concat(m?"bg-indigo-900 text-gray-200":"bg-indigo-200"," text-white"):"self-start ".concat(m?"bg-gray-800 text-gray-400":"bg-gray-100 text-gray-400")," \n          mx-4 max-w-[50%] rounded-3xl px-4 pt-2 pb-1 break-words mb-[-8px] pb-2 mt-2"),"data-cy":"originalMessageText",children:n}),u&&(0,a.jsxs)("div",{className:"flex flex-row w-full items-center py-8 px-12",children:[(0,a.jsx)("div",{className:"flex flex-1 h-[1px] ".concat(m?"bg-gray-500":"bg-gray-200")}),(0,a.jsx)("div",{className:"px-6 ".concat(m?"text-gray-300":"text-gray-500"," text-sm"),children:o()(l).format("MMM DD, YYYY")}),(0,a.jsx)("div",{className:"flex flex-1 h-[1px] ".concat(m?"bg-gray-500":"bg-gray-200")})]})]})},C=(0,s.memo)(N,(function(e,t){return JSON.stringify(e.message)===JSON.stringify(t.message)&&e.isRead===t.isRead&&e.showOriginalMessages===t.showOriginalMessages})),S=function(e){var t=e.messagesPages,n=e.friendLastVisit,r=e.fetchOlderMessages,i=e.isLastPageReached,s=e.showOriginalMessages,c=(0,u.b)().t,d=!t[0][0];return(0,a.jsxs)("div",{className:"flex flex-col-reverse h-full w-full overflow-y-scroll py-4",children:[d?(0,a.jsx)("div",{className:"flex items-center justify-center mb-4 w-full text-gray-400 h-full",children:c.chats.noMessages}):null===t||void 0===t?void 0:t.map((function(e){return e.map((function(t,r){return(0,a.jsx)(C,{message:t,showDateSeparator:0!==r&&!o()(t.createdAt).isSame(e[r-1].createdAt,"day"),nextMessageDate:e[r-1]&&e[r-1].createdAt,isRead:!!n&&o()(n).isSameOrAfter(o()(t.createdAt)),showOriginalMessages:s},t._id)}))})),!i&&(0,a.jsx)("div",{className:"flex justify-center mb-4",onClick:r,children:(0,a.jsxs)("div",{className:"flex flex-row justify-center items-center bg-teal-400 text-white rounded-3xl px-4 py-2 cursor-pointer",children:[(0,a.jsx)(j.a2Z,{height:"15px",width:"15px",color:"white"}),(0,a.jsx)("div",{className:"pl-1 text-sm",children:c.messages.fetchOlder})]})})]})},k=n(88767),L=n(41809),M=n(40782),E=n(24926),I=n(64487),_=function(e){var t=e.fetchNewestMessages,n=(0,d.T)().isDark,i=x().selectedChat,c=(0,s.useRef)(),o=(0,s.useState)(""),l=o[0],f=o[1],h=(0,s.useState)(!1),m=h[0],g=h[1],v=(0,u.b)().t,p=(0,r.$3)(t,(function(e){(0,M.Am)((0,a.jsx)(E.Z,{text:v.messages.messageNotSent})),I.Tb({user:e.user,text:l,chatId:null===i||void 0===i?void 0:i._id})})).mutate;(0,s.useEffect)((function(){var e=document.activeElement===c.current;""!==l&&e&&!m&&g(!0),""===l&&m&&g(!1)}),[l,m]),(0,s.useEffect)((function(){i&&L.Z.emit(m?"startedTyping":"stoppedTyping",{chatId:i._id,friendId:i.friend._id})}),[m,i]);var w=function(){var e=null===i||void 0===i?void 0:i._id;e&&l&&(f(""),p({chatId:e,text:l}))};return(0,a.jsxs)("div",{className:"flex w-full ".concat(n?"bg-gray-600 border-gray-500":"white"," ml-2 mb-2 rounded-2xl border"),children:[(0,a.jsx)("textarea",{ref:c,className:"focus:outline-none w-full p-2 rounded-2xl h-[40px] resize-none ".concat(n?"bg-gray-600 text-white":"white"),value:l,onInput:function(e){"\n"!==e.target.value&&(f(e.target.value),c.current.style.height="",c.current.style.height=c.current.scrollHeight+"px")},onKeyDown:function(e){"Enter"!==e.key||e.shiftKey||(w(),c.current.style.height="")},onBlur:function(){return g(!1)},"data-cy":"messageTextarea"}),(0,a.jsx)("button",{className:"pr-4 ".concat(l?"cursor-pointer":"cursor-auto"),onClick:w,"data-cy":"sendMessageButton",children:(0,a.jsx)(j.vw7,{height:"20px",width:"20px",color:l?"#2dd4bf":"#d1d5db"})})]})},A=n(89949),O=[{name:"Afrikaans",code:"af"},{name:"Irish",code:"ga"},{name:"Albanian",code:"sq"},{name:"Italian",code:"it"},{name:"Arabic",code:"ar"},{name:"Japanese",code:"ja"},{name:"Azerbaijani",code:"az"},{name:"Kannada",code:"kn"},{name:"Basque",code:"eu"},{name:"Korean",code:"ko"},{name:"Bengali",code:"bn"},{name:"Latin",code:"la"},{name:"Belarusian",code:"be"},{name:"Latvian",code:"lv"},{name:"Bulgarian",code:"bg"},{name:"Lithuanian",code:"lt"},{name:"Catalan",code:"ca"},{name:"Macedonian",code:"mk"},{name:"Chinese Simplified",code:"zh-CN"},{name:"Malay",code:"ms"},{name:"Chinese Traditional",code:"zh-TW"},{name:"Maltese",code:"mt"},{name:"Croatian",code:"hr"},{name:"Norwegian",code:"no"},{name:"Czech",code:"cs"},{name:"Persian",code:"fa"},{name:"Danish",code:"da"},{name:"Polish",code:"pl"},{name:"Dutch",code:"nl"},{name:"Portuguese",code:"pt"},{name:"English",code:"en"},{name:"Romanian",code:"ro"},{name:"Esperanto",code:"eo"},{name:"Russian",code:"ru"},{name:"Estonian",code:"et"},{name:"Serbian",code:"sr-Latn"},{name:"Serbian Cyrillic",code:"sr"},{name:"Filipino",code:"tl"},{name:"Slovak",code:"sk"},{name:"Finnish",code:"fi"},{name:"Slovenian",code:"sl"},{name:"French",code:"fr"},{name:"Spanish",code:"es"},{name:"Galician",code:"gl"},{name:"Swahili",code:"sw"},{name:"Georgian",code:"ka"},{name:"Swedish",code:"sv"},{name:"German",code:"de"},{name:"Tamil",code:"ta"},{name:"Greek",code:"el"},{name:"Telugu",code:"te"},{name:"Gujarati",code:"gu"},{name:"Thai",code:"th"},{name:"Haitian Creole",code:"ht"},{name:"Turkish",code:"tr"},{name:"Hebrew",code:"iw"},{name:"Ukrainian",code:"uk"},{name:"Hindi",code:"hi"},{name:"Urdu",code:"ur"},{name:"Hungarian",code:"hu"},{name:"Vietnamese",code:"vi"},{name:"Icelandic",code:"is"},{name:"Welsh",code:"cy"},{name:"Indonesian",code:"id"},{name:"Yiddish",code:"yi"}];O.sort((function(e,t){return e.name<t.name?-1:e.name>t.name?1:0}));var Z,P=O.sort();!function(e){e.SEND_LANGUAGE="sendLanguage",e.RECEIVE_LANGUAGE="receiveLanguage",e.SHOW_ORIGINAL_MESSAGES="showOriginalMessages"}(Z||(Z={}));var T=n(86011),R=function(e){var t=e.isChecked,n=e.onChange;return(0,a.jsx)("div",{className:"relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in",children:(0,a.jsxs)("label",{className:"relative flex justify-between items-center group ml-[-16px] text-xl",children:[(0,a.jsx)("input",{checked:t,type:"checkbox",className:"absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md cursor-pointer",onClick:n}),(0,a.jsx)("span",{className:"w-12 h-6 flex items-center flex-shrink-0 ml-4 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-teal-400 after:w-8 after:h-8 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-6 after:w-6 after:h-6 cursor-pointer"})]})})};function D(e,t,n,a,r,i,s){try{var c=e[i](s),o=c.value}catch(u){return void n(u)}c.done?t(o):Promise.resolve(o).then(a,r)}var F=function(){var e=(0,u.b)().t,t=x().selectedChat,n=(0,r.jR)(),i=n.mutateAsync,c=n.invalidateChats,o=(0,s.useState)(""),d=o[0],l=o[1],f=(0,s.useState)(!1),h=f[0],m=f[1],g=(0,s.useState)(!1),v=g[0],p=g[1];(0,s.useEffect)((function(){(null===t||void 0===t?void 0:t.me.sendLanguage)&&l(t.me.sendLanguage),(null===t||void 0===t?void 0:t.me.showOriginalMessages)&&m(null===t||void 0===t?void 0:t.me.showOriginalMessages),p(!0)}),[t]);var w,y,j=function(){var n,r=(n=b().mark((function n(){return b().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(t&&d){n.next=2;break}return n.abrupt("return");case 2:return n.next=4,i({chatId:t._id,property:Z.SEND_LANGUAGE,value:d});case 4:return n.next=6,i({chatId:t._id,property:Z.RECEIVE_LANGUAGE,value:d});case 6:return n.next=8,i({chatId:t._id,property:Z.SHOW_ORIGINAL_MESSAGES,value:h});case 8:return n.next=10,c();case 10:L.Z.emit("chatSettingChanged",t),(0,M.Am)((0,a.jsx)(T.Z,{text:e.chats.settings.settingsSuccessfullyChanged}));case 12:case"end":return n.stop()}}),n)})),function(){var e=this,t=arguments;return new Promise((function(a,r){var i=n.apply(e,t);function s(e){D(i,a,r,s,c,"next",e)}function c(e){D(i,a,r,s,c,"throw",e)}s(void 0)}))});return function(){return r.apply(this,arguments)}}(),N=!!d&&(null===t||void 0===t?void 0:t.me.sendLanguage)!==d,C=(null===t||void 0===t?void 0:t.me.showOriginalMessages)!==h,S=N||C,k=(null===t||void 0===t?void 0:t.friend.sendLanguage)||e.chats.settings.languageNotSelected;return v?(0,a.jsxs)("div",{className:"p-4",children:[(0,a.jsx)("div",{className:"flex items-center justify-center h-8 w-full mb-10 text-indigo-500",children:e.chats.chatWith("".concat(null===t||void 0===t?void 0:t.friend.firstName," ").concat(null===t||void 0===t?void 0:t.friend.lastName))}),(0,a.jsxs)("div",{className:"flex flex-row mb-6",children:[(0,a.jsxs)("div",{className:"text-gray-500 w-60",children:[e.chats.settings.myLanguage,":"]}),(w=d,y=l,(0,a.jsxs)("select",{className:"outline-0 cursor-pointer",value:w,onChange:function(e){return y(e.target.value)},"data-cy":"selectLanguageDropdown",children:[(0,a.jsx)("option",{className:"hidden",children:e.chats.selectLanguage}),P.map((function(e){return(0,a.jsx)("option",{value:e.code,children:e.name},e.code)}))]}))]}),(0,a.jsxs)("div",{className:"flex flex-row mb-6",children:[(0,a.jsxs)("div",{className:"text-gray-500 w-60",children:[e.chats.settings.friendsLanguage,":"]}),(0,a.jsx)("div",{className:"pl-1",children:k})]}),(0,a.jsxs)("div",{className:"flex flex-row items-center",children:[(0,a.jsxs)("div",{className:"text-gray-500 w-60",children:[e.chats.settings.showOriginalMessages,":"]}),(0,a.jsx)(R,{isChecked:h,onChange:function(){return m((function(e){return!e}))}})]}),(0,a.jsx)("div",{className:"flex items-center justify-center mt-12",children:(0,a.jsx)("div",{className:"\n          px-6 py-2 rounded-xl text-white \n          ".concat(S?"bg-teal-400 cursor-pointer":"bg-gray-300 cursor-default"),onClick:function(){return S&&j()},"data-cy":"applySettingsButton",children:"Apply"})})]}):(0,a.jsx)("div",{className:"w-[430.5px] h-[312px] bg-white"})},G=n(10080),V=function(){return"undefined"!==typeof document&&document.hasFocus()},q=function(){var e=(0,s.useState)(V),t=e[0],n=e[1];return(0,s.useEffect)((function(){n(V());var e=function(){return n(!0)},t=function(){return n(!1)},a=function(){var e="visible"===document.visibilityState;n(e)};return window.addEventListener("focus",e),window.addEventListener("blur",t),window.addEventListener("visibilitychange",a),function(){window.removeEventListener("focus",e),window.removeEventListener("blur",t),window.addEventListener("visibilitychange",a)}}),[]),t};function Q(e,t,n,a,r,i,s){try{var c=e[i](s),o=c.value}catch(u){return void n(u)}c.done?t(o):Promise.resolve(o).then(a,r)}function H(e){return function(){var t=this,n=arguments;return new Promise((function(a,r){var i=e.apply(t,n);function s(e){Q(i,a,r,s,c,"next",e)}function c(e){Q(i,a,r,s,c,"throw",e)}s(void 0)}))}}var z=function(e){var t=e.invalidateChats,n=(0,d.T)().isDark,c=(0,k.useQueryClient)(),o=x().selectedChat,l=o?o._id:"",f=(0,i.xq)(),h=(0,u.b)().t,m=q(),g=(0,s.useState)(1),v=g[0],p=g[1],w=(0,s.useState)(!1),y=w[0],N=w[1],C=(0,s.useState)(!1),M=C[0],E=C[1],I=(0,s.useState)(!1),O=I[0],Z=I[1],P=(0,r.mA)(l,100),T=P.data,R=P.fetchNextPage,D=P.isLoading,V=(0,s.useRef)(),Q=(0,r.dr)().mutateAsync;(0,s.useEffect)((function(){if(Z(!1),o&&f)return L.Z.on(G.C.friendStartedTyping,Y),L.Z.on(G.C.friendStoppedTyping,B),X(!0),o.me.sendLanguage||E(!0),function(){J(),L.Z.off(G.C.friendStartedTyping,Y),L.Z.off(G.C.friendStoppedTyping,B)}}),[l]),(0,s.useEffect)((function(){return L.Z.on(G.C.loadMessage,z),function(){L.Z.off(G.C.loadMessage,z)}}),[l,m]),(0,s.useEffect)((function(){V.current=T,U()}),[T]),(0,s.useEffect)((function(){m&&document.title.includes("(".concat(h.messages.new,")"))&&(document.title=h.general.title)}),[m]);var z=function(){var e=H(b().mark((function e(n){return b().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(m||(document.title="".concat(h.general.title," (").concat(h.messages.new,")")),n.chatId!==l){e.next=5;break}return K(),e.next=5,X();case 5:t();case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Y=function(e){e.chatId===(null===o||void 0===o?void 0:o._id)&&Z(!0)},B=function(e){e.chatId===(null===o||void 0===o?void 0:o._id)&&Z(!1)},J=function(){p(1),c.removeQueries(["messages",l])},U=function(){var e=null===T||void 0===T?void 0:T.pages;e&&e[e.length-1].length<100?N(!0):y&&N(!1)},W=function(){var e=H(b().mark((function e(){return b().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,R({pageParam:v});case 2:p(v+1);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),K=function(){var e=H(b().mark((function e(){return b().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c.setQueryData(["messages",l],(function(){var e;return{pages:[null===(e=V.current)||void 0===e?void 0:e.pages[0]],pageParams:[void 0]}})),e.next=3,c.refetchQueries(["messages",l]);case 3:p(1);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),X=function(){var e=H(b().mark((function e(){var n,a,r,i=arguments;return b().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=i.length>0&&void 0!==i[0]&&i[0],f&&o){e.next=3;break}return e.abrupt("return");case 3:return a=f._id,r=o._id,e.next=7,Q({userId:a,chatId:r});case 7:if(!n){e.next=10;break}return e.next=10,t();case 10:L.Z.emit("friendVisitedChat",{userId:a,chatId:r});case 11:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),$=!D&&o;return o?(0,a.jsxs)("div",{className:"flex flex-1 flex-col h-full ".concat(n?"bg-gray-700":"bg-gray-50"," overflow-auto"),children:[(0,a.jsx)(A.Z,{isOpen:M,onClose:function(){E(!1)},children:(0,a.jsx)(F,{})}),$&&(null===T||void 0===T?void 0:T.pages)?(0,a.jsx)(S,{messagesPages:T.pages,friendLastVisit:o.friend.lastVisit,fetchOlderMessages:W,isLastPageReached:y,showOriginalMessages:o.me.showOriginalMessages}):(0,a.jsx)("div",{className:"flex flex-col-reverse h-full w-full overflow-y-scroll"}),O&&(0,a.jsx)("div",{className:"m-2 ml-4 text-gray-400 italic",children:h.chats.friendTyping}),(0,a.jsxs)("div",{className:"flex flex-row",children:[(0,a.jsx)(_,{fetchNewestMessages:K}),(0,a.jsx)("div",{className:"m-4 mt-2 cursor-pointer",onClick:function(){E(!0)},"data-cy":"settingsIcon",children:(0,a.jsx)(j.a9L,{height:"24px",width:"24px",color:n?"#ccc":"#6366f1"})})]})]}):(0,a.jsx)("div",{className:"flex items-center justify-center w-full text-gray-400 ".concat(n?"bg-gray-700":"bg-gray-50"),children:h.chats.chatWillAppear})},Y=n(10234),B=n(34840),J=n(72364),U=function(){var e=(0,i.xq)(),t=(0,u.b)().t,n=q(),c=(0,r.GX)(),o=c.data,d=void 0===o?[]:o,l=c.isLoading,f=c.invalidateChats;(0,s.useEffect)((function(){L.Z.on(G.C.connect,(function(){e&&L.Z.emit("createUserSession",{userId:e._id,socketId:L.Z.id})}))}),[e]),(0,s.useEffect)((function(){return(0,Y.c)(),L.Z.on(G.C.loadChatSettings,f),L.Z.on(G.C.updateFriendVisitData,f),L.Z.on(G.C.newFriendRequest,m),function(){L.Z.off(G.C.loadChatSettings,f),L.Z.off(G.C.updateFriendVisitData,f),L.Z.off(G.C.newFriendRequest,m)}}),[]),(0,s.useEffect)((function(){return h(),(0,Y.c)(),L.Z.on(G.C.newFriendRequest,m),function(){L.Z.off(G.C.newFriendRequest,m)}}),[n]);var h=function(){B.S({dsn:"https://669c4997b53640bf872df8d2746db81c@o4504026921566208.ingest.sentry.io/4504026924056576",integrations:[new J.gE],tracesSampleRate:1})},m=function(){n||(document.title="".concat(t.general.title," (").concat(t.friends.newFriendRequest,")"))};return(0,a.jsx)("div",{className:"h-screen","data-cy":"homeScreen",children:(0,a.jsx)(p,{children:(0,a.jsxs)("div",{className:"flex flex-row h-[92%]",children:[(0,a.jsx)(w,{chats:d,isLoadingChats:l}),(0,a.jsx)(z,{invalidateChats:f})]})})})}},54897:function(e,t,n){"use strict";n.d(t,{v3:function(){return o},Nv:function(){return l}});var a=n(34051),r=n.n(a),i=n(9669),s=n.n(i);function c(e,t,n,a,r,i,s){try{var c=e[i](s),o=c.value}catch(u){return void n(u)}c.done?t(o):Promise.resolve(o).then(a,r)}var o="http://46.101.119.178:5000",u={baseURL:o||"",responseType:"json"},d=function(e,t){Object.keys(t).forEach((function(n){e.defaults.headers[n]=t[n]}))},l=function(){var e,t=(e=r().mark((function e(t){var n;return r().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t;case 2:return n=e.sent.data,e.abrupt("return",n);case 4:case"end":return e.stop()}}),e)})),function(){var t=this,n=arguments;return new Promise((function(a,r){var i=e.apply(t,n);function s(e){c(i,a,r,s,o,"next",e)}function o(e){c(i,a,r,s,o,"throw",e)}s(void 0)}))});return function(e){return t.apply(this,arguments)}}();t.ZP=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:u,t=s().create(e),n=localStorage.getItem("user"),a=n?JSON.parse(n).token:null,r={accept:"application/json",authorization:""};return a&&(r.authorization=a),d(t,r),t}()},41809:function(e,t,n){"use strict";var a=n(86809),r=n.n(a),i=n(54897),s=r()(i.v3,{transports:["websocket"]});t.Z=s},10080:function(e,t,n){"use strict";var a;n.d(t,{C:function(){return a}}),function(e){e.connect="connect",e.loadChatSettings="loadChatSettings",e.updateFriendVisitData="updateFriendVisitData",e.loadMessage="loadMessage",e.friendStartedTyping="friendStartedTyping",e.friendStoppedTyping="friendStoppedTyping",e.newFriendRequest="newFriendRequest"}(a||(a={}))},10234:function(e,t,n){"use strict";n.d(t,{c:function(){return r}});var a=n(40782),r=(n(40993),function(){a.Am.configure({autoClose:2e3,hideProgressBar:!0,closeOnClick:!0,closeButton:!1})})},77020:function(){}},function(e){e.O(0,[885,669,393,235,774,888,179],(function(){return t=45301,e(e.s=t);var t}));var t=e.O();_N_E=t}]);