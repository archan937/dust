(()=>{var se=Object.create;var H=Object.defineProperty;var ae=Object.getOwnPropertyDescriptor;var ie=Object.getOwnPropertyNames;var le=Object.getPrototypeOf,ue=Object.prototype.hasOwnProperty;var ce=(e,t)=>()=>(e&&(t=e(e=0)),t);var me=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),h=(e,t)=>{for(var n in t)H(e,n,{get:t[n],enumerable:!0})},T=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of ie(t))!ue.call(e,s)&&s!==n&&H(e,s,{get:()=>t[s],enumerable:!(r=ae(t,s))||r.enumerable});return e},m=(e,t,n)=>(T(e,t,"default"),n&&T(n,t,"default")),N=(e,t,n)=>(n=e!=null?se(le(e)):{},T(t||!e||!e.__esModule?H(n,"default",{value:e,enumerable:!0}):n,e)),de=e=>T(H({},"__esModule",{value:!0}),e);var K={};h(K,{isArray:()=>he,isDomNode:()=>R,isFunction:()=>E,isNull:()=>A,isObject:()=>ye,isUndefined:()=>S,randomHash:()=>_e});var I,_e,he,E,A,S,R,ye,O=ce(()=>{I=["ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz","0123456789"].join(""),_e=()=>{let e="";for(let t=0;t<6;t++)e+=I.charAt(Math.floor(Math.random()*I.length));return e},he=e=>Array.isArray(e),E=e=>typeof e=="function",A=e=>e===null,S=e=>typeof e>"u",R=e=>S(e)?!1:e instanceof Element||typeof DocumentFragment<"u"&&e instanceof DocumentFragment,ye=e=>!!e&&Object.prototype.toString.call(e)==="[object Object]"});var M=me(Q=>{var{isArray:Re,isFunction:J,isObject:b,isUndefined:be,randomHash:Te}=(O(),de(K)),q="__mergeValue__",L="__unsetValue__",V="__skip__",He=e=>{let t=e.__getter__;return t?t():e},we=(e,t,n=!1)=>{let r;if(J(t))if(t.__skip__=!0,b(e)){let s=new Proxy(()=>{},{apply:(i,l,[d])=>d?{[q]:d}:e,get:(i,l)=>e[l]});r=t(s)}else r=t(e);else r=t;if(b(r)&&b(e)){let s=r[q];return xe(e,s||r,n||!!s),e}return r},xe=(e,t,n)=>{let r={};Object.entries(t).forEach(([s,i])=>{let l=e[s]?.__setter__;l?l(i,n):e[s]=i,r[s]=!0}),n||Object.keys(e).forEach(s=>{if(s!==V&&!r[s]&&!(e[s]?.__skip__&&!e[s]?.__getter__)){let l=e[s]?.__setter__;l?l(L):e[s]=void 0}})},Y=(e,t)=>{if(J(e))return e.__skip__=!0,[e,()=>{}];let n=e,r=Te(),s=[],i=c=>{if(!c||c===t||c.name===V||c.__skip__||c.__states__?.[r])return;let p=c;p.__states__??={},p.__states__[r]=!0,s.push(p)},l=new Proxy(()=>{},{apply:function(){if(i(arguments.callee.caller),b(n)){let p=Re(n)?[]:{};return Object.keys(n).forEach(u=>{p[u]=He(n[u])}),p}return n},get:function(p,u){if(u==="__getter__")return()=>n;if(u==="__setter__")return d;if(!be(n)){if(Object.prototype.hasOwnProperty.call(n,u)){i(arguments.callee.caller);let[f]=Y(n[u],t);n[u]=f}return n[u]}}}),d=(c,p=!1)=>{let u=c===L;u&&b(n)&&Object.entries(n).forEach(([f,re])=>{Object.prototype.hasOwnProperty.call(n,f)||re.__setter__?.(L)}),n=u?void 0:we(n,c,p),s.forEach(f=>(f.__handler__??f)()),u&&(s.length=0)};return[l,d]},Ae=function(e,t){return Y(e,t??arguments.callee.caller)};Q.useState=Ae});var a={};h(a,{BrowserRouter:()=>P,DirectoryRouter:()=>y,Fragment:()=>z,NoElement:()=>x,Route:()=>D,createElement:()=>F,createRoot:()=>j,default:()=>o,matchRoute:()=>g,registerRoutes:()=>_});var C={};h(C,{BrowserRouter:()=>P,DirectoryRouter:()=>y,Route:()=>D});var k={};h(k,{matchRoute:()=>g,registerRoutes:()=>_});var pe=()=>{window.addEventListener("popstate",()=>{w(window.location)}),document.addEventListener("click",n=>{let r=n.target.closest("a");if(r&&r.tagName==="A"){if(r.origin!==window.location.origin||r.hash)return;n.preventDefault(),history.pushState({},"",r.href)}});let e=history.pushState,t=history.replaceState;history.pushState=(...n)=>{e.apply(history,n),w(n[2])},history.replaceState=(...n)=>{t.apply(history,n),w(n[2])}},v,W={},U=[],g=e=>void U.push(e),_=e=>{Object.entries(e).forEach(([t,n])=>{W[B(t)]=n}),v=void 0,console.log("* Routes registered"),w(window.location)},w=(e,t)=>{let n=B(e);if(v===n)return;v=n,console.log(`* Navigating to: ${n}`);let r=W[n]||(()=>{});[t??U].flat().forEach(s=>{s(n,r)})},B=e=>{let t=e.toString();return(t.match(/^\//)?t:new URL(t).pathname).replace(/\/+$/,"")||"/"};pe();var D=x,$=(e,t="/")=>e.reduce((n,{index:r,path:s,component:i,redirect:l,children:d})=>(s=`${t}${r?"":`/${s}`}`.replace("//","/"),i?Object.assign(Object.assign({},n),{[s]:i}):l?Object.assign(Object.assign({},n),{[s]:()=>window.location.href=l}):Object.assign(Object.assign({},n),$(d??[],s))),{});function fe({children:e}){let[t,n]=(0,a.useState)(),[r,s]=(0,a.useState)();return _($(e)),g((i,l)=>{n(i),s(l())}),console.log("Rendering <BrowserRouter/>"),o.createElement(o.Fragment,null,o.createElement("h1",null,"Hi, my name is BrowserRouter! :) "),o.createElement("p",null,"Route: ",()=>t()),o.createElement("div",null,()=>r()))}var P=fe;function ge(){let[e,t]=(0,a.useState)(),[n,r]=(0,a.useState)();return g((s,i)=>{t(s),r(i())}),console.log("Rendering <DirectoryRouter/>"),o.createElement(o.Fragment,null,o.createElement("h1",null,"Hi, my name is DirectoryRouter! :) "),o.createElement("p",null,"Route: ",()=>e()),o.createElement("div",null,()=>n()))}var y=ge;var G={};h(G,{Fragment:()=>z,NoElement:()=>x,createElement:()=>F,createRoot:()=>j});O();var Ee=(e,t)=>{Object.entries(t||{}).forEach(([n,r])=>{let s=n.toLowerCase(),i=s.match(/on([a-z]+)/)?.[1];i&&E(r)?e.addEventListener(i,r,!1):e.setAttribute(s,r)})},Se=(e,t)=>{if(A(t)||S(t))return;let n;t&&(t instanceof Element||t.constructor.name==="DocumentFragment")?n=t:(n=document.createTextNode(""),E(t)?(t.__handler__=()=>{let r=t();R(r)?(n=r,e.replaceChildren(n)):R(n)&&(n=document.createTextNode(""),e.replaceChildren(n)),n.nodeValue=A(r)||S(r)||r===!1?"":String(r)},t.__handler__?.()):n.nodeValue=String(t)),e.appendChild(n)},F=(e,t,...n)=>{if(R(e))return e;let r=n.flat();if(E(e))return e?.name==="NoElement"?{...t,children:r}:e({...t,children:r});let s=!e,i=s?document.createDocumentFragment():document.createElement(e);return s||Ee(i,t),r.forEach(l=>Se(i,l)),i},j=e=>({render:t=>{e.innerHTML="",e.appendChild(F(t,{}))}}),z="";function x(e){return e}m(a,N(M()));var je=N(M()),ve={...C,...G,...k,...je},o=ve;function ke(){return console.log("Rendering <App/> using <DirectoryRouter/>"),o.createElement(o.Fragment,null,o.createElement("a",{href:"/dust",style:"padding-right: 15px"},"Home"),o.createElement("a",{href:"/dust/docs/routing",style:"padding-right: 15px"},"Routing Docs"),o.createElement("a",{href:"/dust/about-me",style:"padding-right: 15px"},"About Me"),o.createElement(y,{pages:"./pages"}))}var X=ke;var De=j(document.getElementById("root"));De.render(o.createElement(X,null));function Pe(){return console.log("Rendering <AboutMe/>"),o.createElement("h1",null,"And I am Paul ;)")}var Z=Pe;function Ce({counter:e,setCounter:t,show:n,setShow:r}){return console.log("Rendering <Counter/>"),o.createElement(o.Fragment,null,"Counter: ",o.createElement("strong",null,()=>e()),o.createElement("p",null,o.createElement("button",{onClick:()=>t(s=>s+1)},"Up"),o.createElement("button",{onClick:()=>t(s=>s-1)},"Down")),o.createElement("p",null,o.createElement("button",{onClick:()=>r(s=>!s)},"Toggle")),o.createElement("p",null,()=>n()&&o.createElement("p",null,o.createElement("strong",null,"Hello!"))))}var ee=Ce;function Oe(){let[e,t]=(0,a.useState)(""),n=({target:r})=>t(r.value);return console.log("Rendering <SayHello/>"),o.createElement("div",null,o.createElement("p",null,"What is your name?",()=>" ",o.createElement("input",{type:"text",onKeyDown:n,onKeyUp:n})),o.createElement("p",{style:"margin-top: 20px; padding: 8px 16px; font-family: Georgia; font-size: 17px; font-style: italic; border-left: 4px solid black"},"Hello, ",()=>e(),"!",o.createElement("br",null),"How are you today?"))}var te=Oe;function Fe(){let[e,t]=(0,a.useState)(0),[n,r]=(0,a.useState)(!1);return console.log("Rendering <Home/>"),o.createElement(o.Fragment,null,o.createElement("h1",null,"Welcome to Dust!"),o.createElement("p",null,o.createElement("i",null,"A minimalistic reactive Javascript library for building dynamic state component-based interfaces.")),o.createElement("p",null,o.createElement("i",null,o.createElement("strong",null,"(please note the browser console: components are NOT RERENDERED on change"),")")),o.createElement("p",null,"See more at: ",o.createElement("a",{href:"https://github.com/archan937/dust"},"Github")),o.createElement("h3",{style:"margin-top: 60px"},"Say Hello example:"),o.createElement(te,null),o.createElement("h3",{style:"margin-top: 60px"},"Classic Counter example:"),o.createElement(ee,{counter:e,setCounter:t,show:n,setShow:r}))}var ne=Fe;function Ge(){return console.log("Rendering <Routing/>"),o.createElement(o.Fragment,null,o.createElement("h1",null,"You can use two types of routing"),o.createElement("ul",null,o.createElement("li",null,"DirectoryRouter - Routing similar to Next.js"),o.createElement("li",null,"BrowserRouter - Routing similar to ReactRouterDOM")))}var oe=Ge;var Le={"/dust/about-me":Z,"/dust/":ne,"/dust/docs/routing":oe};_(Le);})();
