parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"jWIk":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.render=void 0;var e=window.document,t=window.Math,o=window.HTMLElement,r=window.XMLHttpRequest,n=function(e){return function(t,o,r){var n=e.createElement(t);if(o)for(var a in o){var i=o[a];null!=i&&(null!=n[a]?n[a]=i:n.setAttribute(a,i))}if(r)for(var l=0,c=r.length;l<c;l++){var d=r[l];n.appendChild("string"==typeof d?e.createTextNode(d):d)}return n}},a=n(e),i=function(e){var t;return function(){t||(t=1,e.apply(this,arguments))}},l=function(e,t){return{}.hasOwnProperty.call(e,t)},c="github-buttons",d="2.6.0",s="https://unpkg.com/"+c+"@"+d+"/dist/buttons.html",f="https://api.github.com",u=r&&r.prototype&&"withCredentials"in r.prototype,g=u&&o&&o.prototype.attachShadow&&!o.prototype.attachShadow.prototype,h=function(e,t,o){e.addEventListener?e.addEventListener(t,o,!1):e.attachEvent("on"+t,o)},p=function(e,t,o){e.removeEventListener?e.removeEventListener(t,o,!1):e.detachEvent("on"+t,o)},b=function(e,t,o){var r=function(n){return p(e,t,r),o(n)};h(e,t,r)},v=function(e,t,o){var r=function(n){if(t.test(e.readyState))return p(e,"readystatechange",r),o(n)};h(e,"readystatechange",r)},m=function(e){for(var t={href:e.href,title:e.title,"aria-label":e.getAttribute("aria-label")},o=["icon","color-scheme","text","size","show-count"],r=0,n=o.length;r<n;r++){var a="data-"+o[r];t[a]=e.getAttribute(a)}return null==t["data-text"]&&(t["data-text"]=e.textContent||e.innerText),t},w="body{margin:0}a{text-decoration:none;outline:0}.widget{display:inline-block;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;font-size:0;white-space:nowrap}.btn,.social-count{position:relative;display:inline-block;height:14px;padding:2px 5px;font-size:11px;font-weight:600;line-height:14px;vertical-align:bottom;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-repeat:repeat-x;background-position:-1px -1px;background-size:110% 110%;border:1px solid}.btn{border-radius:.25em}.btn:not(:last-child){border-radius:.25em 0 0 .25em}.social-count{border-left:0;border-radius:0 .25em .25em 0}.widget-lg .btn,.widget-lg .social-count{height:20px;padding:3px 10px;font-size:12px;line-height:20px}.octicon{display:inline-block;vertical-align:text-top;fill:currentColor}",x=".btn{color:#24292e;background-color:#eff3f6;background-image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg'%3e%3clinearGradient id='o' x2='0' y2='1'%3e%3cstop stop-color='%23fafbfc'/%3e%3cstop offset='90%25' stop-color='%23eff3f6'/%3e%3c/linearGradient%3e%3crect width='100%25' height='100%25' fill='url(%23o)'/%3e%3c/svg%3e\");background-image:-moz-linear-gradient(top, #fafbfc, #eff3f6 90%);background-image:linear-gradient(180deg, #fafbfc, #eff3f6 90%);filter:progid:DXImageTransform.Microsoft.Gradient(startColorstr='#FFFAFBFC', endColorstr='#FFEEF2F5');border-color:#cdcfd1;border-color:rgba(27,31,35,.2)}:root .btn{filter:none}.btn:focus,.btn:hover{background-color:#e6ebf1;background-image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg'%3e%3clinearGradient id='o' x2='0' y2='1'%3e%3cstop stop-color='%23f0f3f6'/%3e%3cstop offset='90%25' stop-color='%23e6ebf1'/%3e%3c/linearGradient%3e%3crect width='100%25' height='100%25' fill='url(%23o)'/%3e%3c/svg%3e\");background-image:-moz-linear-gradient(top, #f0f3f6, #e6ebf1 90%);background-image:linear-gradient(180deg, #f0f3f6, #e6ebf1 90%);filter:progid:DXImageTransform.Microsoft.Gradient(startColorstr='#FFF0F3F6', endColorstr='#FFE5EAF0');background-position:-0.5em;border-color:#acaeb0;border-color:rgba(27,31,35,.35)}:root .btn:focus,:root .btn:hover{filter:none}.btn:active{background-color:#e9ecef;background-image:none;border-color:#acaeb0;border-color:rgba(27,31,35,.35);box-shadow:inset 0 .15em .3em rgba(27,31,35,.15);filter:none}.social-count{color:#24292e;background-color:#fff;border-color:#d1d2d3;border-color:rgba(27,31,35,.2)}.social-count:focus,.social-count:hover{color:#0366d6}.octicon-heart{color:#ea4aaa}",k=".btn{color:#fafbfc;background-color:#202428;background-image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg'%3e%3clinearGradient id='o' x2='0' y2='1'%3e%3cstop stop-color='%232f363d'/%3e%3cstop offset='90%25' stop-color='%23202428'/%3e%3c/linearGradient%3e%3crect width='100%25' height='100%25' fill='url(%23o)'/%3e%3c/svg%3e\");background-image:-moz-linear-gradient(top, #2f363d, #202428 90%);background-image:linear-gradient(180deg, #2f363d, #202428 90%);filter:progid:DXImageTransform.Microsoft.Gradient(startColorstr='#FF2F363D', endColorstr='#FF1E2226');border-color:#2b3138;border-color:rgba(27,31,35,.2)}:root .btn{filter:none}.btn:focus,.btn:hover{background-color:#1b1f23;background-image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg'%3e%3clinearGradient id='o' x2='0' y2='1'%3e%3cstop stop-color='%232b3137'/%3e%3cstop offset='90%25' stop-color='%231b1f23'/%3e%3c/linearGradient%3e%3crect width='100%25' height='100%25' fill='url(%23o)'/%3e%3c/svg%3e\");background-image:-moz-linear-gradient(top, #2b3137, #1b1f23 90%);background-image:linear-gradient(180deg, #2b3137, #1b1f23 90%);filter:progid:DXImageTransform.Microsoft.Gradient(startColorstr='#FF2B3137', endColorstr='#FF191D21');background-position:-0.5em;border-color:#252b30;border-color:rgba(27,31,35,.5)}:root .btn:focus,:root .btn:hover{filter:none}.btn:active{background-color:#181b1f;background-image:none;border-color:#252b30;border-color:rgba(27,31,35,.5);box-shadow:inset 0 .15em .3em rgba(27,31,35,.15);filter:none}.social-count{color:#fafbfc;background-color:#1b1f23;border-color:#1b1f23;border-color:rgba(27,31,35,.2)}.social-count:focus,.social-count:hover{color:#2188ff}.octicon-heart{color:#ec6cb9}",y=function(e,t,o,r){null==t&&(t="&"),null==o&&(o="="),null==r&&(r=window.encodeURIComponent);var n=[];for(var a in e){var i=e[a];null!=i&&n.push(r(a)+o+r(i))}return n.join(t)},C=function(e,t,o,r){null==t&&(t="&"),null==o&&(o="="),null==r&&(r=window.decodeURIComponent);for(var n={},a=e.split(t),i=0,l=a.length;i<l;++i){var c=a[i];if(""!==c){var d=c.split(o);n[r(d[0])]=null!=d[1]?r(d.slice(1).join(o)):void 0}}return n},z={light:x,dark:k},F=function(e,t){return"@media(prefers-color-scheme:"+e+"){"+z[l(z,t)?t:e]+"}"},M=function(e){if(null==e)return z.light;var t=C(e,";",":",function(e){return e.replace(/^[ \t\n\f\r]+|[ \t\n\f\r]+$/g,"")});return z[l(z,t["no-preference"])?t["no-preference"]:"light"]+F("light",t.light)+F("dark",t.dark)},_={"mark-github":{width:16,height:16,path:'<path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>'},heart:{width:12,height:16,path:'<path fill-rule="evenodd" d="M9 2c-.97 0-1.69.42-2.2 1-.51.58-.78.92-.8 1-.02-.08-.28-.42-.8-1-.52-.58-1.17-1-2.2-1-1.632.086-2.954 1.333-3 3 0 .52.09 1.52.67 2.67C1.25 8.82 3.01 10.61 6 13c2.98-2.39 4.77-4.17 5.34-5.33C11.91 6.51 12 5.5 12 5c-.047-1.69-1.342-2.913-3-3z"/>'},eye:{width:16,height:16,path:'<path fill-rule="evenodd" d="M8.06 2C3 2 0 8 0 8s3 6 8.06 6C13 14 16 8 16 8s-3-6-7.94-6zM8 12c-2.2 0-4-1.78-4-4 0-2.2 1.8-4 4-4 2.22 0 4 1.8 4 4 0 2.22-1.78 4-4 4zm2-4c0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2 1.11 0 2 .89 2 2z"/>'},star:{width:14,height:16,path:'<path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"/>'},"repo-forked":{width:10,height:16,path:'<path fill-rule="evenodd" d="M8 1a1.993 1.993 0 00-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 002 1a1.993 1.993 0 00-1 3.72V6.5l3 3v1.78A1.993 1.993 0 005 15a1.993 1.993 0 001-3.72V9.5l3-3V4.72A1.993 1.993 0 008 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"/>'},"issue-opened":{width:14,height:16,path:'<path fill-rule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 011.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"/>'},"cloud-download":{width:16,height:16,path:'<path fill-rule="evenodd" d="M9 12h2l-3 3-3-3h2V7h2v5zm3-8c0-.44-.91-3-4.5-3C5.08 1 3 2.92 3 5 1.02 5 0 6.52 0 8c0 1.53 1 3 3 3h3V9.7H3C1.38 9.7 1.3 8.28 1.3 8c0-.17.05-1.7 1.7-1.7h1.3V5c0-1.39 1.56-2.7 3.2-2.7 2.55 0 3.13 1.55 3.2 1.8v1.2H12c.81 0 2.7.22 2.7 2.2 0 2.09-2.25 2.2-2.7 2.2h-2V11h2c2.08 0 4-1.16 4-3.5C16 5.06 14.08 4 12 4z"/>'}},E=function(e,t){return e=(""+e).toLowerCase().replace(/^octicon-/,""),l(_,e)||(e="mark-github"),'<svg viewBox="0 0 '+_[e].width+" "+_[e].height+'" class="octicon octicon-'+e+'" style="width: '+t*_[e].width/_[e].height+"px; height: "+t+'px;" aria-hidden="true">'+_[e].path+"</svg>"},G={},T=function(e,t){var o=G[e]||(G[e]=[]);if(!(o.push(t)>1)){var a=i(function(){for(delete G[e];t=o.shift();)t.apply(null,arguments)});if(u){var l=new r;h(l,"abort",a),h(l,"error",a),h(l,"load",function(){var e;try{e=JSON.parse(l.responseText)}catch(t){return void a(t)}a(200!==l.status,e)}),l.open("GET",e),l.send()}else{var c=this||window;c._=function(e){c._=null,a(200!==e.meta.status,e.data)};var d=n(c.document)("script",{async:!0,src:e+(/\?/.test(e)?"&":"?")+"callback=_"}),s=function(){c._&&c._({meta:{}})};h(d,"load",s),h(d,"error",s),d.readyState&&v(d,/de|m/,s),c.document.getElementsByTagName("head")[0].appendChild(d)}}},A=function(e,t,o){var r=n(e.ownerDocument),a=e.appendChild(r("style",{type:"text/css"})),i=w+M(t["data-color-scheme"]);a.styleSheet?a.styleSheet.cssText=i:a.appendChild(e.ownerDocument.createTextNode(i));var l=r("a",{className:"btn",href:t.href,target:"_blank",rel:"noopener",innerHTML:E(t["data-icon"],/^large$/i.test(t["data-size"])?16:14),"aria-label":t["aria-label"]||void 0},[" ",r("span",{},[t["data-text"]||""])]),c=e.appendChild(r("div",{className:"widget"+(/^large$/i.test(t["data-size"])?" widget-lg":"")},[l])),d=l.hostname.split(".").reverse();if(""===d[0]&&d.shift(),"com"!==d[0]||"github"!==d[1])return l.href="#",l.target="_self",void o(c);var s=d.length,u=(" /"+l.pathname).split(/\/+/);if(((2===s||3===s&&"gist"===d[2])&&"archive"===u[3]||2===s&&"releases"===u[3]&&"download"===u[4]||3===s&&"codeload"===d[2])&&(l.target="_top"),/^true$/i.test(t["data-show-count"])&&2===s){var g,h;if(!u[2]&&u[1])g=h="followers";else if(!u[3]&&u[2])h="stargazers_count",g="stargazers";else if(u[4]||"subscription"!==u[3])if(u[4]||"fork"!==u[3]){if("issues"!==u[3])return void o(c);h="open_issues_count",g="issues"}else h="forks_count",g="network/members";else h="subscribers_count",g="watchers";var p=u[2]?"/repos/"+u[1]+"/"+u[2]:"/users/"+u[1];T.call(this,f+p,function(e,t){if(!e){var n=t[h];c.appendChild(r("a",{className:"social-count",href:t.html_url+"/"+g,target:"_blank",rel:"noopener","aria-label":n+" "+h.replace(/_count$/,"").replace("_"," ").slice(0,n<2?-1:void 0)+" on GitHub"},[(""+n).replace(/\B(?=(\d{3})+(?!\d))/g,",")]))}o(c)})}else o(c)},L=window.devicePixelRatio||1,H=function(e){return(L>1?t.ceil(t.round(e*L)/L*2)/2:t.ceil(e))||0},S=function(e){var o=e.offsetWidth,r=e.offsetHeight;if(e.getBoundingClientRect){var n=e.getBoundingClientRect();o=t.max(o,H(n.width)),r=t.max(r,H(n.height))}return[o,r]},V=function(e,t){e.style.width=t[0]+"px",e.style.height=t[1]+"px"},B=function(t,o){if(null!=t&&null!=o)if(t.getAttribute&&(t=m(t)),g){var r=a("span",{title:t.title||void 0});A(r.attachShadow({mode:"closed"}),t,function(){o(r)})}else{var n=a("iframe",{src:"javascript:0",title:t.title||void 0,allowtransparency:!0,scrolling:"no",frameBorder:0});V(n,[0,0]),n.style.border="none";var i=function(){var r,a=n.contentWindow;try{r=a.document.body}catch(l){return void e.body.appendChild(n.parentNode.removeChild(n))}p(n,"load",i),A.call(a,r,t,function(e){var r=S(e);n.parentNode.removeChild(n),b(n,"load",function(){V(n,r)}),n.src=s+"#"+(n.name=y(t)),o(n)})};h(n,"load",i),e.body.appendChild(n)}};exports.render=B;
},{}]},{},["jWIk"], null)
//# sourceMappingURL=/buttons.esm.a989659f.js.map