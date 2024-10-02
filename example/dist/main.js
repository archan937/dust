(()=>{var oe=Object.create;var D=Object.defineProperty;var re=Object.getOwnPropertyDescriptor;var se=Object.getOwnPropertyNames;var le=Object.getPrototypeOf,ie=Object.prototype.hasOwnProperty;var ae=(e,t)=>()=>(e&&(t=e(e=0)),t);var ce=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),d=(e,t)=>{for(var n in t)D(e,n,{get:t[n],enumerable:!0})},b=(e,t,n,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of se(t))!ie.call(e,r)&&r!==n&&D(e,r,{get:()=>t[r],enumerable:!(s=re(t,r))||s.enumerable});return e},m=(e,t,n)=>(b(e,t,"default"),n&&b(n,t,"default")),G=(e,t,n)=>(n=e!=null?oe(le(e)):{},b(t||!e||!e.__esModule?D(n,"default",{value:e,enumerable:!0}):n,e)),ue=e=>b(D({},"__esModule",{value:!0}),e);var z={};d(z,{isArray:()=>ge,isDomNode:()=>R,isFunction:()=>h,isNull:()=>C,isObject:()=>de,isUndefined:()=>A,randomHash:()=>_e});var $,_e,ge,h,C,A,R,de,v=ae(()=>{$=["ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz","0123456789"].join(""),_e=()=>{let e="";for(let t=0;t<6;t++)e+=$.charAt(Math.floor(Math.random()*$.length));return e},ge=Array.isArray,h=e=>typeof e=="function",C=e=>e===null,A=e=>typeof e>"u",R=e=>e&&(e instanceof Element||e.constructor.name==="DocumentFragment"),de=e=>e&&Object.prototype.toString.call(e)==="[object Object]"});var N=ce(Y=>{var{isArray:Re,isFunction:q,isObject:y,isUndefined:ye,randomHash:xe}=(v(),ue(z)),W="__mergeValue__",B="__unsetValue__",be=e=>{let t=e?.__getter__;return t?t():e},De=(e,t,n)=>{let s=y(e),r=t;if(q(t))if(t.__skip__=!0,s){let i=new Proxy(()=>{},{apply(c,f,[a]){return a?{[W]:a}:e},get(c,f){return e[f]}});r=t(i)}else r=t(e);if(y(r)&&s){let i=r[W];return Se(e,i||r,n||!!i),e}return r},Se=(e,t,n)=>{let s={};Object.entries(t).forEach(([r,i])=>{let c=e[r]?.__setter__;c?c(i,n):e[r]=i,s[r]=!0}),n||Object.keys(e).forEach(r=>{if(r!=="__skip__"){let i=!s[r],c=e[r]?.__skip__&&!e[r].__getter__;if(i&&!c){let f=e[r]?.__setter__;f?f(B):delete e[r]}}})},J=(e,t)=>{if(q(e))return e.__skip__=!0,[e];let n=e,s=xe(),r=[],i=a=>{!a||a===t||a.name==="__skip__"||a.__skip__||a.__states__?.[s]||(a.__states__||(a.__states__={}),a.__states__[s]=!0,r.push(a))},c=new Proxy(()=>{},{apply:function(){if(i(arguments.callee.caller),y(n)){let g=Re(n)?[]:{};return Object.keys(n).forEach(u=>{g[u]=be(n[u])}),g}return n},get:function(g,u){if(u==="__getter__")return()=>n;if(u==="__setter__")return f;if(!ye(n))return Object.prototype.hasOwnProperty.call(n,u)&&(i(arguments.callee.caller),n[u]=J(n[u],t)[0]),n[u]}}),f=(a,g)=>{let u=a===B;if(u&&y(n)){let x=y(n)?Object.keys(a):[];Object.entries(n).forEach(([te,ne])=>{x.includes(te)||ne.__setter__?.(B)})}n=u?void 0:De(n,a,g),r.forEach(x=>(x.__handler__||x)()),u&&(r.length=0)};return[c,f]};Y.useState=function(e,t){return t=t||arguments.callee.caller,J(e,t)}});var l={};d(l,{BrowserRouter:()=>k,DirectoryRouter:()=>E,Fragment:()=>O,NoElement:()=>w,Route:()=>P,createElement:()=>U,createRoot:()=>j,default:()=>o,matchRoute:()=>p,registerRoutes:()=>_});var M={};d(M,{BrowserRouter:()=>k,DirectoryRouter:()=>E,Route:()=>P});var F={};d(F,{matchRoute:()=>p,registerRoutes:()=>_});var me=()=>{window.addEventListener("popstate",()=>{S(window.location.toString())}),document.addEventListener("click",n=>{let s=n.target.closest("a");if(s&&s.tagName==="A"){if(s.origin!==window.location.origin||s.hash)return;n.preventDefault(),history.pushState({},"",s.href)}});let e=history.pushState,t=history.replaceState;history.pushState=(...n)=>{e.apply(history,n),S(n[2])},history.replaceState=(...n)=>{t.apply(history,n),S(n[2])}},H={},I=[],p=e=>{I.push(t=>{let n=new URL(t).pathname,s=H[n]||(()=>{});e(n,s)})},_=e=>{H={...H,...e},S(window.location.toString())},S=(e,t)=>{console.log(`* Navigating to: ${new URL(e).pathname}`),[t||I].flat().forEach(n=>n(e))};me();var P=w,K=(e,t="/")=>e.reduce((n,{index:s,path:r,component:i,redirect:c,children:f})=>(r=`${t}${s?"":`/${r}`}`.replace("//","/"),i?Object.assign(Object.assign({},n),{[r]:i}):c?Object.assign(Object.assign({},n),{[r]:()=>window.location=c}):Object.assign(Object.assign({},n),K(f,r))),{});function fe({children:e}){let[t,n]=(0,l.useState)(),[s,r]=(0,l.useState)();return _(K(e)),p((i,c)=>{n(i),r(c())}),console.log("Rendering <BrowserRouter/>"),o.createElement(o.Fragment,null,o.createElement("h1",null,"Hi, my name is BrowserRouter! :) "),o.createElement("p",null,"Route: ",()=>t()),o.createElement("div",null,()=>s()))}var k=fe;function pe(){let[e,t]=(0,l.useState)(),[n,s]=(0,l.useState)();return p((r,i)=>{t(r),s(i())}),console.log("Rendering <DirectoryRouter/>"),o.createElement(o.Fragment,null,o.createElement("h1",null,"Hi, my name is DirectoryRouter! :) "),o.createElement("p",null,"Route: ",()=>e()),o.createElement("div",null,()=>n()))}var E=pe;var L={};d(L,{Fragment:()=>O,NoElement:()=>w,createElement:()=>U,createRoot:()=>j});v();var Ee=(e,t)=>{Object.entries(t||{}).forEach(([n,s])=>{let r=n.toLowerCase(),i=r.match(/on([a-z]+)/)?.[1];i&&h(s)?e.addEventListener(i,s,!1):e.setAttribute(r,s)})},he=(e,t)=>{if(C(t)||A(t))return;let n;t instanceof Element||t.constructor.name==="DocumentFragment"?n=t:(n=document.createTextNode(""),h(t)?(t.__handler__=()=>{let s=t();R(s)?(n=s,e.replaceChildren(n)):R(n)&&(n=document.createTextNode(""),e.replaceChildren(n)),n.nodeValue=C(s)||A(s)||s===!1?"":s},t.__handler__()):n.nodeValue=t),e.appendChild(n)},U=(e,t,...n)=>{if(R(e))return e;let s=n.flat();if(e?.name==="NoElement")return{...t,children:s};if(h(e))return e({...t,children:s});let r=!e,i=r?document.createDocumentFragment():document.createElement(e);return r||Ee(i,t),s.forEach(c=>he(i,c)),i},j=e=>({render:t=>{e.innerHTML="",e.appendChild(U(t))}}),O="";function w(e){return e}m(l,G(N()));var we=G(N()),Ce={...M,...L,...F,...we},o=Ce;function Ae(){return console.log("Rendering <App/> using <DirectoryRouter/>"),o.createElement(o.Fragment,null,o.createElement("a",{href:"/",style:"padding-right: 15px"},"Home"),o.createElement("a",{href:"/docs/routing",style:"padding-right: 15px"},"Routing Docs"),o.createElement("a",{href:"/about-me",style:"padding-right: 15px"},"About Me"),o.createElement(E,{pages:"src/nextjs-pages"}))}var Q=Ae;var je=j(document.getElementById("root"));je.render(o.createElement(Q,null));function He(){return console.log("Rendering <AboutMe/>"),o.createElement("h1",null,"And I am Paul ;)")}var T=He;function Fe({counter:e,setCounter:t,show:n,setShow:s}){return console.log("Rendering <Counter/>"),o.createElement(o.Fragment,null,"Counter: ",o.createElement("strong",null,()=>e()),o.createElement("p",null,o.createElement("button",{onClick:()=>t(r=>r+1)},"Up"),o.createElement("button",{onClick:()=>t(r=>r-1)},"Down")),o.createElement("p",null,o.createElement("button",{onClick:()=>s(r=>!r)},"Toggle")),o.createElement("p",null,()=>n()&&o.createElement("p",null,o.createElement("strong",null,"Hello!"))))}var X=Fe;function Pe(){let[e,t]=(0,l.useState)(""),n=({target:s})=>t(s.value);return console.log("Rendering <SayHello/>"),o.createElement("div",null,o.createElement("p",null,"What is your name?",()=>" ",o.createElement("input",{type:"text",onKeyDown:n,onKeyUp:n})),o.createElement("p",{style:"margin-top: 20px; padding: 8px 16px; font-family: Georgia; font-size: 17px; font-style: italic; border-left: 4px solid black"},"Hello, ",()=>e(),"!",o.createElement("br",null),"How are you today?"))}var Z=Pe;function ke(){let[e,t]=(0,l.useState)(0),[n,s]=(0,l.useState)(!1);return console.log("Rendering <Home/>"),o.createElement(o.Fragment,null,o.createElement("h1",null,"Welcome to Dust!"),o.createElement("p",null,o.createElement("i",null,"A minimalistic reactive Javascript library for building dynamic state component-based interfaces.")),o.createElement("p",null,o.createElement("i",null,o.createElement("strong",null,"(please note the browser console: components are NOT RERENDERED on change"),")")),o.createElement("p",null,"See more at: ",o.createElement("a",{href:"https://github.com/archan937/dust"},"Github")),o.createElement("h3",{style:"margin-top: 60px"},"Say Hello example:"),o.createElement(Z,null),o.createElement("h3",{style:"margin-top: 60px"},"Classic Counter example:"),o.createElement(X,{counter:e,setCounter:t,show:n,setShow:s}))}var V=ke;function Me(){return console.log("Rendering <Routing/>"),o.createElement(o.Fragment,null,o.createElement("h1",null,"You can use two types of routing"),o.createElement("ul",null,o.createElement("li",null,"DirectoryRouter - Routing similar to Next.js"),o.createElement("li",null,"BrowserRouter - Routing similar to ReactRouterDOM")))}var ee=Me;var ve={"/about-me":T,"/":V,"/docs/routing":ee};_(ve);})();
