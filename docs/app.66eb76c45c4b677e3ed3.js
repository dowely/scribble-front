/*! For license information please see app.66eb76c45c4b677e3ed3.js.LICENSE.txt */
(()=>{var e,t={6572:(e,t,r)=>{var n={"./arrow-left-regular.svg":7018,"./clock-regular.svg":894,"./comment-regular.svg":2678,"./door-open-solid.svg":6413,"./ellipsis-vertical-solid.svg":9173,"./envelope-regular.svg":1265,"./gear-solid.svg":6029,"./magnifying-glass-solid.svg":4525,"./user-group-solid.svg":7317};function o(e){var t=i(e);return r(t)}function i(e){if(!r.o(n,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n[e]}o.keys=function(){return Object.keys(n)},o.resolve=i,e.exports=o,o.id=6572},450:(e,t,r)=>{"use strict";var n=r(3493),o=r.n(n),i=.01*innerHeight;document.documentElement.style.setProperty("--vh","".concat(i,"px")),addEventListener("resize",o()((function(){i=.01*innerHeight,document.documentElement.style.setProperty("--vh","".concat(i,"px"))}),200));var a=r(6526),s=r(2062);function c(e){return c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},c(e)}function u(e){return function(e){if(Array.isArray(e))return l(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return l(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?l(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function f(){f=function(){return e};var e={},t=Object.prototype,r=t.hasOwnProperty,n="function"==typeof Symbol?Symbol:{},o=n.iterator||"@@iterator",i=n.asyncIterator||"@@asyncIterator",a=n.toStringTag||"@@toStringTag";function s(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{s({},"")}catch(e){s=function(e,t,r){return e[t]=r}}function u(e,t,r,n){var o=t&&t.prototype instanceof d?t:d,i=Object.create(o.prototype),a=new S(n||[]);return i._invoke=function(e,t,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return{value:void 0,done:!0}}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var s=x(a,r);if(s){if(s===h)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var c=l(e,t,r);if("normal"===c.type){if(n=r.done?"completed":"suspendedYield",c.arg===h)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n="completed",r.method="throw",r.arg=c.arg)}}}(e,r,a),i}function l(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(e){return{type:"throw",arg:e}}}e.wrap=u;var h={};function d(){}function m(){}function p(){}var v={};s(v,o,(function(){return this}));var g=Object.getPrototypeOf,y=g&&g(g(E([])));y&&y!==t&&r.call(y,o)&&(v=y);var w=p.prototype=d.prototype=Object.create(v);function b(e){["next","throw","return"].forEach((function(t){s(e,t,(function(e){return this._invoke(t,e)}))}))}function C(e,t){function n(o,i,a,s){var u=l(e[o],e,i);if("throw"!==u.type){var f=u.arg,h=f.value;return h&&"object"==c(h)&&r.call(h,"__await")?t.resolve(h.__await).then((function(e){n("next",e,a,s)}),(function(e){n("throw",e,a,s)})):t.resolve(h).then((function(e){f.value=e,a(f)}),(function(e){return n("throw",e,a,s)}))}s(u.arg)}var o;this._invoke=function(e,r){function i(){return new t((function(t,o){n(e,r,t,o)}))}return o=o?o.then(i,i):i()}}function x(e,t){var r=e.iterator[t.method];if(void 0===r){if(t.delegate=null,"throw"===t.method){if(e.iterator.return&&(t.method="return",t.arg=void 0,x(e,t),"throw"===t.method))return h;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return h}var n=l(r,e.iterator,t.arg);if("throw"===n.type)return t.method="throw",t.arg=n.arg,t.delegate=null,h;var o=n.arg;return o?o.done?(t[e.resultName]=o.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,h):o:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,h)}function _(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function L(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function S(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(_,this),this.reset(!0)}function E(e){if(e){var t=e[o];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var n=-1,i=function t(){for(;++n<e.length;)if(r.call(e,n))return t.value=e[n],t.done=!1,t;return t.value=void 0,t.done=!0,t};return i.next=i}}return{next:k}}function k(){return{value:void 0,done:!0}}return m.prototype=p,s(w,"constructor",p),s(p,"constructor",m),m.displayName=s(p,a,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===m||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,p):(e.__proto__=p,s(e,a,"GeneratorFunction")),e.prototype=Object.create(w),e},e.awrap=function(e){return{__await:e}},b(C.prototype),s(C.prototype,i,(function(){return this})),e.AsyncIterator=C,e.async=function(t,r,n,o,i){void 0===i&&(i=Promise);var a=new C(u(t,r,n,o),i);return e.isGeneratorFunction(r)?a:a.next().then((function(e){return e.done?e.value:a.next()}))},b(w),s(w,a,"Generator"),s(w,o,(function(){return this})),s(w,"toString",(function(){return"[object Generator]"})),e.keys=function(e){var t=[];for(var r in e)t.push(r);return t.reverse(),function r(){for(;t.length;){var n=t.pop();if(n in e)return r.value=n,r.done=!1,r}return r.done=!0,r}},e.values=E,S.prototype={constructor:S,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(L),!e)for(var t in this)"t"===t.charAt(0)&&r.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function n(r,n){return a.type="throw",a.arg=e,t.next=r,n&&(t.method="next",t.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var s=r.call(i,"catchLoc"),c=r.call(i,"finallyLoc");if(s&&c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(s){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(e,t){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===e||"continue"===e)&&i.tryLoc<=t&&t<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=e,a.arg=t,i?(this.method="next",this.next=i.finallyLoc,h):this.complete(a)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),h},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),L(r),h}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var o=n.arg;L(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,r){return this.delegate={iterator:E(e),resultName:t,nextLoc:r},"next"===this.method&&(this.arg=void 0),h}},e}function h(e,t,r,n,o,i,a){try{var s=e[i](a),c=s.value}catch(e){return void r(e)}s.done?t(c):Promise.resolve(c).then(n,o)}function d(e){return function(){var t=this,r=arguments;return new Promise((function(n,o){var i=e.apply(t,r);function a(e){h(i,n,o,a,s,"next",e)}function s(e){h(i,n,o,a,s,"throw",e)}a(void 0)}))}}function m(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}const p=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.arrowToggle=document.querySelector("#back-tap-area"),this.menuContainer=document.querySelector(".layout__menu-container"),this.menu=document.querySelector(".menu"),this.user=document.querySelector(".menu__user"),this.menuItems=document.querySelectorAll(".menu__item"),this.menuLinks=document.querySelectorAll(".menu__link, .menu__icon-link"),this.notifiers=document.querySelectorAll(".menu__notifier--active"),this.photo=document.querySelector(".menu__user-photo"),this.name=document.querySelector(".menu__user-name"),this.avatar(),this.isAnimating=!1,this.events()}var t,r,n,o;return t=e,r=[{key:"avatar",value:function(){this.photo.src=a.I.image?a.I.image:s,this.photo.alt="A photo of ".concat(a.I.name)}},{key:"events",value:function(){var e=this;this.arrowToggle.addEventListener("click",this.openMenu.bind(this)),this.menuLinks.forEach((function(t){t.addEventListener("click",(function(t){if(Number(getComputedStyle(e.menu).getPropertyValue("width").slice(0,-2))>250&&(t.preventDefault(),t.stopPropagation(),!e.isAnimating)){var r=t.target.closest(".menu__item");e.closeMenu(r)}}))})),this.menuItems.forEach((function(t){t.addEventListener("click",(function(t){if(Number(getComputedStyle(e.menu).getPropertyValue("width").slice(0,-2))<250){var r=t.target.closest(".menu__item").dataset.route;location.href="organizer"===r?"/":"search"===r?"404.html":"".concat(r,".html")}}))})),a.I.on("photoUpdate",(function(){return e.avatar()})),a.I.on("textUpdate",(function(){return e.name.textContent=a.I.name?a.I.name:"John Schaffer"}))}},{key:"openMenu",value:(o=d(f().mark((function e(){return f().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.isAnimating=!0,e.next=3,this.expand();case 3:return e.next=5,this.fadeInUser();case 5:return e.next=7,this.animateLinks();case 7:return e.next=9,this.popNotifiers();case 9:this.isAnimating=!1;case 10:case"end":return e.stop()}}),e,this)}))),function(){return o.apply(this,arguments)})},{key:"closeMenu",value:(n=d(f().mark((function e(t){var r;return f().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.fadeOutLinks(t);case 2:return r=e.sent,e.next=5,this.rotate();case 5:setTimeout((function(){return location.href=r}),500);case 6:case"end":return e.stop()}}),e,this)}))),function(e){return n.apply(this,arguments)})},{key:"expand",value:function(){var e=this;return new Promise((function(t,r){e.menuContainer.classList.add("layout__menu-container--on-top"),e.menu.ontransitionend=t,e.menu.ontransitioncancel=r,e.menu.classList.add("menu--expanded")}))}},{key:"fadeInUser",value:function(){var e=this;return new Promise((function(t,r){e.user.ontransitionend=function(){setTimeout(t,100)},e.user.ontransitioncancel=r,e.user.classList.add("menu__user--visible")}))}},{key:"animateLinks",value:function(){var e=this;return new Promise((function(t,r){var n=e.menuItems[e.menuItems.length-1].querySelectorAll("a"),o=[];n.forEach((function(e){o.push(new Promise((function(t,r){e.ontransitionend=t,e.ontransitioncancel=r})))})),Promise.all(o).then(t).catch(r),e.menuItems.forEach((function(e,t){setTimeout((function(){return e.classList.add("menu__item--visible")}),50*t)}))}))}},{key:"popNotifiers",value:function(){var e=this;return new Promise((function(t,r){var n=[];e.notifiers.forEach((function(e){n.push(new Promise((function(t,r){e.ontransitionend=t,e.onanimationcancel=r})))})),Promise.all(n).then(t).catch(r),e.notifiers.forEach((function(e){e.classList.add("menu__notifier--visible")}))}))}},{key:"fadeOutLinks",value:function(e){var t=this;return new Promise((function(r,n){var o=u(t.menuItems).filter((function(t){return t!==e})),i=o.map((function(e){return u(e.querySelectorAll("a"))})).flat(),a=o.map((function(e){return e.querySelector(".menu__notifier")})).filter((function(e){return e.classList.contains("menu__notifier--active")})),s=[];i.forEach((function(e){s.push(new Promise((function(t,r){e.ontransitionend=t,e.ontransitioncancel=r})))})),a.forEach((function(e){s.push(new Promise((function(t,r){e.ontransitionend=t,e.ontransitioncancel=r})))}));var c=e.firstElementChild.getAttribute("href");Promise.all(s).then((function(){return r(c)})).catch(n),o.forEach((function(e){e.classList.remove("menu__item--visible")})),a.forEach((function(e){e.classList.remove("menu__notifier--visible")}))}))}},{key:"rotate",value:function(){var e=this;return new Promise((function(t,r){e.menu.ontransitionend=t,e.menu.ontransitioncancel=r,e.menu.classList.add("menu--rotated")}))}}],r&&m(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();var v;(v=r(6572)).keys().forEach(v),new p},6526:(e,t,r)=>{var n=r(9362),o=r(3269);new n(o);try{var i,a=localStorage.getItem("profile");if(a){var s=JSON.parse(a);i=new n(s)}else i=new n(o),localStorage.setItem("profile","{}");addEventListener("beforeunload",(function(){return c(i)})),t.I=i}catch(e){console.log("Local user model ran with ",e.message)}var c=function(e){if(localStorage.getItem("profile")){var t={};for(var r in e)t[r]=e[r];t.image=e.image,localStorage.setItem("profile",JSON.stringify(t))}}},9362:(e,t,r)=>{var n,o=r(8370),i=["January","February","March","April","May","June","July","August","September","October","November","December"],a=function(e){this.name=e.name,this.jobPosition=e.jobPosition,this.phoneNumber=e.phoneNumber,this.email=e.email,this.joined=e.joined,this.bio=e.bio,n=e.image};Object.defineProperty(a.prototype,"image",{get:function(){return n},set:function(e){n=e,this.emit("photoUpdate")}}),Object.defineProperty(a.prototype,"initials",{get:function(){return this.name&&-1!==this.name.indexOf(" ")?this.name.charAt(0).toUpperCase()+this.name.charAt(this.name.indexOf(" ")+1).toUpperCase():this.name?this.name.charAt(0).toUpperCase():void 0}}),Object.defineProperty(a.prototype,"joinedDate",{get:function(){var e=new Date(this.joined);return"".concat(i[e.getMonth()]," ").concat(e.getDate(),", ").concat(e.getFullYear())}}),o(a.prototype),e.exports=a},7018:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>c});var n=r(7854),o=r.n(n),i=r(5348),a=r.n(i),s=new(o())({id:"arrow-left-regular",use:"arrow-left-regular-usage",viewBox:"0 0 448 512",content:'<symbol aria-hidden="true" class="svg-inline--fa fa-arrow-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" id="arrow-left-regular"><path fill="currentColor" d="M447.1 256C447.1 273.7 433.7 288 416 288H109.3l105.4 105.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H416C433.7 224 447.1 238.3 447.1 256z" /></symbol>'});a().add(s);const c=s},894:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>c});var n=r(7854),o=r.n(n),i=r(5348),a=r.n(i),s=new(o())({id:"clock-regular",use:"clock-regular-usage",viewBox:"0 0 512 512",content:'<symbol aria-hidden="true" class="svg-inline--fa fa-clock" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="clock-regular"><path fill="currentColor" d="M232 120C232 106.7 242.7 96 256 96C269.3 96 280 106.7 280 120V243.2L365.3 300C376.3 307.4 379.3 322.3 371.1 333.3C364.6 344.3 349.7 347.3 338.7 339.1L242.7 275.1C236 271.5 232 264 232 255.1L232 120zM256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0zM48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48C141.1 48 48 141.1 48 256z" /></symbol>'});a().add(s);const c=s},2678:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>c});var n=r(7854),o=r.n(n),i=r(5348),a=r.n(i),s=new(o())({id:"comment-regular",use:"comment-regular-usage",viewBox:"0 0 512 512",content:'<symbol aria-hidden="true" class="svg-inline--fa fa-comment" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="comment-regular"><path fill="currentColor" d="M256 32C114.6 32 .0272 125.1 .0272 240c0 47.63 19.91 91.25 52.91 126.2c-14.88 39.5-45.87 72.88-46.37 73.25c-6.625 7-8.375 17.25-4.625 26C5.818 474.2 14.38 480 24 480c61.5 0 109.1-25.75 139.1-46.25C191.1 442.8 223.3 448 256 448c141.4 0 255.1-93.13 255.1-208S397.4 32 256 32zM256.1 400c-26.75 0-53.12-4.125-78.38-12.12l-22.75-7.125l-19.5 13.75c-14.25 10.12-33.88 21.38-57.5 29c7.375-12.12 14.37-25.75 19.88-40.25l10.62-28l-20.62-21.87C69.82 314.1 48.07 282.2 48.07 240c0-88.25 93.25-160 208-160s208 71.75 208 160S370.8 400 256.1 400z" /></symbol>'});a().add(s);const c=s},6413:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>c});var n=r(7854),o=r.n(n),i=r(5348),a=r.n(i),s=new(o())({id:"door-open-solid",use:"door-open-solid-usage",viewBox:"0 0 576 512",content:'<symbol aria-hidden="true" class="svg-inline--fa fa-door-open" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" id="door-open-solid"><path fill="currentColor" d="M560 448H512V113.5c0-27.25-21.5-49.5-48-49.5L352 64.01V128h96V512h112c8.875 0 16-7.125 16-15.1v-31.1C576 455.1 568.9 448 560 448zM280.3 1.007l-192 49.75C73.1 54.51 64 67.76 64 82.88V448H16c-8.875 0-16 7.125-16 15.1v31.1C0 504.9 7.125 512 16 512H320V33.13C320 11.63 300.5-4.243 280.3 1.007zM232 288c-13.25 0-24-14.37-24-31.1c0-17.62 10.75-31.1 24-31.1S256 238.4 256 256C256 273.6 245.3 288 232 288z" /></symbol>'});a().add(s);const c=s},9173:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>c});var n=r(7854),o=r.n(n),i=r(5348),a=r.n(i),s=new(o())({id:"ellipsis-vertical-solid",use:"ellipsis-vertical-solid-usage",viewBox:"0 0 128 512",content:'<symbol aria-hidden="true" class="svg-inline--fa fa-ellipsis-vertical" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512" id="ellipsis-vertical-solid"><path fill="currentColor" d="M64 360C94.93 360 120 385.1 120 416C120 446.9 94.93 472 64 472C33.07 472 8 446.9 8 416C8 385.1 33.07 360 64 360zM64 200C94.93 200 120 225.1 120 256C120 286.9 94.93 312 64 312C33.07 312 8 286.9 8 256C8 225.1 33.07 200 64 200zM64 152C33.07 152 8 126.9 8 96C8 65.07 33.07 40 64 40C94.93 40 120 65.07 120 96C120 126.9 94.93 152 64 152z" /></symbol>'});a().add(s);const c=s},1265:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>c});var n=r(7854),o=r.n(n),i=r(5348),a=r.n(i),s=new(o())({id:"envelope-regular",use:"envelope-regular-usage",viewBox:"0 0 512 512",content:'<symbol aria-hidden="true" class="svg-inline--fa fa-envelope" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="envelope-regular"><path fill="currentColor" d="M448 64H64C28.65 64 0 92.65 0 128v256c0 35.35 28.65 64 64 64h384c35.35 0 64-28.65 64-64V128C512 92.65 483.3 64 448 64zM64 112h384c8.822 0 16 7.178 16 16v22.16l-166.8 138.1c-23.19 19.28-59.34 19.27-82.47 .0156L48 150.2V128C48 119.2 55.18 112 64 112zM448 400H64c-8.822 0-16-7.178-16-16V212.7l136.1 113.4C204.3 342.8 229.8 352 256 352s51.75-9.188 71.97-25.98L464 212.7V384C464 392.8 456.8 400 448 400z" /></symbol>'});a().add(s);const c=s},6029:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>c});var n=r(7854),o=r.n(n),i=r(5348),a=r.n(i),s=new(o())({id:"gear-solid",use:"gear-solid-usage",viewBox:"0 0 512 512",content:'<symbol aria-hidden="true" class="svg-inline--fa fa-gear" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="gear-solid"><path fill="currentColor" d="M499.5 332c0-5.66-3.112-11.13-8.203-14.07l-46.61-26.91C446.8 279.6 448 267.1 448 256s-1.242-23.65-3.34-35.02l46.61-26.91c5.092-2.941 8.203-8.411 8.203-14.07c0-14.1-41.98-99.04-63.86-99.04c-2.832 0-5.688 .7266-8.246 2.203l-46.72 26.98C362.9 94.98 342.4 83.1 320 75.16V21.28c0-7.523-5.162-14.28-12.53-15.82C290.8 1.977 273.7 0 256 0s-34.85 1.977-51.48 5.461C197.2 7.004 192 13.76 192 21.28v53.88C169.6 83.1 149.1 94.98 131.4 110.1L84.63 83.16C82.08 81.68 79.22 80.95 76.39 80.95c-19.72 0-63.86 81.95-63.86 99.04c0 5.66 3.112 11.13 8.203 14.07l46.61 26.91C65.24 232.4 64 244 64 256s1.242 23.65 3.34 35.02l-46.61 26.91c-5.092 2.941-8.203 8.411-8.203 14.07c0 14.1 41.98 99.04 63.86 99.04c2.832 0 5.688-.7266 8.246-2.203l46.72-26.98C149.1 417 169.6 428.9 192 436.8v53.88c0 7.523 5.162 14.28 12.53 15.82C221.2 510 238.3 512 255.1 512s34.85-1.977 51.48-5.461C314.8 504.1 320 498.2 320 490.7v-53.88c22.42-7.938 42.93-19.82 60.65-34.97l46.72 26.98c2.557 1.477 5.416 2.203 8.246 2.203C455.3 431 499.5 349.1 499.5 332zM256 336c-44.11 0-80-35.89-80-80S211.9 176 256 176s80 35.89 80 80S300.1 336 256 336z" /></symbol>'});a().add(s);const c=s},4525:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>c});var n=r(7854),o=r.n(n),i=r(5348),a=r.n(i),s=new(o())({id:"magnifying-glass-solid",use:"magnifying-glass-solid-usage",viewBox:"0 0 512 512",content:'<symbol aria-hidden="true" class="svg-inline--fa fa-magnifying-glass" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="magnifying-glass-solid"><path fill="currentColor" d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z" /></symbol>'});a().add(s);const c=s},7317:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>c});var n=r(7854),o=r.n(n),i=r(5348),a=r.n(i),s=new(o())({id:"user-group-solid",use:"user-group-solid-usage",viewBox:"0 0 640 512",content:'<symbol aria-hidden="true" class="svg-inline--fa fa-user-group" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" id="user-group-solid"><path fill="currentColor" d="M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3c-95.73 0-173.3 77.6-173.3 173.3C0 496.5 15.52 512 34.66 512H413.3C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM479.1 320h-73.85C451.2 357.7 480 414.1 480 477.3C480 490.1 476.2 501.9 470 512h138C625.7 512 640 497.6 640 479.1C640 391.6 568.4 320 479.1 320zM432 256C493.9 256 544 205.9 544 144S493.9 32 432 32c-25.11 0-48.04 8.555-66.72 22.51C376.8 76.63 384 101.4 384 128c0 35.52-11.93 68.14-31.59 94.71C372.7 243.2 400.8 256 432 256z" /></symbol>'});a().add(s);const c=s},2062:(e,t,r)=>{"use strict";e.exports=r.p+"assets/images/john-schaffer.e0ee9ca70bd3e07f8fa3.png"},3269:e=>{"use strict";e.exports=JSON.parse('{"name":"John Schaffer","jobPosition":"","phoneNumber":"+1 201-604-9513","email":"john@scribble-app.com","joined":"2022-06-09","bio":"The toppings you may chose for that TV dinner pizza slice when you forgot to shop for foods, the paint you may slap on your face to impress the new boss is your business. But what about your daily bread? Design comps, layouts, wireframes—will your clients accept that you go about things the facile way?","image":""}')}},r={};function n(e){var o=r[e];if(void 0!==o)return o.exports;var i=r[e]={exports:{}};return t[e].call(i.exports,i,i.exports,n),i.exports}n.m=t,e=[],n.O=(t,r,o,i)=>{if(!r){var a=1/0;for(l=0;l<e.length;l++){for(var[r,o,i]=e[l],s=!0,c=0;c<r.length;c++)(!1&i||a>=i)&&Object.keys(n.O).every((e=>n.O[e](r[c])))?r.splice(c--,1):(s=!1,i<a&&(a=i));if(s){e.splice(l--,1);var u=o();void 0!==u&&(t=u)}}return t}i=i||0;for(var l=e.length;l>0&&e[l-1][2]>i;l--)e[l]=e[l-1];e[l]=[r,o,i]},n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;n.g.importScripts&&(e=n.g.location+"");var t=n.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");r.length&&(e=r[r.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=e})(),(()=>{var e={143:0,316:0};n.O.j=t=>0===e[t];var t=(t,r)=>{var o,i,[a,s,c]=r,u=0;if(a.some((t=>0!==e[t]))){for(o in s)n.o(s,o)&&(n.m[o]=s[o]);if(c)var l=c(n)}for(t&&t(r);u<a.length;u++)i=a[u],n.o(e,i)&&e[i]&&e[i][0](),e[a[u]]=0;return n.O(l)},r=self.webpackChunkscribble_front=self.webpackChunkscribble_front||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var o=n.O(void 0,[216,316],(()=>n(450)));o=n.O(o)})();