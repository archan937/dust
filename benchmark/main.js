"use strict";(()=>{var ot=Object.create;var ae=Object.defineProperty;var at=Object.getOwnPropertyDescriptor;var st=Object.getOwnPropertyNames;var ct=Object.getPrototypeOf,it=Object.prototype.hasOwnProperty;var se=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,n)=>(typeof require<"u"?require:t)[n]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});var lt=(e,t)=>{for(var n in t)ae(e,n,{get:t[n],enumerable:!0})},ut=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of st(t))!it.call(e,s)&&s!==n&&ae(e,s,{get:()=>t[s],enumerable:!(r=at(t,s))||r.enumerable});return e};var ce=(e,t,n)=>(n=e!=null?ot(ct(e)):{},ut(t||!e||!e.__esModule?ae(n,"default",{value:e,enumerable:!0}):n,e));var de={};lt(de,{Fragment:()=>le,ReactiveList:()=>S,call:()=>Ce,cleanupNode:()=>N,createContext:()=>mt,createElement:()=>G,createRoot:()=>M,css:()=>u,cx:()=>w,registerCleanup:()=>O,useContext:()=>pt,useEffect:()=>De,useRef:()=>Se,useState:()=>y});var Ce=e=>typeof e=="function"&&"__register__"in e?e():e;var T={current:null},$=e=>e===null?"null":Array.isArray(e)?"array":e instanceof Date?"date":e instanceof Map?"map":e instanceof RegExp?"regexp":e instanceof Set?"set":typeof e,ve=(e,t)=>!Array.isArray(e)&&Object.prototype.hasOwnProperty.call(e,t);var S=class{constructor(t,n,r){this.subscribe=t;this.getItems=n;this.render=r}};var z=new WeakMap,O=(e,t)=>{let n=z.get(e);n?n.push(t):z.set(e,[t])},N=e=>{z.get(e)?.forEach(t=>t()),z.delete(e),Array.from(e.childNodes).forEach(N)},ie=(e,t)=>{if(!(t==null||t===!1)){if(t instanceof Node){e.appendChild(t);return}if(t instanceof S){let n=document.createComment("");e.appendChild(n);let r=t,s=r.getItems().map(m=>{let d=r.render(m);return e.insertBefore(d,n),{item:m,node:d}}),l=r.subscribe(()=>{let m=r.getItems(),d=new Set,p=m.map(f=>{let E=s.findIndex((g,h)=>!d.has(h)&&g.item===f);return E>=0?(d.add(E),s[E]):{item:f,node:r.render(f)}});s.forEach((f,E)=>{d.has(E)||(N(f.node),f.node.parentNode?.removeChild(f.node))}),p.forEach(({node:f})=>n.parentNode?.insertBefore(f,n)),s=p});O(n,l);return}if(typeof t=="function"){let n=[],r=T.current;T.current=m=>{n.push(m)};let s;try{s=t()}finally{T.current=r}let l=s;if(typeof l=="function"&&l.__register__){let m=document.createTextNode(String(l())),d=l.__register__(()=>{m.textContent=String(l())});O(m,d),e.appendChild(m);return}if(n.length>0){let m=document.createComment("");e.appendChild(m);let d=h=>{let v=m.parentNode;if(h==null||typeof h=="boolean")return[];if(h instanceof DocumentFragment){let _=Array.from(h.childNodes);return _.forEach(I=>v.insertBefore(I,m)),_}let B=h instanceof Node?h:document.createTextNode(String(h));return v.insertBefore(B,m),[B]},p=h=>{h.forEach(v=>{N(v),v.parentNode?.removeChild(v)})},f=d(s),E=()=>{p(f),f=d(t())},g=n.map(h=>h(E));O(m,()=>g.forEach(h=>h()));return}ie(e,s);return}e.appendChild(document.createTextNode(String(t)))}},le=(e,...t)=>{let n=document.createDocumentFragment();return t.forEach(r=>ie(n,r)),n},G=(e,t,...n)=>{if(typeof e=="function")return e(t??{},...n);let r=document.createElement(e),s=t?.ref;return t&&Object.entries(t).forEach(([l,m])=>{l.startsWith("on")&&typeof m=="function"?r.addEventListener(l.slice(2).toLowerCase(),m):l==="className"?r.className=String(m):l==="htmlFor"?r.setAttribute("for",String(m)):typeof m=="boolean"?m&&r.setAttribute(l,""):l!=="ref"&&m!==null&&m!==void 0&&r.setAttribute(l,String(m))}),n.forEach(l=>ie(r,l)),s&&(s.current=r),r};var ue=new WeakMap,dt=e=>{let t=ue.get(e);return t||(t=[],ue.set(e,t)),t},mt=e=>{let t={};return t.defaultValue=e,t.Provider=(n,...r)=>{let s=dt(t);s.push(n.value);let l=le(null,...r);return s.pop(),l},t},pt=e=>{let t=ue.get(e);return t&&t.length>0?t[t.length-1]:e.defaultValue};var M=e=>{if(!e)throw new Error("createRoot: container is null");return{render(t){N(e),e.innerHTML="",e.appendChild(t)}}};var ke=new Set,W=null,ft=()=>(W||(W=document.createElement("style"),W.setAttribute("data-dust-css",""),document.head.appendChild(W)),W),ht=e=>{let t=5381;for(let n=0;n<e.length;n++)t=(t<<5)+t^e.charCodeAt(n);return"d"+(t>>>0).toString(36)},u=(e,...t)=>{let n=String.raw({raw:e},...t).trim(),r=ht(n);return ke.has(r)||(ke.add(r),ft().textContent+=`.${r}{${n}}
`),r};var w=(...e)=>e.filter(Boolean).join(" ");var gt=(e,t)=>{let n,r=()=>{n?.();let l=e();n=typeof l=="function"?l:void 0},s=t.map(l=>l?.__register__?.(r)).filter(l=>typeof l=="function");return r(),()=>{n?.(),s.forEach(l=>l())}},De=gt;var Et=e=>({current:e}),Se=Et;var bt=new Set(["push","pop","unshift","shift","splice","sort","reverse","fill","copyWithin"]),xt=(e,t)=>{let n=$(e);if(n==="array"){let r=e,s=t,l=Math.max(r.length,s.length);for(let m=0;m<l;m++)m<s.length&&(r[m]=s[m]);return r.length=s.length,r}if(n==="object"){let r=e,s=t,l=new Set(Object.keys(r)),m=new Set(Object.keys(s));return m.forEach(d=>{let p=r[d],f=s[d],E=p?.__setter__;E?E(f):r[d]=f}),l.difference(m).forEach(d=>{r[d]=void 0}),r}return t},Ne=e=>{let t=e,n=[],r=d=>(n.push(d),()=>{let p=n.indexOf(d);p!==-1&&n.splice(p,1)}),s=d=>{let p=d;typeof d=="function"&&(p=d(t)),t=xt(t,p),n.forEach(f=>f())},l=d=>{if(typeof d!="object"||d===null)return d;if(Array.isArray(d))return d.map(l);if($(d)!=="object")return d;let{constructor:p}=d;if(p&&p!==Object)return d;let f=Object.assign({},d);return Object.entries(f).forEach(([E,g])=>{g?.__setter__&&(f[E]=g())}),f};return[new Proxy(()=>(T.current&&T.current(r),l(t)),{get(d,p,f){let E=$(t);switch(p){case"__register__":return r;case"__setter__":return s;case"toString":case"valueOf":return()=>l(t)}if(E==="array"&&typeof p=="string"&&bt.has(p)){let g=t[p];return(...h)=>{let v=g.apply(t,h);return n.forEach(B=>B()),v}}if(E==="array"&&p==="map")return g=>new S(r,()=>t,g);if(E==="array"||E==="object"){let g=t[p];if(typeof g=="function")return g.__setter__?g:g.bind(t);if(ve(t,p)){let[h]=Ne(g);return t[p]=h,h}return g}return Reflect.get(d,p,f)},ownKeys(){return Object.keys(t)},getOwnPropertyDescriptor(d,p){let f=$(t);if((f==="array"||f==="object")&&t!==null&&typeof t=="object"&&p in t)return{enumerable:!0,configurable:!0}}}),s]},y=Ne;var me="";var Rt=()=>{window.addEventListener("popstate",()=>pe(window.location)),document.addEventListener("click",n=>{let r=n.target;for(;r&&r.tagName!=="A";)r=r.parentElement;if(r){let s=r;if(s.origin!==window.location.origin||s.hash)return;n.preventDefault(),history.pushState({},"",s.href)}});let{pushState:e,replaceState:t}=history;history.pushState=(...n)=>{e.apply(history,n),pe(n[2])},history.replaceState=(...n)=>{t.apply(history,n),pe(n[2])}},_e=()=>document.createDocumentFragment(),Te,yt=_e,wt={},Ct=[];var pe=e=>{let t=vt(e);if(Te===t)return;Te=t;let n={},r=_e;for(let[s,l]of Object.entries(wt)){let d=new RegExp(`^${s.replace(/:[^/]+/g,p=>`(?<${p.slice(1)}>[^/]+)`)}$`).exec(t);if(d){n=d.groups??{},r=l;break}}yt=r,kt(n),Ct.forEach(s=>s(t,r))},vt=e=>{let t=String(e),n=(t.startsWith("/")?t:new URL(t).pathname).replace(/\/+$/,"");return me&&n.startsWith(me)&&(n=n.slice(me.length)||"/"),n||"/"},[En,kt]=y({});typeof window<"u"&&Rt();var St={...de},a=St;var We=document.createElement("style");We.textContent="@keyframes bm-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.75)}}@keyframes bm-spin{to{transform:rotate(360deg)}}";document.head.appendChild(We);var c={page:u`
    max-width: 900px;
    margin: 0 auto;
    padding: 5rem 1.5rem 3rem;
  `,header:u`
    margin-bottom: 2rem;
  `,title:u`
    font-size: 1.75rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin-bottom: 0.35rem;
  `,version:u`
    display: inline-block;
    font-size: 0.72rem;
    font-weight: 600;
    padding: 0.15rem 0.5rem;
    border-radius: 999px;
    background: #1d4ed8;
    color: #bfdbfe;
    vertical-align: middle;
    margin-left: 0.4rem;
    position: relative;
    top: -2px;
  `,sub:u`
    color: #71717a;
    font-size: 0.9rem;
    max-width: 580px;
    line-height: 1.65;
  `,btn:u`
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.5rem 1.2rem;
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    border: none;
    background: #3b82f6;
    color: #fff;
    transition: background 0.15s;
    &:hover {
      background: #2563eb;
    }
    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  `,status:u`
    margin-top: 0.75rem;
    font-size: 0.82rem;
    color: #52525b;
    min-height: 1.2rem;
  `,cards:u`
    margin-top: 2.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  `,card:u`
    background: #111113;
    border: 1px solid #27272a;
    border-radius: 10px;
    overflow: hidden;
    scroll-margin-top: 5rem;
  `,cardTop:u`
    padding: 1rem 1.25rem 0.85rem;
    border-bottom: 1px solid #1f1f22;
  `,cardName:u`
    font-size: 0.95rem;
    font-weight: 700;
    color: #f4f4f5;
    margin-bottom: 0.25rem;
  `,cardDesc:u`
    font-size: 0.8rem;
    color: #52525b;
    line-height: 1.5;
  `,stats:u`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border-bottom: 1px solid #1f1f22;
  `,stat:u`
    padding: 0.7rem 1.25rem;
    border-right: 1px solid #1f1f22;
    &:last-child {
      border-right: none;
    }
  `,statLabel:u`
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #3f3f46;
    margin-bottom: 0.2rem;
  `,statValue:u`
    font-size: 0.95rem;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  `,statSub:u`
    font-size: 0.72rem;
    font-weight: 400;
    margin-top: 1px;
    font-variant-numeric: tabular-nums;
    color: #3f3f46;
  `,dustColor:u`
    color: #34d399;
  `,reactColor:u`
    color: #60a5fa;
  `,speedupColor:u`
    color: #fbbf24;
  `,bars:u`
    padding: 0.85rem 1.25rem;
    border-bottom: 1px solid #1f1f22;
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
  `,barRow:u`
    display: flex;
    align-items: center;
    gap: 0.65rem;
  `,barLabel:u`
    width: 46px;
    text-align: right;
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    flex-shrink: 0;
  `,barTrack:u`
    flex: 1;
    height: 5px;
    background: #1c1c1f;
    border-radius: 3px;
    overflow: hidden;
  `,barValue:u`
    width: 68px;
    text-align: right;
    font-size: 0.78rem;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    flex-shrink: 0;
  `,barRange:u`
    width: 110px;
    text-align: right;
    font-size: 0.68rem;
    color: #3f3f46;
    font-variant-numeric: tabular-nums;
    flex-shrink: 0;
  `,codeGrid:u`
    display: grid;
    grid-template-columns: 1fr 1fr;
  `,codePane:u`
    overflow: hidden;
    &:first-child {
      border-right: 1px solid #1f1f22;
    }
  `,codePaneHeader:u`
    padding: 0.4rem 0.85rem;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  `,codePaneHeaderDust:u`
    background: #052e16;
    color: #34d399;
    border-bottom: 1px solid #14532d;
  `,codePaneHeaderReact:u`
    background: #0c1a2e;
    color: #60a5fa;
    border-bottom: 1px solid #1e3a5f;
  `,pre:u`
    margin: 0;
    padding: 0.85rem;
    overflow-x: auto;
    background: #0d1117;
    font-family: 'Fira Code', 'Cascadia Code', 'JetBrains Mono', monospace;
  `,note:u`
    margin-top: 2.5rem;
    padding: 1rem 1.25rem;
    border-radius: 8px;
    background: #111113;
    border: 1px solid #27272a;
    font-size: 0.83rem;
    color: #71717a;
    line-height: 1.7;
  `,hidden:u`
    position: absolute;
    width: 0;
    height: 0;
    overflow: hidden;
    pointer-events: none;
  `,footer:u`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background: rgba(9, 9, 11, 0.88);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid #27272a;
  `,footerInner:u`
    max-width: 900px;
    margin: 0 auto;
    padding: 0.65rem 1.5rem 0.6rem;
    display: flex;
    align-items: center;
    gap: 0;
  `,footerStep:u`
    flex: 1;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-width: 0;
  `,footerArrow:u`
    color: #27272a;
    font-size: 0.75rem;
    flex-shrink: 0;
    padding: 0 0.1rem;
  `,stepDot:u`
    width: 22px;
    height: 22px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.65rem;
    font-weight: 700;
    flex-shrink: 0;
    transition: background 0.3s, color 0.3s;
  `,stepDotIdle:u`
    background: #18181b;
    color: #3f3f46;
    border: 1px solid #27272a;
  `,stepDotRunning:u`
    background: #1d4ed8;
    color: #fff;
    border: 1px solid #3b82f6;
    animation: bm-pulse 1.2s ease-in-out infinite;
  `,stepDotDone:u`
    background: #14532d;
    color: #34d399;
    border: 1px solid #166534;
  `,stepText:u`
    min-width: 0;
    overflow: hidden;
  `,stepName:u`
    font-size: 0.72rem;
    font-weight: 600;
    color: #71717a;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.2;
  `,stepNameRunning:u`
    color: #93c5fd;
  `,stepNameDone:u`
    color: #f4f4f5;
  `,stepMeta:u`
    font-size: 0.67rem;
    color: #3f3f46;
    font-variant-numeric: tabular-nums;
    line-height: 1.2;
    margin-top: 1px;
  `,stepMetaRunning:u`
    color: #60a5fa;
  `,stepMetaDone:u`
    color: #34d399;
    font-weight: 600;
  `,footerTrack:u`
    height: 2px;
    background: #18181b;
    position: relative;
    overflow: hidden;
  `},je=["Counter","Prop drilling","Wide tree","Targeted update","Initial render"],Ie=()=>je.map(e=>({label:e,state:"idle",run:0,speedup:""})),[he,F]=y([]),[Nt,A]=y(""),[fe,Pe]=y(!1),[Fe,Tt]=y(""),[Ae,Oe]=y(Ie()),R=5,x=(e,t)=>Oe(n=>n.map((r,s)=>s===e?{...r,...t}:r)),j=e=>new Promise(t=>setTimeout(t,e)),k=(e,t)=>{for(let r=0;r<Math.ceil(t/10);r++)e();let n=performance.now();for(let r=0;r<t;r++)e();return performance.now()-n},C=e=>e.reduce((t,n)=>t+n,0)/e.length,_t=e=>Math.min(...e),Pt=e=>Math.max(...e),ge=e=>`${e.toFixed(1)} ms`,Le=e=>`${e.toFixed(1)}`,Be=(e,t)=>`${(e/t*1e3).toFixed(1)} \xB5s/op`,L=(e,t)=>{let n=e/t;return n>=1.05?`${n.toFixed(1)}\xD7 faster`:"\u2248 equal"},$e=({label:e,lang:t,code:n})=>{let r=document.createElement("div");r.className=c.codePane;let s=document.createElement("div");s.className=w(c.codePaneHeader,e==="Dust"?c.codePaneHeaderDust:c.codePaneHeaderReact),s.textContent=e;let l=document.createElement("pre");l.className=c.pre;let m=document.createElement("code");try{m.innerHTML=hljs.highlight(n.trim(),{language:t}).value}catch{m.textContent=n.trim()}return l.appendChild(m),r.appendChild(s),r.appendChild(l),r},Me=({label:e,runs:t,maxMs:n,color:r})=>{let s=C(t),l=(s/n*100).toFixed(1);return a.createElement("div",{className:c.barRow},a.createElement("span",{className:c.barLabel,style:`color:${r}`},()=>e),a.createElement("div",{className:c.barTrack},a.createElement("div",{style:`width:${l}%;height:100%;background:${r};border-radius:3px;transition:width 0.4s ease`})),a.createElement("span",{className:c.barValue,style:`color:${r}`},ge(s)),a.createElement("span",{className:c.barRange},Le(_t(t))," \u2013 ",Le(Pt(t))," ms"))},Ft=({result:e})=>{let t=C(e.dustRuns),n=C(e.reactRuns),r=Math.max(t,n);return a.createElement("div",{className:c.card},a.createElement("div",{className:c.cardTop},a.createElement("div",{className:c.cardName},()=>e.name),a.createElement("div",{className:c.cardDesc},()=>e.description)),a.createElement("div",{className:c.stats},a.createElement("div",{className:c.stat},a.createElement("div",{className:c.statLabel},"Iterations"),a.createElement("div",{className:c.statValue,style:"color:#52525b"},()=>e.iterations.toLocaleString()),a.createElement("div",{className:c.statSub},R," runs")),a.createElement("div",{className:c.stat},a.createElement("div",{className:w(c.statLabel,c.dustColor)},"Dust avg"),a.createElement("div",{className:w(c.statValue,c.dustColor)},ge(t)),a.createElement("div",{className:c.statSub},Be(t,e.iterations))),a.createElement("div",{className:c.stat},a.createElement("div",{className:w(c.statLabel,c.reactColor)},"React avg"),a.createElement("div",{className:w(c.statValue,c.reactColor)},ge(n)),a.createElement("div",{className:c.statSub},Be(n,e.iterations))),a.createElement("div",{className:c.stat},a.createElement("div",{className:w(c.statLabel,c.speedupColor)},"Speedup"),a.createElement("div",{className:w(c.statValue,c.speedupColor)},L(n,t)))),a.createElement("div",{className:c.bars},a.createElement(Me,{label:"Dust",runs:e.dustRuns,maxMs:r,color:"#34d399"}),a.createElement(Me,{label:"React",runs:e.reactRuns,maxMs:r,color:"#60a5fa"})),a.createElement("div",{className:c.codeGrid},a.createElement($e,{label:"Dust",lang:"typescript",code:e.dustCode}),a.createElement($e,{label:"React",lang:"javascript",code:e.reactCode})))},At=he.map(e=>a.createElement(Ft,{result:e})),Lt=({p:e,i:t})=>{let n=e.state==="done",r=e.state==="running";return a.createElement("div",{className:c.footerStep,style:"cursor:pointer",onClick:()=>{let s=document.querySelectorAll(`.${c.card}`)[t];if(s){let l=s.getBoundingClientRect().top+window.scrollY-80;window.scrollTo({top:Math.max(0,l),behavior:"smooth"})}}},a.createElement("div",{className:w(c.stepDot,n?c.stepDotDone:r?c.stepDotRunning:c.stepDotIdle)},()=>a.call(n)?"\u2713":String(t+1)),a.createElement("div",{className:c.stepText},a.createElement("div",{className:w(c.stepName,n?c.stepNameDone:r?c.stepNameRunning:"")},()=>e.label),a.createElement("div",{className:w(c.stepMeta,n?c.stepMetaDone:r?c.stepMetaRunning:"")},()=>a.call(n)?e.speedup:r?`run ${e.run} / ${R}`:"\xB7")))},Bt=()=>a.createElement("div",{className:c.footer},a.createElement("div",{className:c.footerInner},()=>{let e=Ae(),t=document.createDocumentFragment();return e.forEach((n,r)=>{if(t.appendChild(Lt({p:n,i:r})),r<e.length-1){let s=document.createElement("span");s.className=c.footerArrow,s.textContent="\u203A",t.appendChild(s)}}),t}),a.createElement("div",{className:c.footerTrack},()=>{let e=Ae(),t=e.filter(l=>l.state==="done").length,n=e.find(l=>l.state==="running"),r=Math.min(100,Math.round((t*R+(n?.run??0))/(je.length*R)*100)),s=document.createElement("div");return s.style.cssText=`height:100%;width:${r}%;background:linear-gradient(90deg,#3b82f6,#34d399);transition:width 0.4s ease`,s})),D=document.createElement("div");D.className=c.hidden;document.body.appendChild(D);var H=e=>{let t=document.createElement("div");return D.appendChild(t),M(t).render(a.createElement(e,null)),t},V=e=>{D.removeChild(e)},$t=async()=>{Pe(!0),F([]),Oe(Ie());let[{default:e},{createRoot:t},{flushSync:n}]=await Promise.all([import("https://esm.sh/react@19"),import("https://esm.sh/react-dom@19/client"),import("https://esm.sh/react-dom@19")]);Tt(e.version);let r=o=>{let i=document.createElement("div");D.appendChild(i);let b=t(i);return n(()=>b.render(e.createElement(o))),{root:b,el:i}},s=({root:o,el:i})=>{o.unmount(),D.removeChild(i)},l=null,m=()=>{let[o,i]=y(0);return l=i,a.createElement("span",null,()=>o)},d=null,p=()=>{let[o,i]=e.useState(0);return d=i,e.createElement("span",null,o)},f=H(m),E=r(p),g=5e4,h=[],v=[];x(0,{state:"running"});for(let o=0;o<R;o++)x(0,{run:o+1}),A(`1/5  Counter \u2014 run ${o+1}/${R}\u2026`),await j(16),h.push(k(()=>l(i=>i+1),g)),v.push(k(()=>n(()=>d(i=>i+1)),g));V(f),s(E),x(0,{state:"done",speedup:L(C(v),C(h))}),F(o=>[...o,{name:"Counter \u2014 50,000 updates",description:"Single state value, single text node. React re-runs the component and reconciles the vdom on every update.",iterations:g,dustRuns:h,reactRuns:v,dustCode:`const DustCounterBenchmark = (): JSX.Element => {
  const [count, setCount] = useState(0);
  dustSetCounter = setCount;
  return Dust.createElement('span', null, count);
};

dustSetCounter(n => n + 1);
// \u2192 1 text node mutation
// \u2192 component never re-runs`,reactCode:`const ReactCounterBenchmark = () => {
  const [count, setCount] = React.useState(0);
  reactSetCounter = setCount;
  return React.createElement('span', null, count);
};

flushSync(() => reactSetCounter(n => n + 1));
// \u2192 component re-runs
// \u2192 new vdom built, diffed
// \u2192 DOM commit`}]);let _=({count:o})=>a.createElement("span",null,()=>o);for(let o=0;o<29;o++){let i=_;_=({count:b})=>a.createElement(i,{count:b})}let I=null,ze=()=>{let[o,i]=y(0);return I=i,a.createElement(_,{count:o})},U=({count:o})=>e.createElement("span",null,o);for(let o=0;o<29;o++){let i=U;U=({count:b})=>e.createElement(i,{count:b})}let Ge=U,Ee=null,He=()=>{let[o,i]=e.useState(0);return Ee=i,e.createElement(Ge,{count:o})},Ve=H(ze),Ue=r(He),K=1e4,J=[],X=[];x(1,{state:"running"});for(let o=0;o<R;o++)x(1,{run:o+1}),A(`2/5  Prop drilling \u2014 run ${o+1}/${R}\u2026`),await j(16),J.push(k(()=>I(i=>i+1),K)),X.push(k(()=>n(()=>Ee(i=>i+1)),K));V(Ve),s(Ue),x(1,{state:"done",speedup:L(C(X),C(J))}),F(o=>[...o,{name:"Prop drilling \u2014 30 levels, 10,000 updates",description:"State at root, rendered in a leaf 30 levels deep. React re-renders every intermediate component on each update.",iterations:K,dustRuns:J,reactRuns:X,dustCode:`const DustLeaf = ({ count }) =>
  Dust.createElement('span', null, count);
let DustDrillChain = DustLeaf;
for (let i = 0; i < 29; i++) {
  const Inner = DustDrillChain;
  DustDrillChain = ({ count }) =>
    Dust.createElement(Inner, { count });
}
const DustDrillBenchmark = (): JSX.Element => {
  const [count, setCount] = useState(0);
  dustSetDrill = setCount;
  return Dust.createElement(DustDrillChain, { count });
};

dustSetDrill(n => n + 1);
// \u2192 0 component re-runs
// \u2192 1 text node mutation`,reactCode:`const ReactLeaf = ({ count }) =>
  React.createElement('span', null, count);
let ReactDrillChain = ReactLeaf;
for (let i = 0; i < 29; i++) {
  const Inner = ReactDrillChain;
  ReactDrillChain = ({ count }) =>
    React.createElement(Inner, { count });
}
const ReactDrillBenchmark = () => {
  const [count, setCount] = React.useState(0);
  reactSetDrill = setCount;
  return React.createElement(ReactDrillTop, { count });
};

flushSync(() => reactSetDrill(n => n + 1));
// \u2192 31 component calls per update
// \u2192 310,000 total for 10k updates`}]);let Ke=({count:o})=>a.createElement("span",null,()=>o),be=null,Je=()=>{let[o,i]=y(0);return be=i,a.createElement("div",null,...Array.from({length:200},()=>a.createElement(Ke,{count:o})))},Xe=({count:o})=>e.createElement("span",null,o),xe=null,qe=()=>{let[o,i]=e.useState(0);return xe=i,e.createElement("div",null,...Array.from({length:200},(b,P)=>e.createElement(Xe,{key:P,count:o})))},Ye=H(Je),Qe=r(qe),q=5e3,Y=[],Q=[];x(2,{state:"running"});for(let o=0;o<R;o++)x(2,{run:o+1}),A(`3/5  Wide tree \u2014 run ${o+1}/${R}\u2026`),await j(16),Y.push(k(()=>be(i=>i+1),q)),Q.push(k(()=>n(()=>xe(i=>i+1)),q));V(Ye),s(Qe),x(2,{state:"done",speedup:L(C(Q),C(Y))}),F(o=>[...o,{name:"Wide tree \u2014 200 children, 5,000 updates",description:"200 separate child components each display the same state. React re-renders all 200 children whenever the parent state changes.",iterations:q,dustRuns:Y,reactRuns:Q,dustCode:`const DustWideChild = ({ count }) =>
  Dust.createElement('span', null, count);

const DustWideBenchmark = (): JSX.Element => {
  const [count, setCount] = useState(0);
  dustSetWide = setCount;
  return Dust.createElement('div', null,
    ...Array.from({ length: 200 }, () =>
      Dust.createElement(DustWideChild, { count }),
    ),
  );
};

dustSetWide(n => n + 1);
// \u2192 0 component re-runs
// \u2192 200 text node mutations`,reactCode:`const ReactWideChild = ({ count }) =>
  React.createElement('span', null, count);

const ReactWideBenchmark = () => {
  const [count, setCount] = React.useState(0);
  reactSetWide = setCount;
  return React.createElement('div', null,
    ...Array.from({ length: 200 }, (_, i) =>
      React.createElement(ReactWideChild, { key: i, count }),
    ),
  );
};

flushSync(() => reactSetWide(n => n + 1));
// \u2192 201 component calls per update
// \u2192 1,005,000 total for 5k updates`}]);let Re=[],Ze=()=>{let o=Array.from({length:1e4},(i,b)=>y(b));return Re=o,a.createElement("div",null,...o.map(([i])=>a.createElement("span",null,()=>i)))},ye=Array(1e4).fill(null),et=({index:o,init:i})=>{let[b,P]=e.useState(i);return ye[o]=P,e.createElement("span",null,b)},tt=()=>e.createElement("div",null,...Array.from({length:1e4},(o,i)=>e.createElement(et,{key:i,index:i,init:i}))),nt=H(Ze),rt=r(tt),Z=1e3,ee=[],te=[];x(3,{state:"running"});for(let o=0;o<R;o++)x(3,{run:o+1}),A(`4/5  Targeted update \u2014 run ${o+1}/${R}\u2026`),await j(16),ee.push(k(()=>Re[5e3][1](i=>i+1),Z)),te.push(k(()=>n(()=>ye[5e3](i=>i+1)),Z));V(nt),s(rt),x(3,{state:"done",speedup:L(C(te),C(ee))}),F(o=>[...o,{name:"Targeted update \u2014 10k items, update one",description:"Both sides use 10k independently-stateful items. React uses individual item components (the fair approach) \u2014 only ReactFatItem[5000] re-renders. Dust updates one text node directly with no component re-run.",iterations:Z,dustRuns:ee,reactRuns:te,dustCode:`let dustFatPairs = [];
const DustTargetedUpdateBenchmark = (): JSX.Element => {
  const pairs = Array.from({ length: 10_000 }, (_, i) => useState(i));
  dustFatPairs = pairs;
  return Dust.createElement(
    'div',
    null,
    ...pairs.map(([getter]) => Dust.createElement('span', null, getter)),
  );
};

dustFatPairs[5_000][1](n => n + 1);
// \u2192 1 text node mutation
// \u2192 0 component re-runs`,reactCode:`const reactFatSetters = Array(10_000).fill(null);
const ReactFatItem = ({ index, init }) => {
  const [count, setCount] = React.useState(init);
  reactFatSetters[index] = setCount;
  return React.createElement('span', null, count);
};
const ReactTargetedUpdateBenchmark = () =>
  React.createElement(
    'div',
    null,
    ...Array.from({ length: 10_000 }, (_, i) =>
      React.createElement(ReactFatItem, { key: i, index: i, init: i }),
    ),
  );

flushSync(() => reactFatSetters[5_000](n => n + 1));
// \u2192 only ReactFatItem[5000] re-renders
// \u2192 9,999 components untouched`}]);let ne=100,re=[],oe=[];x(4,{state:"running"});for(let o=0;o<R;o++)x(4,{run:o+1}),A(`5/5  Initial render \u2014 run ${o+1}/${R}\u2026`),await j(16),re.push(k(()=>{let i=document.createElement("div");D.appendChild(i),M(i).render(G("ul",null,...Array.from({length:5e3},(b,P)=>G("li",null,P)))),D.removeChild(i)},ne)),oe.push(k(()=>{let i=document.createElement("div");D.appendChild(i);let b=t(i);n(()=>b.render(e.createElement("ul",null,...Array.from({length:5e3},(P,we)=>e.createElement("li",{key:we},we))))),b.unmount(),D.removeChild(i)},ne));x(4,{state:"done",speedup:L(C(oe),C(re))}),F(o=>[...o,{name:"Initial render \u2014 5,000 items",description:"Cold mount of 5,000 list items. React's highly-optimised commit path is competitive here \u2014 included for honesty.",iterations:ne,dustRuns:re,reactRuns:oe,dustCode:`const el = document.createElement('div');
sandboxEl.appendChild(el);
createRoot(el).render(
  createElement('ul', null,
    ...Array.from({ length: 5_000 }, (_, i) =>
      createElement('li', null, i),
    ),
  ),
);
sandboxEl.removeChild(el);`,reactCode:`const el = document.createElement('div');
sandboxEl.appendChild(el);
const root = reactCreateRoot(el);
flushSync(() =>
  root.render(
    React.createElement('ul', null,
      ...Array.from({ length: 5_000 }, (_, i) =>
        React.createElement('li', { key: i }, i),
      ),
    ),
  ),
);
root.unmount();
sandboxEl.removeChild(el);`}]),A("Done."),Pe(!1)},Mt=()=>a.createElement("div",{className:c.page},a.createElement("div",{className:c.header},a.createElement("h1",{className:c.title},"Dust vs React",()=>Fe()&&a.createElement("span",{className:c.version},"React ",()=>Fe())),a.createElement("p",{className:c.sub},"Five scenarios targeting the exact patterns where React's re-render model creates the most overhead. All React updates forced synchronous via ",a.createElement("code",null,"flushSync"),". Each test runs ",R," times; bars show average with min\u2013max range.")),a.createElement("button",{className:c.btn,disabled:fe(),onClick:$t},()=>fe()?"\u23F3 Running\u2026":"\u25B6 Run benchmarks"),a.createElement("p",{className:c.status},()=>Nt),a.createElement("div",{className:c.cards},()=>At),()=>he().length>0&&a.createElement("div",{className:c.note},a.createElement("strong",{style:"color:#e4e4e7"},"Why these tests?")," Prop drilling, wide trees, and fat components are the exact patterns React developers reach for ",a.createElement("code",null,"React.memo"),","," ",a.createElement("code",null,"useCallback"),", and ",a.createElement("code",null,"useMemo")," to fix. Dust avoids all of it structurally \u2014 not through memoization, but because components never re-run. Each reactive value maintains a direct link to its DOM node. State updates are wire-to-DOM, nothing in between."),()=>(fe()||he().length>0)&&a.createElement(Bt,null));M(document.getElementById("root")).render(a.createElement(Mt,null));})();
