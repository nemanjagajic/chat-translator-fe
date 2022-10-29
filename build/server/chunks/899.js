exports.id = 899;
exports.ids = [899];
exports.modules = {

/***/ 949:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const Modal = ({ children , isOpen , onClose  })=>{
    const wrapperRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const handleClickOutside = (event)=>{
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            onClose();
        }
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        document.addEventListener('click', handleClickOutside, true);
        return ()=>{
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);
    if (!isOpen) return null;
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "fixed top-0 left-0 w-full h-full bg-black/30 z-[10]",
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            ref: wrapperRef,
            className: "fixed bg-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-4 rounded-2xl",
            children: children
        })
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Modal);


/***/ }),

/***/ 11:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_ionicons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(907);
/* harmony import */ var react_ionicons__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_ionicons__WEBPACK_IMPORTED_MODULE_2__);



const ToastSuccess = ({ text  })=>{
    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex flex-row justify-center items-center",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "w-5 h-5 flex justify-center items-center rounded-full bg-teal-400 mr-2",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_ionicons__WEBPACK_IMPORTED_MODULE_2__.Checkmark, {
                    height: "15px",
                    width: "15px",
                    color: "white"
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "text-gray-400",
                children: text
            })
        ]
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ToastSuccess);


/***/ }),

/***/ 529:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "l$": () => (/* binding */ useCreateChat),
  "GX": () => (/* binding */ useFetchAllChats),
  "mA": () => (/* binding */ useFetchMessages),
  "$3": () => (/* binding */ useSendMessage),
  "dr": () => (/* binding */ useSetChatVisited),
  "jR": () => (/* binding */ useSetSettingsProperty)
});

// EXTERNAL MODULE: external "react-query"
var external_react_query_ = __webpack_require__(175);
// EXTERNAL MODULE: ./services/request.ts
var request = __webpack_require__(897);
;// CONCATENATED MODULE: ./services/api/chats.ts

const API_ENDPOINTS = {
    CHATS: '/api/chats',
    MESSAGES: '/api/messages',
    SET_SETTINGS_PROPERTY: 'api/chats/setSettingsProperty',
    SET_CHAT_VISITED: 'api/chats/setChatVisited',
    CREATE_CHAT: '/api/chats/create'
};
const getAllChats = async (showRemovedFriends)=>(0,request/* apiRequest */.Nv)(request/* default.get */.ZP.get(`${API_ENDPOINTS.CHATS}?showRemovedFriends=${showRemovedFriends}`))
;
const getMessages = async (chatId, offset, limit)=>(0,request/* apiRequest */.Nv)(request/* default.get */.ZP.get(`${API_ENDPOINTS.MESSAGES}?chatId=${chatId}&offset=${offset}&limit=${limit}`))
;
const sendMessage = async (chatId, text)=>(0,request/* apiRequest */.Nv)(request/* default.post */.ZP.post(API_ENDPOINTS.MESSAGES, {
        chatId,
        text
    }))
;
const setSettingProperty = async (chatId, property, value)=>(0,request/* apiRequest */.Nv)(request/* default.post */.ZP.post(API_ENDPOINTS.SET_SETTINGS_PROPERTY, {
        chatId,
        property,
        value
    }))
;
const setChatVisited = async (userId, chatId)=>(0,request/* apiRequest */.Nv)(request/* default.post */.ZP.post(API_ENDPOINTS.SET_CHAT_VISITED, {
        userId,
        chatId
    }))
;
const createChat = async (userId)=>(0,request/* apiRequest */.Nv)(request/* default.post */.ZP.post(API_ENDPOINTS.CREATE_CHAT, {
        userId
    }))
;

// EXTERNAL MODULE: ./sockets/index.ts
var sockets = __webpack_require__(809);
// EXTERNAL MODULE: ./hooks/auth.ts
var auth = __webpack_require__(187);
;// CONCATENATED MODULE: ./hooks/chats.ts




