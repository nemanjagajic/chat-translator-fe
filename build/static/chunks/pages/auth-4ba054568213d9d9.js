(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[473],{28597:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/auth",function(){return n(93051)}])},93051:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return w}});var r=n(34051),a=n.n(r),s=n(85893),o=n(67294),i=n(54897),u="/api/auth/login",c="/api/auth/register",l=function(e){var t=e.email,n=e.password;return i.ZP.post(u,{email:t,password:n})},p=function(e){var t=e.email,n=e.password,r=e.firstName,a=e.lastName;return i.ZP.post(c,{email:t,password:n,firstName:r,lastName:a})},d=n(22632),f=n(11163);function m(e,t,n,r,a,s,o){try{var i=e[s](o),u=i.value}catch(c){return void n(c)}i.done?t(u):Promise.resolve(u).then(r,a)}function h(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var s=e.apply(t,n);function o(e){m(s,r,a,o,i,"next",e)}function i(e){m(s,r,a,o,i,"throw",e)}o(void 0)}))}}function v(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var x={email:"",password:"",firstName:"",lastName:""},w=function(){var e=(0,f.useRouter)(),t=(0,d.b)().t,n=(0,o.useState)(x),r=n[0],i=n[1],u=(0,o.useState)(""),c=u[0],m=u[1],w=(0,o.useState)(!0),y=w[0],b=w[1],g=function(e){var t=e.currentTarget,n=t.name,a=t.value;i(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){v(e,t,n[t])}))}return e}({},r,v({},n,a)))},N=function(){var e=h(a().mark((function e(t){var n,s;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,p(r);case 4:k(),e.next=11;break;case 7:e.prev=7,e.t0=e.catch(1),m((null===e.t0||void 0===e.t0||null===(n=e.t0.response)||void 0===n||null===(s=n.data)||void 0===s?void 0:s.message)||"");case 11:case"end":return e.stop()}}),e,null,[[1,7]])})));return function(t){return e.apply(this,arguments)}}(),j=function(){var e=h(a().mark((function e(t){return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),k();case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),k=function(){var t=h(a().mark((function t(){var n,s,o;return a().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,l({email:r.email,password:r.password});case 3:return n=t.sent.data,localStorage.setItem("user",JSON.stringify(n)),t.next=7,e.replace("/");case 7:return t.next=9,e.reload();case 9:t.next=15;break;case 11:t.prev=11,t.t0=t.catch(0),m((null===t.t0||void 0===t.t0||null===(s=t.t0.response)||void 0===s||null===(o=s.data)||void 0===o?void 0:o.message)||"");case 15:case"end":return t.stop()}}),t,null,[[0,11]])})));return function(){return t.apply(this,arguments)}}();return(0,s.jsxs)("div",{className:"flex flex-col h-full justify-center items-center bg-indigo-600","data-cy":"authScreen",children:[(0,s.jsx)("h1",{className:"text-white text-8xl mb-4 text-center",children:t.auth.pageTitle}),(0,s.jsx)("h2",{className:"text-indigo-200 text-3xl mb-20 text-center",children:t.auth.pageDescription}),(0,s.jsxs)("div",{className:"w-[500px] h-[380px]",children:[(0,s.jsxs)("div",{className:"flex flex-row justify-around items-center mb-6",children:[(0,s.jsx)("div",{className:"flex justify-center items-center border-b ".concat(y?"border-indigo-400":"border-indigo-700"," text-white \n            px-4 py-3 flex-1 cursor-pointer mr-4"),onClick:function(){return b(!0)},children:t.auth.login}),(0,s.jsx)("div",{className:"flex justify-center items-center border-b ".concat(y?"border-indigo-700":"border-indigo-400"," text-white \n            px-4 py-3 flex-1 cursor-pointer ml-4"),onClick:function(){return b(!1)},children:t.auth.register})]}),(0,s.jsxs)("form",{className:"flex flex-col justify-center items-center",children:[(0,s.jsx)("input",{className:"focus:outline-none py-3 px-4 m-2 rounded-3xl w-full",type:"email",onChange:g,name:"email",placeholder:t.auth.placeholders.usernameOrEmail,value:r.email,"data-cy":"emailInput"}),(0,s.jsx)("input",{className:"focus:outline-none py-3 px-4 m-2 rounded-3xl w-full",onChange:g,name:"password",placeholder:t.auth.placeholders.password,type:"password",value:r.password,"data-cy":"passwordInput"}),!y&&(0,s.jsxs)("div",{className:"flex flex-row w-full",children:[(0,s.jsx)("input",{className:"focus:outline-none py-3 px-4 mr-2 mt-2 rounded-3xl flex-1",type:"text",onChange:g,name:"firstName",placeholder:t.auth.placeholders.firstName,value:r.firstName}),(0,s.jsx)("input",{className:"focus:outline-none py-3 px-4 ml-2 mt-2 rounded-3xl flex-1",type:"text",onChange:g,name:"lastName",placeholder:t.auth.placeholders.lastName,value:r.lastName})]}),(0,s.jsx)("input",{className:"bg-teal-400 w-[50%] h-12 mt-6 rounded-3xl font-bold text-white tracking-wide cursor-pointer",type:"submit",value:y?t.auth.buttons.logIn:t.auth.buttons.register,onClick:y?j:N,onSubmit:y?j:N,"data-cy":"submitButton"}),(0,s.jsx)("div",{className:"mt-4 text-red-400 h-6",children:(0,s.jsx)("div",{"data-testid":"error-message",children:c})})]})]})]})}},54897:function(e,t,n){"use strict";n.d(t,{v3:function(){return u},Nv:function(){return p}});var r=n(34051),a=n.n(r),s=n(9669),o=n.n(s);function i(e,t,n,r,a,s,o){try{var i=e[s](o),u=i.value}catch(c){return void n(c)}i.done?t(u):Promise.resolve(u).then(r,a)}var u="http://46.101.119.178:5000",c={baseURL:u||"",responseType:"json"},l=function(e,t){Object.keys(t).forEach((function(n){e.defaults.headers[n]=t[n]}))},p=function(){var e,t=(e=a().mark((function e(t){var n;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t;case 2:return n=e.sent.data,e.abrupt("return",n);case 4:case"end":return e.stop()}}),e)})),function(){var t=this,n=arguments;return new Promise((function(r,a){var s=e.apply(t,n);function o(e){i(s,r,a,o,u,"next",e)}function u(e){i(s,r,a,o,u,"throw",e)}o(void 0)}))});return function(e){return t.apply(this,arguments)}}();t.ZP=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:c,t=o().create(e),n=localStorage.getItem("user"),r=n?JSON.parse(n).token:null,a={accept:"application/json",authorization:""};return r&&(a.authorization=r),l(t,a),t}()}},function(e){e.O(0,[669,774,888,179],(function(){return t=28597,e(e.s=t);var t}));var t=e.O();_N_E=t}]);