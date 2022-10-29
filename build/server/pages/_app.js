"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 150:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react-query"
var external_react_query_ = __webpack_require__(175);
// EXTERNAL MODULE: ./hooks/auth.ts
var auth = __webpack_require__(187);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(689);
// EXTERNAL MODULE: ./hooks/i18n.ts + 1 modules
var i18n = __webpack_require__(632);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(853);
// EXTERNAL MODULE: ./providers/ThemeProvider.tsx
var ThemeProvider = __webpack_require__(740);
;// CONCATENATED MODULE: external "react-dark-mode-toggle"
const external_react_dark_mode_toggle_namespaceObject = require("react-dark-mode-toggle");
var external_react_dark_mode_toggle_default = /*#__PURE__*/__webpack_require__.n(external_react_dark_mode_toggle_namespaceObject);
;// CONCATENATED MODULE: ./components/navbar/Navbar.tsx







const CHATS_ROUTE = '/';
const FRIENDS_ROUTE = '/friends';
const Navbar = ()=>{
    const { isDark , setIsDark  } = (0,ThemeProvider/* useThemeContext */.T)();
    const loggedUser = (0,auth/* useLoggedUser */.xq)();
    const { t  } = (0,i18n/* useLocale */.b)();
    const { logOut  } = (0,auth/* useLogOut */.M6)();
    const router = (0,router_.useRouter)();
    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: `flex flex-row items-center justify-between h-[8%] px-4 
      ${isDark ? 'bg-gray-600 border-gray-600' : 'bg-gray-100'} border-b drop-shadow-sm`,
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "flex flex-row",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: `ml-3 mr-6 cursor-pointer ${isDark ? 'text-gray-100' : 'text-gray-800 '}
          ${router.pathname === CHATS_ROUTE && `${isDark ? 'text-indigo-300' : 'text-indigo-500'}`}`,
                        onClick: ()=>router.push(CHATS_ROUTE)
                        ,
                        children: t.navbar.chats
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: `cursor-pointer ${isDark ? 'text-gray-100' : 'text-gray-800 '}
          ${router.pathname === FRIENDS_ROUTE && `${isDark ? 'text-indigo-300' : 'text-indigo-500'}`}`,
                        onClick: ()=>router.push(`${FRIENDS_ROUTE}?myFriends`)
                        ,
                        "data-cy": "navbarFriends",
                        children: t.navbar.friends
                    })
                ]
            }),
            loggedUser && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "flex flex-row items-center justify-between",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx((external_react_dark_mode_toggle_default()), {
                        onChange: ()=>setIsDark(!isDark)
                        ,
                        checked: isDark,
                        size: 50
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: `p-2 mr-4 ml-4 cursor-pointer ${isDark ? 'text-gray-100' : 'text-gray-800 '}`,
                        onClick: logOut,
                        "data-cy": "logOutButton",
                        children: t.auth.buttons.logOut
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "flex items-center justify-center mr-3 cursor-default text-gray-800 bg-gray-300 px-4 py-2 rounded-2xl",
                        children: loggedUser === null || loggedUser === void 0 ? void 0 : loggedUser.firstName
                    })
                ]
            })
        ]
    }));
};
/* harmony default export */ const navbar_Navbar = (Navbar);

;// CONCATENATED MODULE: external "next/head"
const head_namespaceObject = require("next/head");
var head_default = /*#__PURE__*/__webpack_require__.n(head_namespaceObject);
// EXTERNAL MODULE: external "react-toastify"
var external_react_toastify_ = __webpack_require__(449);
// EXTERNAL MODULE: ./components/shared/ToastError.tsx
var ToastError = __webpack_require__(926);
// EXTERNAL MODULE: external "@sentry/react"
var react_ = __webpack_require__(427);
;// CONCATENATED MODULE: ./pages/_app.tsx













const queryClient = new external_react_query_.QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    },
    queryCache: new external_react_query_.QueryCache({
        onError: ()=>{
            (0,external_react_toastify_.toast)(/*#__PURE__*/ jsx_runtime_.jsx(ToastError/* default */.Z, {
                text: 'Failed to fetch data'
            }));
            react_.captureException(new Error('Failed to fetch data'));
        }
    })
});
function MyApp({ Component , pageProps  }) {
    (0,auth/* useAuthRedirection */.eE)();
    const router = (0,router_.useRouter)();
    const { t  } = (0,i18n/* useLocale */.b)();
    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx((head_default()), {
                children: /*#__PURE__*/ jsx_runtime_.jsx("title", {
                    children: t.general.title
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(external_react_query_.QueryClientProvider, {
                client: queryClient,
                children: /*#__PURE__*/ jsx_runtime_.jsx(ThemeProvider/* default */.Z, {
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "h-screen overflow-hidden",
                        children: [
                            router.pathname !== '/auth' && /*#__PURE__*/ jsx_runtime_.jsx(navbar_Navbar, {}),
                            /*#__PURE__*/ jsx_runtime_.jsx(Component, {
                                ...pageProps
                            })
                        ]
                    })
                })
            })
        ]
    }));
}
/* harmony default export */ const _app = (MyApp);


/***/ }),

/***/ 427:
/***/ ((module) => {

module.exports = require("@sentry/react");

/***/ }),

/***/ 853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 907:
/***/ ((module) => {

module.exports = require("react-ionicons");

/***/ }),

/***/ 175:
/***/ ((module) => {

module.exports = require("react-query");

/***/ }),

/***/ 449:
/***/ ((module) => {

module.exports = require("react-toastify");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [632,644], () => (__webpack_exec__(150)));
module.exports = __webpack_exports__;

})();