const useFetchAllChats = (showRemovedFriends = false)=>{
    const queryClient = (0,external_react_query_.useQueryClient)();
    const loggedUser = (0,auth/* useLoggedUser */.xq)();
    const invalidateChats = ()=>queryClient.invalidateQueries('chats')
    ;
    const { data , isLoading , error  } = (0,external_react_query_.useQuery)('chats', ()=>getAllChats(showRemovedFriends)
    , {
        enabled: !!loggedUser
    });
    return {
        data,
        isLoading,
        error,
        invalidateChats
    };
};
const useFetchMessages = (chatId, limit)=>{
    const { data , fetchNextPage , isLoading , error  } = (0,external_react_query_.useInfiniteQuery)([
        'messages',
        chatId
    ], ({ pageParam =0  })=>getMessages(chatId, pageParam, limit)
    , {
        enabled: !!chatId
    });
    return {
        data,
        fetchNextPage,
        isLoading,
        error
    };
};
const useSendMessage = (onSuccess, onError)=>{
    const queryClient = (0,external_react_query_.useQueryClient)();
    const user = (0,auth/* useLoggedUser */.xq)();
    const { mutate , isLoading , error  } = (0,external_react_query_.useMutation)(({ chatId , text  })=>sendMessage(chatId, text)
    , {
        onSuccess: ({ message  })=>{
            sockets/* default.emit */.Z.emit('chatMessageSent', message);
            onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess();
            queryClient.invalidateQueries('chats');
        },
        onError: ()=>{
            onError === null || onError === void 0 ? void 0 : onError({
                user
            });
        }
    });
    return {
        mutate,
        isLoading,
        error
    };
};
const useSetSettingsProperty = ()=>{
    const queryClient = (0,external_react_query_.useQueryClient)();
    const invalidateChats = ()=>queryClient.invalidateQueries('chats')
    ;
    const { mutate , mutateAsync , isLoading , error  } = (0,external_react_query_.useMutation)(({ chatId , property , value  })=>setSettingProperty(chatId, property, value)
    );
    return {
        mutate,
        mutateAsync,
        isLoading,
        error,
        invalidateChats
    };
};
const useSetChatVisited = ()=>{
    const { mutate , mutateAsync , isLoading , error  } = (0,external_react_query_.useMutation)(({ userId , chatId  })=>setChatVisited(userId, chatId)
    );
    return {
        mutate,
        mutateAsync,
        isLoading,
        error
    };
};
const useCreateChat = ()=>{
    const { mutate , mutateAsync , isLoading , error  } = (0,external_react_query_.useMutation)(({ userId  })=>createChat(userId)
    );
    return {
        mutate,
        mutateAsync,
        isLoading,
        error
    };
};


/***/ }),

/***/ 897:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "v3": () => (/* binding */ BASE_API_ENDPOINT),
/* harmony export */   "Nv": () => (/* binding */ apiRequest),
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export attachHeaders */
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(167);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

const BASE_API_ENDPOINT = "http://localhost:8000" || 0;
const IS_SERVER = "undefined" === 'undefined';
const defaultConfig = {
    baseURL: BASE_API_ENDPOINT || '',
    responseType: 'json'
};
const attachHeaders = (instance, headers)=>{
    Object.keys(headers).forEach((key)=>{
        // @ts-ignore
        instance.defaults.headers[key] = headers[key];
    });
};
const request = (config = defaultConfig)=>{
    const instance = axios__WEBPACK_IMPORTED_MODULE_0___default().create(config);
    const user = !IS_SERVER && localStorage.getItem('user');
    const token = user ? JSON.parse(user).token : null;
    const headers = {
        accept: 'application/json',
        authorization: ''
    };
    if (token) headers.authorization = token;
    attachHeaders(instance, headers);
    return instance;
};
const apiRequest = async (request1)=>{
    const { data  } = await request1;
    return data;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request());


/***/ }),

/***/ 809:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(87);
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services_request__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(897);
// @ts-ignore


const socket = socket_io_client__WEBPACK_IMPORTED_MODULE_0___default()(_services_request__WEBPACK_IMPORTED_MODULE_1__/* .BASE_API_ENDPOINT */ .v3, {
    transports: [
        'websocket'
    ]
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (socket);


/***/ }),

/***/ 80:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "C": () => (/* binding */ SocketEvents)
/* harmony export */ });
var SocketEvents;
(function(SocketEvents) {
    SocketEvents["connect"] = "connect";
    SocketEvents["loadChatSettings"] = "loadChatSettings";
    SocketEvents["updateFriendVisitData"] = "updateFriendVisitData";
    SocketEvents["loadMessage"] = "loadMessage";
    SocketEvents["friendStartedTyping"] = "friendStartedTyping";
    SocketEvents["friendStoppedTyping"] = "friendStoppedTyping";
    SocketEvents["newFriendRequest"] = "newFriendRequest";
})(SocketEvents || (SocketEvents = {}));


/***/ }),

/***/ 234:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "c": () => (/* binding */ configureToast)
/* harmony export */ });
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(449);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(819);
/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_1__);


const configureToast = ()=>{
    const toastConfig = {
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        closeButton: false
    };
    react_toastify__WEBPACK_IMPORTED_MODULE_0__.toast.configure(toastConfig);
};


/***/ }),

/***/ 819:
/***/ (() => {



/***/ })

};
;