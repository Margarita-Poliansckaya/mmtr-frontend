!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t,n){var o=n(1),r=n(2);"string"==typeof(r=r.__esModule?r.default:r)&&(r=[[e.i,r,""]]);var a={insert:"head",singleton:!1},l=(o(e.i,r,a),r.locals?r.locals:{});e.exports=l},function(e,t,n){"use strict";var o,r=function(){return void 0===o&&(o=Boolean(window&&document&&document.all&&!window.atob)),o},a=function(){var e={};return function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}e[t]=n}return e[t]}}(),l={};function i(e,t,n){for(var o=0;o<t.length;o++){var r={css:t[o][1],media:t[o][2],sourceMap:t[o][3]};l[e][o]?l[e][o](r):l[e].push(v(r,n))}}function c(e){var t=document.createElement("style"),o=e.attributes||{};if(void 0===o.nonce){var r=n.nc;r&&(o.nonce=r)}if(Object.keys(o).forEach((function(e){t.setAttribute(e,o[e])})),"function"==typeof e.insert)e.insert(t);else{var l=a(e.insert||"head");if(!l)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");l.appendChild(t)}return t}var u,s=(u=[],function(e,t){return u[e]=t,u.filter(Boolean).join("\n")});function d(e,t,n,o){var r=n?"":o.css;if(e.styleSheet)e.styleSheet.cssText=s(t,r);else{var a=document.createTextNode(r),l=e.childNodes;l[t]&&e.removeChild(l[t]),l.length?e.insertBefore(a,l[t]):e.appendChild(a)}}function f(e,t,n){var o=n.css,r=n.media,a=n.sourceMap;if(r?e.setAttribute("media",r):e.removeAttribute("media"),a&&btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),e.styleSheet)e.styleSheet.cssText=o;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(o))}}var m=null,p=0;function v(e,t){var n,o,r;if(t.singleton){var a=p++;n=m||(m=c(t)),o=d.bind(null,n,a,!1),r=d.bind(null,n,a,!0)}else n=c(t),o=f.bind(null,n,t),r=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)};return o(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;o(e=t)}else r()}}e.exports=function(e,t,n){return(n=n||{}).singleton||"boolean"==typeof n.singleton||(n.singleton=r()),e=n.base?e+n.base:e,t=t||[],l[e]||(l[e]=[]),i(e,t,n),function(t){if(t=t||[],"[object Array]"===Object.prototype.toString.call(t)){l[e]||(l[e]=[]),i(e,t,n);for(var o=t.length;o<l[e].length;o++)l[e][o]();l[e].length=t.length,0===l[e].length&&delete l[e]}}}},function(e,t,n){},function(e,t,n){"use strict";n.r(t);let o=document.querySelector("#content_quotes");function r(e,t){this.value=e,this.date=t}r.prototype.create=function(e){let t=document.createElement("div"),n=document.createElement("p"),r=document.createElement("span"),a=document.createElement("button");a.textContent="X",a.className="quotes__del",t.className="quotes",o.appendChild(t),r.className="quotes-mark",t.appendChild(r),t.appendChild(a),n.className="quotes-mark__text font__subheader",n.textContent=this.value,n.id=e,r.appendChild(n)},r.prototype.setValue=function(e){e.replace(/^\s+|\s+$/g,"")&&(this.value=e)};n(0);document.addEventListener("DOMContentLoaded",(function(){let e={addComment:document.querySelector(".contact-form__btn"),content:document.querySelector("#content_quotes"),input:document.querySelectorAll(".contact-form-input"),windowOpen:document.querySelector(".window")};if(0!=localStorage.length)for(let e=0;e<localStorage.length;e++)try{let t=localStorage.key(e),n=JSON.parse(localStorage.getItem(t));new r(n.value,n.date).create(t)}catch(e){console.log(`Ошибка  ${e.name} : ${e.message} \n ${e.stack}`)}function t(e,t,n){let o=document.createElement(n);o.className=t,o.id=e.id,o.textContent="edit-comment"===t?e.textContent:e.value,e.replaceWith(o)}e.addComment.addEventListener("click",()=>{if(document.querySelectorAll(".contact-form__error").forEach(e=>{e.textContent=""}),function(){let t=!0;return e.input.forEach((function(e,n){e.value.replace(/^\s+|\s+$/g,"")||(t=!1,document.getElementById(`error_${n+1}`).textContent="*Заполните поле!")})),t}()){let t=new Date,n=document.getElementById("Full_name").value,o=`f${(~~(1e8*Math.random())).toString(16)}`,a=new r(n,t);a.create(o),localStorage.setItem(o,JSON.stringify(a)),e.input.forEach(e=>e.value="")}}),document.body.addEventListener("click",e=>{if("edit-comment"!=e.target.className){document.querySelectorAll(".edit-comment").forEach(e=>{let n=JSON.parse(localStorage.getItem(e.id)),o=new r(n.value,n.date);o.setValue(e.value),e.value=o.value,t(e,"quotes-mark__text font__subheader","p"),localStorage.setItem(e.id,JSON.stringify(o))})}},!0),e.content.addEventListener("click",n=>{let o=n.target;if("quotes__del"===o.className){let e=o.parentNode,t=o.previousSibling.firstChild;localStorage.removeItem(t.id),e.remove()}"quotes-mark__text font__subheader"===o.className&&(t(o,"edit-comment","textarea"),event.stopPropagation(),e.windowOpen.style.display="none")}),e.content.addEventListener("mouseover",t=>{let n=t.target;if("quotes-mark__text font__subheader"===n.className){e.windowOpen.style.display="flex";let t=JSON.parse(localStorage.getItem(n.id));moment.lang("ru");let o=n.getBoundingClientRect();e.windowOpen.style.left=o.left+o.width+"px",e.windowOpen.style.top=o.top+o.height+"px",e.windowOpen.textContent=moment(t.date).fromNow()}}),e.content.addEventListener("mouseout",t=>{"quotes-mark__text font__subheader"===t.target.className&&(e.windowOpen.style.display="none")})}))}]);