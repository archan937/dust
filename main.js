"use strict";(()=>{var ze=Object.defineProperty;var Me=(r,t)=>{for(var a in t)ze(r,a,{get:t[a],enumerable:!0})};var ee={};Me(ee,{Fragment:()=>K,ReactiveList:()=>D,call:()=>le,cleanupNode:()=>S,createContext:()=>q,createElement:()=>je,createRoot:()=>Q,css:()=>n,cx:()=>N,registerCleanup:()=>$,useContext:()=>Z,useEffect:()=>M,useRef:()=>k,useState:()=>y});var le=r=>typeof r=="function"&&"__register__"in r?r():r;var z={current:null},_=r=>r===null?"null":Array.isArray(r)?"array":r instanceof Date?"date":r instanceof Map?"map":r instanceof RegExp?"regexp":r instanceof Set?"set":typeof r,me=(r,t)=>!Array.isArray(r)&&Object.prototype.hasOwnProperty.call(r,t);var D=class{constructor(t,a,c){this.subscribe=t;this.getItems=a;this.render=c}};var W=new WeakMap,$=(r,t)=>{let a=W.get(r);a?a.push(t):W.set(r,[t])},S=r=>{W.get(r)?.forEach(t=>t()),W.delete(r),Array.from(r.childNodes).forEach(S)},U=(r,t)=>{if(!(t==null||t===!1)){if(t instanceof Node){r.appendChild(t);return}if(t instanceof D){let a=document.createComment("");r.appendChild(a);let c=t,i=c.getItems().map(d=>{let m=c.render(d);return r.insertBefore(m,a),{item:d,node:m}}),l=c.subscribe(()=>{let d=c.getItems(),m=new Set,u=d.map(p=>{let h=i.findIndex((b,g)=>!m.has(g)&&b.item===p);return h>=0?(m.add(h),i[h]):{item:p,node:c.render(p)}});i.forEach((p,h)=>{m.has(h)||(S(p.node),p.node.parentNode?.removeChild(p.node))}),u.forEach(({node:p})=>a.parentNode?.insertBefore(p,a)),i=u});$(a,l);return}if(typeof t=="function"){let a=[],c=z.current;z.current=d=>{a.push(d)};let i;try{i=t()}finally{z.current=c}let l=i;if(typeof l=="function"&&l.__register__){let d=document.createTextNode(String(l())),m=l.__register__(()=>{d.textContent=String(l())});$(d,m),r.appendChild(d);return}if(a.length>0){let d=document.createComment("");r.appendChild(d);let m=g=>{let E=d.parentNode;if(g==null||typeof g=="boolean")return[];if(g instanceof DocumentFragment){let B=Array.from(g.childNodes);return B.forEach(T=>E.insertBefore(T,d)),B}let j=g instanceof Node?g:document.createTextNode(String(g));return E.insertBefore(j,d),[j]},u=g=>{g.forEach(E=>{S(E),E.parentNode?.removeChild(E)})},p=m(i),h=()=>{u(p),p=m(t())},b=a.map(g=>g(h));$(d,()=>b.forEach(g=>g()));return}U(r,i);return}r.appendChild(document.createTextNode(String(t)))}},K=(r,...t)=>{let a=document.createDocumentFragment();return t.forEach(c=>U(a,c)),a},je=(r,t,...a)=>{if(typeof r=="function")return r(t??{},...a);let c=document.createElement(r),i=t?.ref;return t&&Object.entries(t).forEach(([l,d])=>{l.startsWith("on")&&typeof d=="function"?c.addEventListener(l.slice(2).toLowerCase(),d):l==="className"?c.className=String(d):l==="htmlFor"?c.setAttribute("for",String(d)):typeof d=="boolean"?d&&c.setAttribute(l,""):l!=="ref"&&d!==null&&d!==void 0&&c.setAttribute(l,String(d))}),a.forEach(l=>U(c,l)),i&&(i.current=c),c};var Y=new WeakMap,Oe=r=>{let t=Y.get(r);return t||(t=[],Y.set(r,t)),t},q=r=>{let t={};return t.defaultValue=r,t.Provider=(a,...c)=>{let i=Oe(t);i.push(a.value);let l=K(null,...c);return i.pop(),l},t},Z=r=>{let t=Y.get(r);return t&&t.length>0?t[t.length-1]:r.defaultValue};var Q=r=>{if(!r)throw new Error("createRoot: container is null");return{render(t){S(r),r.innerHTML="",r.appendChild(t)}}};var de=new Set,I=null,Fe=()=>(I||(I=document.createElement("style"),I.setAttribute("data-dust-css",""),document.head.appendChild(I)),I),Be=r=>{let t=5381;for(let a=0;a<r.length;a++)t=(t<<5)+t^r.charCodeAt(a);return"d"+(t>>>0).toString(36)},n=(r,...t)=>{let a=String.raw({raw:r},...t).trim(),c=Be(a);return de.has(c)||(de.add(c),Fe().textContent+=`.${c}{${a}}
`),c};var N=(...r)=>r.filter(Boolean).join(" ");var _e=(r,t)=>{let a,c=()=>{a?.();let l=r();a=typeof l=="function"?l:void 0},i=t.map(l=>l?.__register__?.(c)).filter(l=>typeof l=="function");return c(),()=>{a?.(),i.forEach(l=>l())}},M=_e;var Ie=r=>({current:r}),k=Ie;var Ae=new Set(["push","pop","unshift","shift","splice","sort","reverse","fill","copyWithin"]),Ge=(r,t)=>{let a=_(r);if(a==="array"){let c=r,i=t,l=Math.max(c.length,i.length);for(let d=0;d<l;d++)d<i.length&&(c[d]=i[d]);return c.length=i.length,c}if(a==="object"){let c=r,i=t,l=new Set(Object.keys(c)),d=new Set(Object.keys(i));return d.forEach(m=>{let u=c[m],p=i[m],h=u?.__setter__;h?h(p):c[m]=p}),l.difference(d).forEach(m=>{c[m]=void 0}),c}return t},ue=r=>{let t=r,a=[],c=m=>(a.push(m),()=>{let u=a.indexOf(m);u!==-1&&a.splice(u,1)}),i=m=>{let u=m;typeof m=="function"&&(u=m(t)),t=Ge(t,u),a.forEach(p=>p())},l=m=>{if(typeof m!="object"||m===null)return m;if(Array.isArray(m))return m.map(l);if(_(m)!=="object")return m;let{constructor:u}=m;if(u&&u!==Object)return m;let p=Object.assign({},m);return Object.entries(p).forEach(([h,b])=>{b?.__setter__&&(p[h]=b())}),p};return[new Proxy(()=>(z.current&&z.current(c),l(t)),{get(m,u,p){let h=_(t);switch(u){case"__register__":return c;case"__setter__":return i;case"toString":case"valueOf":return()=>l(t)}if(h==="array"&&typeof u=="string"&&Ae.has(u)){let b=t[u];return(...g)=>{let E=b.apply(t,g);return a.forEach(j=>j()),E}}if(h==="array"&&u==="map")return b=>new D(c,()=>t,b);if(h==="array"||h==="object"){let b=t[u];if(typeof b=="function")return b.__setter__?b:b.bind(t);if(me(t,u)){let[g]=ue(b);return t[u]=g,g}return b}return Reflect.get(m,u,p)},ownKeys(){return Object.keys(t)},getOwnPropertyDescriptor(m,u){let p=_(t);if((p==="array"||p==="object")&&t!==null&&typeof t=="object"&&u in t)return{enumerable:!0,configurable:!0}}}),i]},y=ue;var A="",pe=r=>{A=r.replace(/\/+$/,"")},X=()=>A,Le=()=>{window.addEventListener("popstate",()=>H(window.location)),document.addEventListener("click",a=>{let c=a.target;for(;c&&c.tagName!=="A";)c=c.parentElement;if(c){let i=c;if(i.origin!==window.location.origin||i.hash)return;let l=ne(i.href);if(!Object.keys(te).some(m=>new RegExp(`^${m.replace(/:[^/]+/g,"([^/]+)")}$`).test(l)))return;a.preventDefault(),history.pushState({},"",i.href)}});let{pushState:r,replaceState:t}=history;history.pushState=(...a)=>{r.apply(history,a),H(a[2])},history.replaceState=(...a)=>{t.apply(history,a),H(a[2])}},fe=()=>document.createDocumentFragment(),G,ge=fe,te={},he=[],re=r=>{he.push(r),G!==void 0&&r(G,ge)},be=r=>{Object.assign(te,Object.fromEntries(Object.entries(r).map(([t,a])=>[ne(t),a]))),G=void 0,H(window.location)},H=r=>{let t=ne(r);if(G===t)return;G=t;let a={},c=fe;for(let[i,l]of Object.entries(te)){let m=new RegExp(`^${i.replace(/:[^/]+/g,u=>`(?<${u.slice(1)}>[^/]+)`)}$`).exec(t);if(m){a=m.groups??{},c=l;break}}ge=c,$e(a),he.forEach(i=>i(t,c))},ne=r=>{let t=String(r),a=(t.startsWith("/")?t:new URL(t).pathname).replace(/\/+$/,"");return A&&a.startsWith(A)&&(a=a.slice(A.length)||"/"),a||"/"},[xe,$e]=y({});typeof window<"u"&&Le();var ye=new WeakMap,F=(r,...t)=>{let a=document.createDocumentFragment();return ye.set(a,{...r,children:t}),a},Ee=(r,t="/")=>r.reduce((a,c)=>{let i=ye.get(c);if(!i)return a;let l=`${t}${i.index?"":`/${i.path??""}`}`.replace(/\/+/g,"/").replace(/\/$/,"")||"/";if(i.component)return{...a,[l]:i.component};if(i.redirect){let d=i.redirect;return{...a,[l]:()=>(history.pushState({},"",`${X()}${d}`),document.createDocumentFragment())}}return{...a,...Ee(i.children,l)}},{}),We=(r,...t)=>{let a=document.createElement("div");return re((c,i)=>{S(a),a.replaceChildren(i())}),be(Ee(t)),a},ae=We;var He={...ee},e=He;var Xe={base:n`
    position: sticky;
    top: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    gap: 2rem;
    padding: 0 2rem;
    height: 60px;
    background: rgba(9, 9, 11, 0.8);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  `,logo:n`
    font-size: 1.1rem;
    font-weight: 700;
    color: #818cf8;
    text-decoration: none;
    letter-spacing: -0.02em;
    margin-right: auto;
    &:hover {
      color: #a5b4fc;
    }
  `,link:n`
    font-size: 0.875rem;
    font-weight: 500;
    color: #71717a;
    text-decoration: none;
    transition: color 0.15s;
    &:hover {
      color: #f4f4f5;
    }
  `},Je={wrap:n`
    min-height: calc(100vh - 60px);
  `},C={nav:Xe,page:Je};var R=r=>`${X()}${r}`;var Ve={wrap:n`
    max-width: 780px;
    margin: 0 auto;
    padding: 4rem 2rem 8rem;
  `,hero:n`
    margin-bottom: 4rem;
  `,title:n`
    font-size: 2.25rem;
    font-weight: 800;
    color: #f4f4f5;
    letter-spacing: -0.03em;
    margin-bottom: 0.5rem;
  `,sub:n`
    font-size: 1.05rem;
    color: #71717a;
    line-height: 1.7;
  `},Ue={base:n`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 2rem;
  `,link:n`
    padding: 0.3rem 0.8rem;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.03);
    color: #818cf8;
    font-size: 0.8rem;
    font-weight: 500;
    text-decoration: none;
    transition:
      border-color 0.15s,
      background 0.15s;
    &:hover {
      border-color: rgba(129, 140, 248, 0.4);
      background: rgba(129, 140, 248, 0.08);
    }
  `},Ke={base:n`
    margin-bottom: 3.5rem;
  `,title:n`
    font-size: 1.35rem;
    font-weight: 700;
    color: #f4f4f5;
    letter-spacing: -0.02em;
    margin-bottom: 1rem;
    padding-bottom: 0.6rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  `},Ye={name:n`
    font-size: 1rem;
    font-weight: 700;
    color: #a5b4fc;
    font-family: 'SF Mono', 'Fira Code', monospace;
    margin: 1.75rem 0 0.5rem;
  `,desc:n`
    font-size: 0.95rem;
    color: #71717a;
    line-height: 1.75;
    margin-bottom: 0.75rem;
    & strong {
      color: #a1a1aa;
      font-weight: 600;
    }
    & code {
      font-family: 'SF Mono', 'Fira Code', monospace;
      font-size: 0.85em;
      color: #818cf8;
      background: rgba(99, 102, 241, 0.1);
      padding: 0.1em 0.35em;
      border-radius: 4px;
    }
  `,code:n`
    background: #111113;
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 10px;
    padding: 1.1rem 1.25rem;
    margin: 0.75rem 0 1.25rem;
    overflow-x: auto;
    font-family: 'SF Mono', 'Fira Code', monospace;
    font-size: 0.82rem;
    line-height: 1.75;
    color: #a1a1aa;
    & .kw {
      color: #818cf8;
    }
    & .fn {
      color: #67e8f9;
    }
    & .str {
      color: #86efac;
    }
    & .cmt {
      color: #3f3f46;
    }
    & .tag {
      color: #f9a8d4;
    }
    & .attr {
      color: #fde68a;
    }
  `},qe=n`
  height: 1px;
  background: rgba(255, 255, 255, 0.06);
  margin: 3.5rem 0;
`,Ze=n`
  padding: 0.9rem 1.1rem;
  border-radius: 8px;
  background: rgba(99, 102, 241, 0.07);
  border: 1px solid rgba(99, 102, 241, 0.18);
  color: #a1a1aa;
  font-size: 0.88rem;
  line-height: 1.7;
  margin: 1rem 0;
  & strong {
    color: #a5b4fc;
  }
  & code {
    font-family: 'SF Mono', 'Fira Code', monospace;
    font-size: 0.85em;
    color: #818cf8;
  }
`,o={page:Ve,jump:Ue,section:Ke,api:Ye,rule:qe,callout:Ze};var Qe=()=>e.createElement("div",{className:o.page.wrap},e.createElement("div",{className:o.page.hero},e.createElement("h1",{className:o.page.title},"Documentation"),e.createElement("p",{className:o.page.sub},"Dust is a minimalistic reactive UI library with no virtual DOM. Components run once \u2014 state updates flow surgically to the exact DOM nodes that depend on them."),e.createElement("nav",{className:o.jump.base},e.createElement("a",{href:"#core",className:o.jump.link},"Core concepts"),e.createElement("a",{href:"#usestate",className:o.jump.link},"useState"),e.createElement("a",{href:"#useeffect",className:o.jump.link},"useEffect"),e.createElement("a",{href:"#useref",className:o.jump.link},"useRef"),e.createElement("a",{href:"#context",className:o.jump.link},"Context"),e.createElement("a",{href:"#router",className:o.jump.link},"Router"),e.createElement("a",{href:"#jsx",className:o.jump.link},"JSX reactivity"))),e.createElement("div",{className:o.section.base,id:"core"},e.createElement("h2",{className:o.section.title},"Core concepts"),e.createElement("p",{className:o.api.desc},"In React, a state change re-renders the component and React diffs the virtual DOM to decide what to update. In Dust,"," ",e.createElement("strong",null,"there is no virtual DOM and no re-rendering"),". A component function runs exactly once. Every reactive expression in JSX subscribes directly to the state it depends on, and updates only that DOM node when the state changes."),e.createElement("div",{className:o.callout},e.createElement("strong",null,"No useMemo, no useCallback, no keys, no reconciliation.")," ","There is nothing to optimise because nothing is ever re-computed unnecessarily. State changes are O(1) \u2014 they reach only the subscribed DOM nodes."),e.createElement("p",{className:o.api.desc},"State is created with ",e.createElement("code",null,"useState"),", which returns a reactive"," ",e.createElement("strong",null,"Getter")," \u2014 a Proxy-wrapped function. Calling it (",e.createElement("code",null,"count()"),") reads the current value and, when called inside a tracked JSX expression, registers a subscription automatically.")),e.createElement("div",{className:o.rule}),e.createElement("div",{className:o.section.base,id:"usestate"},e.createElement("h2",{className:o.section.title},"useState"),e.createElement("p",{className:o.api.name},"useState<T>(initialValue)"),e.createElement("p",{className:o.api.desc},"Returns a ",e.createElement("code",null,"[getter, setter]")," tuple. The getter is a callable Proxy \u2014 ",e.createElement("code",null,"count()")," reads the value,",e.createElement("code",null,"count.__register__(fn)")," subscribes manually."),e.createElement("pre",{className:o.api.code},`const [count, setCount] = useState(0);

count()              // read current value \u2192 0
setCount(1)          // set directly
setCount(n => n + 1) // functional update`),e.createElement("p",{className:o.api.name},"Object & array state"),e.createElement("p",{className:o.api.desc},"Object properties and array items are accessed through the Proxy. Nested properties become reactive Getters automatically on first access."),e.createElement("pre",{className:o.api.code},`const [user, setUser] = useState({ name: 'Alice', age: 30 });

user.name()   // reactive Getter \u2014 updates only nodes using .name
user()        // plain snapshot \u2192 { name: 'Alice', age: 30 }

const [items, setItems] = useState(['a', 'b', 'c']);
setItems(['x', 'y']) // mutates in-place, trims length`),e.createElement("p",{className:o.api.name},"ReactiveList \u2014 items.map()"),e.createElement("p",{className:o.api.desc},"Calling ",e.createElement("code",null,".map()")," on an array Getter returns a"," ",e.createElement("strong",null,"ReactiveList")," \u2014 a live-reconciled list that adds, removes, and reorders DOM nodes by identity, without re-rendering existing items."),e.createElement("pre",{className:o.api.code},`const [notes, setNotes] = useState([]);

const noteItems = notes.map(note => (
  <li>{note.text}</li>
));

// In JSX:
<ul>{noteItems}</ul>

// Add a note \u2014 only the new <li> is inserted, nothing else re-renders:
setNotes(n => [...n, { text: 'Buy milk' }])`),e.createElement("div",{className:o.callout},e.createElement("strong",null,"No ",e.createElement("code",null,"key")," prop needed.")," Dust tracks list items by object identity \u2014 it reuses an existing DOM node when the same object reference reappears after a state update. React needs"," ",e.createElement("code",null,"key")," to do the same work during reconciliation; Dust never reconciles.")),e.createElement("div",{className:o.rule}),e.createElement("div",{className:o.section.base,id:"useeffect"},e.createElement("h2",{className:o.section.title},"useEffect"),e.createElement("p",{className:o.api.name},"useEffect(callback, deps[])"),e.createElement("p",{className:o.api.desc},"Runs the callback immediately, then re-runs it whenever any dep changes. Deps must be state Getters. Return a cleanup function to run before the next call."),e.createElement("pre",{className:o.api.code},`const [running, setRunning] = useState(false);

useEffect(() => {
  if (!running()) return;
  const id = setInterval(() => tick(), 1000);
  return () => clearInterval(id); // cleanup on next run or unmount
}, [running])`),e.createElement("div",{className:o.callout},"Unlike React, ",e.createElement("code",null,"useEffect")," in Dust does not need an exhaustive deps list to prevent stale closures \u2014 it subscribes to the Getter objects themselves, not their values at call time.")),e.createElement("div",{className:o.rule}),e.createElement("div",{className:o.section.base,id:"useref"},e.createElement("h2",{className:o.section.title},"useRef"),e.createElement("p",{className:o.api.name},"useRef<T>(initialValue)"),e.createElement("p",{className:o.api.desc},"Returns a plain ",e.createElement("code",null,"{ current: T }")," object. Assign a DOM element via the ",e.createElement("code",null,"ref")," prop and read or mutate it imperatively. Does not trigger re-renders."),e.createElement("pre",{className:o.api.code},`const inputRef = useRef<HTMLInputElement | null>(null);

// In JSX:
<input ref={inputRef} type="text" />

// Imperative access:
inputRef.current?.focus()
inputRef.current?.select()`),e.createElement("p",{className:o.api.desc},"A common pattern is using ",e.createElement("code",null,"useRef")," with"," ",e.createElement("code",null,"useEffect"),"to imperatively update a DOM node's class without a reactive expression:"),e.createElement("pre",{className:o.api.code},`const btnRef = useRef<HTMLButtonElement | null>(null);

useEffect(() => {
  if (btnRef.current)
    btnRef.current.className = cx(btn, active() ? btnActive : '');
}, [active])`)),e.createElement("div",{className:o.rule}),e.createElement("div",{className:o.section.base,id:"context"},e.createElement("h2",{className:o.section.title},"Context"),e.createElement("p",{className:o.api.name},"createContext(defaultValue)"),e.createElement("p",{className:o.api.desc},"Creates a context object with a ",e.createElement("code",null,"Provider")," component. The default value is used when no Provider is above the consumer in the tree. Pass a state Getter as the default value to make it reactive everywhere."),e.createElement("pre",{className:o.api.code},`const [theme, setTheme] = useState('dark');
const ThemeCtx = createContext(theme); // Getter as default \u2192 always reactive`),e.createElement("p",{className:o.api.name},"useContext(ctx)"),e.createElement("p",{className:o.api.desc},"Reads the nearest Provider value, or the context's default value. If the value is a state Getter, calling it in JSX is reactive as usual."),e.createElement("pre",{className:o.api.code},`function ThemedButton() {
  const theme = useContext(ThemeCtx); // returns the Getter

  return (
    <button className={theme() === 'dark' ? darkBtn : lightBtn}>
      Click me
    </button>
  );
}

// Wrap in a Provider to override:
<ThemeCtx.Provider value={theme}>
  <ThemedButton />
</ThemeCtx.Provider>`)),e.createElement("div",{className:o.rule}),e.createElement("div",{className:o.section.base,id:"router"},e.createElement("h2",{className:o.section.title},"Router"),e.createElement("p",{className:o.api.name},"useParams()"),e.createElement("p",{className:o.api.desc},"Returns the current route params as a plain object. Access individual params as reactive Getters via the Proxy:"),e.createElement("pre",{className:o.api.code},`// Route: /blog/:id
const { id } = useParams();  // plain string, read once
useParams.id()               // reactive Getter \u2014 updates when route changes`),e.createElement("p",{className:o.api.name},"BrowserRouter + Route"),e.createElement("p",{className:o.api.desc},"Declarative routing. Supports static paths, dynamic segments, index routes, and redirects."),e.createElement("pre",{className:o.api.code},`<BrowserRouter>
  <Route path="/"        component={Home}  index />
  <Route path="/docs"    component={Docs} />
  <Route path="/blog/:id" component={Post} />
  <Route path="/old"     redirect="/new" />
</BrowserRouter>`),e.createElement("p",{className:o.api.name},"DirectoryRouter"),e.createElement("p",{className:o.api.desc},"File-system routing. Drop ",e.createElement("code",null,"<DirectoryRouter />")," in your app and the dev server automatically discovers pages in"," ",e.createElement("code",null,"src/pages/"),"and registers their routes. A page at"," ",e.createElement("code",null,"src/pages/blog/:id/index.tsx"),"maps to ",e.createElement("code",null,"/blog/:id"),"."),e.createElement("pre",{className:o.api.code},`// App.tsx
<DirectoryRouter />

// src/pages/ layout \u2192 routes
// pages/index/index.tsx   \u2192 /
// pages/docs/index.tsx    \u2192 /docs
// pages/blog/:id/index.tsx \u2192 /blog/:id`)),e.createElement("div",{className:o.rule}),e.createElement("div",{className:o.section.base,id:"jsx"},e.createElement("h2",{className:o.section.title},"JSX reactivity"),e.createElement("p",{className:o.api.desc},"Dust's Babel plugin (",e.createElement("code",null,"jsx-getter-consumer"),") automatically wraps reactive expressions in JSX children so ",e.createElement("code",null,"mountChild")," ","can track their dependencies. Write bare Getters everywhere in JSX \u2014 no need to call them."),e.createElement("pre",{className:o.api.code},`// What you write:
<p>{count}</p>
<p>{running ? '\u23F8 Pause' : '\u25B6 Start'}</p>
<p>{name || 'Anonymous'}</p>

// What the plugin emits (roughly):
<p>{() => count}</p>
<p>{() => Dust.call(running) ? '\u23F8 Pause' : '\u25B6 Start'}</p>
<p>{() => Dust.call(name) || 'Anonymous'}</p>`),e.createElement("p",{className:o.api.desc},e.createElement("code",null,"Dust.call(getter)")," auto-unwraps a Getter inside expression positions (conditionals, logical operators, binary/unary expressions) so the actual value is used as the truthy/falsy operand. Plain values pass through unchanged."),e.createElement("div",{className:o.callout},e.createElement("strong",null,"One exception:")," when passing a Getter's value as an argument to a regular function, call it explicitly \u2014"," ",e.createElement("code",null,"fmt(elapsed())")," \u2014 because the plugin can't know the function expects a number, not the Getter object."),e.createElement("div",{className:o.callout},e.createElement("strong",null,"Rule:")," expressions in JSX children that call or reference state are wrapped automatically. Expressions in"," ",e.createElement("strong",null,"props")," are not wrapped \u2014 use ",e.createElement("code",null,"useEffect")," +"," ",e.createElement("code",null,"useRef")," to imperatively update a prop that depends on state."))),we=Qe;var ve=[{icon:"\u26A1",name:"useState",desc:"Proxy-based reactive state. Only the exact DOM nodes that read a getter update \u2014 zero diffing, zero re-renders."},{icon:"\u{1F501}",name:"useEffect",desc:"Dependency-aware side effects with cleanup. Perfect for timers, subscriptions, and DOM measurements."},{icon:"\u{1F4CC}",name:"useRef",desc:"Stable mutable refs. Pass ref={r} to any element \u2014 current is set after mount, usable forever."},{icon:"\u{1F310}",name:"createContext",desc:"Stack-based Provider/consumer. No prop drilling, no wrappers, no wasted renders."},{icon:"\u{1F4CB}",name:"ReactiveList",desc:"Identity-based DOM reconciliation via items.map(). Moves, inserts, and deletes map directly to minimal DOM ops."},{icon:"\u{1F3A8}",name:"css / cx",desc:"Tagged-template CSS-in-JS. Hashed, deduplicated, injected once. Native CSS nesting. Zero runtime overhead."}];var et={wrap:n`
    max-width: 860px;
    margin: 0 auto;
    padding: 7rem 2rem 4rem;
    text-align: center;
  `,badge:n`
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.4rem 1rem;
    border-radius: 9999px;
    border: 1px solid rgba(129, 140, 248, 0.45);
    background: rgba(129, 140, 248, 0.1);
    color: #a5b4fc;
    font-size: 0.82rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-bottom: 2rem;
  `,headline:n`
    font-size: clamp(2.5rem, 6vw, 4.5rem);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.03em;
    color: #f4f4f5;
    margin-bottom: 1.5rem;
    & strong {
      background: linear-gradient(135deg, #818cf8, #6366f1);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  `,sub:n`
    font-size: 1.15rem;
    color: #71717a;
    max-width: 560px;
    margin: 0 auto 2.5rem;
    line-height: 1.7;
    & strong {
      color: #f4f4f5;
      font-style: normal;
    }
    & em {
      color: #a1a1aa;
      font-weight: 600;
      font-style: normal;
    }
    & span {
      color: #f4f4f5;
      font-weight: 400;
    }
  `},tt={row:n`
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  `,primary:n`
    display: inline-flex;
    align-items: center;
    padding: 0.7rem 1.5rem;
    border-radius: 8px;
    background: #6366f1;
    color: #fff;
    font-size: 0.9rem;
    font-weight: 600;
    text-decoration: none;
    transition:
      background 0.15s,
      transform 0.1s;
    &:hover {
      background: #818cf8;
      transform: translateY(-1px);
    }
    &:active {
      transform: translateY(0);
    }
  `,ghost:n`
    display: inline-flex;
    align-items: center;
    padding: 0.7rem 1.5rem;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: #a1a1aa;
    font-size: 0.9rem;
    font-weight: 600;
    text-decoration: none;
    transition:
      border-color 0.15s,
      color 0.15s,
      transform 0.1s;
    &:hover {
      border-color: rgba(255, 255, 255, 0.25);
      color: #f4f4f5;
      transform: translateY(-1px);
    }
  `},rt={wrap:n`
    max-width: 640px;
    margin: 0 auto 5rem;
    padding: 2rem;
    border-radius: 16px;
    background: #18181b;
    border: 1px solid rgba(255, 255, 255, 0.08);
  `,eyebrow:n`
    font-size: 0.78rem;
    font-weight: 500;
    color: #818cf8;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    margin-bottom: 1.25rem;
  `,input:n`
    width: 100%;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.04);
    color: #f4f4f5;
    font-size: 1rem;
    font-family: inherit;
    outline: none;
    transition: border-color 0.15s;
    &:focus {
      border-color: #6366f1;
    }
    &::placeholder {
      color: #52525b;
    }
  `,output:n`
    margin-top: 1rem;
    padding: 1rem;
    border-radius: 8px;
    background: rgba(99, 102, 241, 0.06);
    border: 1px solid rgba(99, 102, 241, 0.15);
    color: #a1a1aa;
    font-size: 0.95rem;
    min-height: 3rem;
    display: flex;
    align-items: center;
    & strong {
      color: #818cf8;
      margin: 0 0.2em;
    }
  `},nt={wrap:n`
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 2rem 6rem;
  `,title:n`
    font-size: 1.75rem;
    font-weight: 700;
    color: #f4f4f5;
    letter-spacing: -0.02em;
    margin-bottom: 2.5rem;
    text-align: center;
  `},at={grid:n`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.25rem;
  `,base:n`
    padding: 1.75rem;
    border-radius: 12px;
    background: #18181b;
    border: 1px solid rgba(255, 255, 255, 0.07);
    transition:
      border-color 0.2s,
      transform 0.2s;
    &:hover {
      border-color: rgba(129, 140, 248, 0.3);
      transform: translateY(-2px);
    }
  `,icon:n`
    display: block;
    font-size: 1.75rem;
    margin-bottom: 0.75rem;
  `,name:n`
    display: block;
    font-size: 0.95rem;
    font-weight: 600;
    color: #818cf8;
    margin-bottom: 0.5rem;
    font-family: 'SF Mono', 'Fira Code', 'Fira Mono', monospace;
  `,desc:n`
    font-size: 0.875rem;
    color: #71717a;
    line-height: 1.65;
  `},x={hero:et,cta:tt,demo:rt,section:nt,card:at};var ot=()=>{let[r,t]=y(""),[a]=y(ve),c=i=>t(i.target.value);return e.createElement(e.Fragment,null,e.createElement("div",{className:x.hero.wrap},e.createElement("div",{className:x.hero.badge},"\u2726 Reactive UIs, built differently."),e.createElement("h1",{className:x.hero.headline},"Zero re-renders,",e.createElement("br",null),e.createElement("strong",null,"by design"),"."),e.createElement("p",{className:x.hero.sub},e.createElement("strong",null,"No virtual DOM.")," ",e.createElement("strong",null,"No diffing.")," ",e.createElement("strong",null,"No wasted renders.")," ",e.createElement("strong",null,"No rerender management.")," Components run once \u2014 state updates flow directly to the ",e.createElement("em",null,"exact DOM nodes")," that depend on them."," ",e.createElement("strong",null,"No useMemo, no useCallback, no fighting the runtime.")),e.createElement("div",{className:x.cta.row},e.createElement("a",{href:R("/playground"),className:x.cta.primary},"Try the playground \u2192"),e.createElement("a",{href:R("/docs"),className:x.cta.ghost},"Read the docs"))),e.createElement("div",{className:x.demo.wrap},e.createElement("p",{className:x.demo.eyebrow},"\u26A1 Live useState demo \u2014 type below"),e.createElement("input",{className:x.demo.input,type:"text",placeholder:"What's your name?",onInput:c}),e.createElement("p",{className:x.demo.output},()=>e.call(r)?e.createElement(e.Fragment,null,"Hello, ",e.createElement("strong",null,()=>r),"! Welcome to Dust."):"Your greeting appears here, reactively.")),e.createElement("div",{className:x.section.wrap},e.createElement("h2",{className:x.section.title},"Everything you need, nothing you don't"),e.createElement("div",{className:x.card.grid},a.map(i=>e.createElement("div",{className:x.card.base},e.createElement("span",{className:x.card.icon},()=>i.icon),e.createElement("code",{className:x.card.name},()=>i.name),e.createElement("p",{className:x.card.desc},()=>i.desc))))))},Ne=ot;var st={wrap:n`
    max-width: 1100px;
    margin: 0 auto;
    padding: 4rem 2rem 6rem;
  `,title:n`
    font-size: 2.25rem;
    font-weight: 800;
    color: #f4f4f5;
    letter-spacing: -0.03em;
    margin-bottom: 0.35rem;
  `,sub:n`
    color: #71717a;
    font-size: 1rem;
    margin-bottom: 3rem;
  `},ct={grid:n`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(460px, 1fr));
    gap: 1.5rem;
  `,card:n`
    padding: 2rem;
    border-radius: 16px;
    background: #18181b;
    border: 1px solid rgba(255, 255, 255, 0.08);
  `,label:n`
    font-size: 0.68rem;
    font-weight: 600;
    color: #818cf8;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 0.3rem;
    font-family: 'SF Mono', 'Fira Code', monospace;
  `,heading:n`
    font-size: 1.15rem;
    font-weight: 700;
    color: #f4f4f5;
    margin-bottom: 1.5rem;
    letter-spacing: -0.01em;
  `,rule:n`
    height: 1px;
    background: rgba(255, 255, 255, 0.06);
    margin: 1.25rem 0;
  `,hint:n`
    font-size: 0.75rem;
    color: #3f3f46;
    font-family: 'SF Mono', 'Fira Code', monospace;
  `},it={display:n`
    font-size: 3rem;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.03em;
    color: #f4f4f5;
    font-family: 'SF Mono', 'Fira Code', monospace;
    margin-bottom: 1.5rem;
    text-align: center;
  `,btnRow:n`
    display: flex;
    gap: 0.75rem;
    justify-content: center;
  `,btn:n`
    padding: 0 1.4rem;
    min-width: 7.5rem;
    height: 2.25rem;
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    border: none;
    transition:
      opacity 0.15s,
      transform 0.1s;
    &:hover {
      opacity: 0.8;
      transform: translateY(-1px);
    }
    &:active {
      transform: translateY(0);
    }
  `,green:n`
    background: rgba(74, 222, 128, 0.15);
    color: #4ade80;
    border: 1px solid rgba(74, 222, 128, 0.3) !important;
  `,red:n`
    background: rgba(248, 113, 113, 0.15);
    color: #f87171;
    border: 1px solid rgba(248, 113, 113, 0.3) !important;
  `,ghost:n`
    background: rgba(255, 255, 255, 0.05);
    color: #71717a;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
  `},lt={inputRow:n`
    display: flex;
    gap: 0.6rem;
    margin-bottom: 0.75rem;
  `,input:n`
    flex: 1;
    padding: 0.6rem 0.9rem;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.04);
    color: #f4f4f5;
    font-size: 0.9rem;
    font-family: inherit;
    outline: none;
    transition: border-color 0.15s;
    &:focus {
      border-color: #6366f1;
    }
    &::placeholder {
      color: #52525b;
    }
  `,addBtn:n`
    padding: 0.6rem 1rem;
    border-radius: 8px;
    background: #6366f1;
    color: #fff;
    font-size: 0.875rem;
    font-weight: 600;
    font-family: inherit;
    border: none;
    cursor: pointer;
    transition: background 0.15s;
    &:hover {
      background: #818cf8;
    }
  `,listWrap:n`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    min-height: 2rem;
  `,item:n`
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.55rem 0.75rem;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.06);
  `,dot:n`
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 1.5px solid #52525b;
    background: transparent;
    color: #4ade80;
    font-size: 0.7rem;
    font-weight: 700;
    cursor: pointer;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: inherit;
    transition:
      border-color 0.15s,
      background 0.15s;
    &:hover {
      border-color: #4ade80;
    }
  `,dotDone:n`
    border-color: #4ade80;
    background: rgba(74, 222, 128, 0.12);
  `,text:n`
    flex: 1;
    font-size: 0.875rem;
    color: #a1a1aa;
    & s {
      color: #52525b;
    }
  `,delBtn:n`
    width: 22px;
    height: 22px;
    border-radius: 4px;
    border: none;
    background: transparent;
    color: #3f3f46;
    font-size: 0.8rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: inherit;
    transition:
      color 0.15s,
      background 0.15s;
    &:hover {
      color: #f87171;
      background: rgba(248, 113, 113, 0.1);
    }
  `,empty:n`
    color: #3f3f46;
    font-size: 0.875rem;
    text-align: center;
    padding: 0.75rem 0;
  `},mt={input:n`
    width: 100%;
    padding: 0.6rem 0.9rem;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.04);
    color: #f4f4f5;
    font-size: 0.9rem;
    font-family: inherit;
    outline: none;
    margin-bottom: 1rem;
    transition: border-color 0.15s;
    &:focus {
      border-color: #6366f1;
    }
    &::placeholder {
      color: #52525b;
    }
  `,output:n`
    padding: 0.85rem 1.1rem;
    border-radius: 10px;
    background: rgba(99, 102, 241, 0.07);
    border: 1px solid rgba(99, 102, 241, 0.18);
    color: #a1a1aa;
    font-size: 0.95rem;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
    & strong {
      color: #818cf8;
    }
  `,badge:n`
    margin-left: auto;
    font-size: 0.68rem;
    font-weight: 500;
    color: #52525b;
    font-family: 'SF Mono', 'Fira Code', monospace;
    background: rgba(255, 255, 255, 0.04);
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
  `},dt={textarea:n`
    width: 100%;
    padding: 0.75rem 0.9rem;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.04);
    color: #f4f4f5;
    font-size: 0.9rem;
    font-family: inherit;
    outline: none;
    resize: vertical;
    min-height: 80px;
    transition: border-color 0.15s;
    &:focus {
      border-color: #6366f1;
    }
    &::placeholder {
      color: #52525b;
    }
  `,meta:n`
    margin: 0.6rem 0 1rem;
    font-size: 0.8rem;
    color: #52525b;
    font-family: 'SF Mono', 'Fira Code', monospace;
    & span {
      color: #818cf8;
    }
  `,btnRow:n`
    display: flex;
    gap: 0.6rem;
    margin-bottom: 1.25rem;
  `,btn:n`
    padding: 0.45rem 0.9rem;
    border-radius: 7px;
    font-size: 0.8rem;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.04);
    color: #71717a;
    transition: all 0.15s;
    &:hover {
      color: #f4f4f5;
      border-color: rgba(255, 255, 255, 0.2);
    }
  `},ut={btnRow:n`
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-top: 0.5rem;
  `,btn:n`
    padding: 0.38rem 0.85rem;
    border-radius: 6px;
    font-size: 0.8rem;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: transparent;
    color: #52525b;
    transition: all 0.15s;
    &:hover {
      color: #a1a1aa;
    }
  `,active:n`
    background: rgba(99, 102, 241, 0.15);
    border-color: rgba(99, 102, 241, 0.4);
    color: #818cf8;
  `,preview:n`
    margin-top: 0.75rem;
    padding: 0.65rem 0.9rem;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.07);
    background: rgba(255, 255, 255, 0.02);
    font-size: 0.9rem;
    color: #a1a1aa;
    min-height: 2.5rem;
    display: flex;
    align-items: center;
  `,bold:n`
    font-weight: 700;
    color: #f4f4f5;
  `,italic:n`
    font-style: italic;
    color: #818cf8;
  `,large:n`
    font-size: 1.15rem;
    letter-spacing: 0.03em;
    color: #a5b4fc;
  `},s={page:st,card:ct,stopwatch:it,note:lt,context:mt,ref:dt,mode:ut};var[ke,pt]=y("Dust"),Re=q(ke),ft=()=>{let r=Z(Re);return e.createElement("div",{className:s.context.output},e.createElement("span",null,"\u{1F44B} Hello, ",e.createElement("strong",null,()=>e.call(r)||"Dust"),"!"),e.createElement("span",{className:s.context.badge},"useContext"))},gt=()=>{let[r,t]=y(!1),[a,c]=y(0),i=k(null);M(()=>{if(!r())return;let f=setInterval(()=>c(v=>v+10),10);return()=>clearInterval(f)},[r]),M(()=>{i.current&&(i.current.className=N(s.stopwatch.btn,r()?s.stopwatch.red:s.stopwatch.green))},[r]);let l=f=>{let v=String(Math.floor(f/6e4)).padStart(2,"0"),O=String(Math.floor(f%6e4/1e3)).padStart(2,"0"),P=String(Math.floor(f%1e3/10)).padStart(2,"0");return`${v}:${O}.${P}`},[d,m]=y([]),[u,p]=y(""),h=k(null),b=()=>{let f=u().trim();f&&(m(v=>[...v,{id:Date.now(),text:f}]),p(""),h.current&&(h.current.value=""))},g=d.map(f=>{let[v,O]=y(!1),P=k(null);return M(()=>{P.current&&(P.current.className=N(s.note.dot,v()&&s.note.dotDone))},[v]),e.createElement("div",{className:s.note.item},e.createElement("button",{ref:P,className:s.note.dot,onClick:()=>O(V=>!V)},()=>v()?"\u2713":""),e.createElement("span",{className:s.note.text},()=>v()?e.createElement("s",null,()=>f.text):f.text),e.createElement("button",{className:s.note.delBtn,onClick:()=>m(V=>V.filter(Pe=>Pe!==f))},"\u2715"))}),E=k(null),[j,B]=y(0),[T,L]=y("default"),J=k(null),oe=k(null),se=k(null),ce=k(null),ie=k(null);return M(()=>{J.current&&(J.current.className=N(s.mode.preview,T()==="bold"&&s.mode.bold,T()==="italic"&&s.mode.italic,T()==="large"&&s.mode.large));let f=[oe,se,ce,ie],v=["default","bold","italic","large"];f.forEach((O,P)=>{O.current&&(O.current.className=N(s.mode.btn,T()===v[P]&&s.mode.active))})},[T]),e.createElement("div",{className:s.page.wrap},e.createElement("h1",{className:s.page.title},"Playground"),e.createElement("p",{className:s.page.sub},"Interactive demos of every Dust primitive."),e.createElement("div",{className:s.card.grid},e.createElement("div",{className:s.card.card},e.createElement("p",{className:s.card.label},"useState \xB7 useEffect \xB7 cx"),e.createElement("p",{className:s.card.heading},"Stopwatch"),e.createElement("div",{className:s.stopwatch.display},()=>l(a())),e.createElement("div",{className:s.stopwatch.btnRow},e.createElement("button",{ref:i,className:N(s.stopwatch.btn,s.stopwatch.green),onClick:()=>t(f=>!f)},()=>r()?"\u23F8 Pause":"\u25B6 Start"),e.createElement("button",{className:N(s.stopwatch.btn,s.stopwatch.ghost),onClick:()=>{t(!1),c(0)}},"\u21BA Reset")),e.createElement("div",{className:s.card.rule}),e.createElement("p",{className:s.card.hint},"useEffect clears interval on cleanup. cx() swaps class via useRef.")),e.createElement("div",{className:s.card.card},e.createElement("p",{className:s.card.label},"ReactiveList \xB7 useState per item"),e.createElement("p",{className:s.card.heading},"Notes"),e.createElement("div",{className:s.note.inputRow},e.createElement("input",{ref:h,className:s.note.input,type:"text",placeholder:"Add a note\u2026",onInput:f=>p(f.target.value),onKeyDown:f=>{f.key==="Enter"&&b()}}),e.createElement("button",{className:s.note.addBtn,onClick:b},"Add")),e.createElement("div",{className:s.note.listWrap},()=>g,()=>!d().length&&e.createElement("p",{className:s.note.empty},"No notes yet.")),e.createElement("div",{className:s.card.rule}),e.createElement("p",{className:s.card.hint},"notes.map() \u2192 ReactiveList. Each item has its own useState.")),e.createElement("div",{className:s.card.card},e.createElement("p",{className:s.card.label},"createContext \xB7 useContext"),e.createElement("p",{className:s.card.heading},"Context"),e.createElement(Re.Provider,{value:ke},e.createElement("input",{className:s.context.input,type:"text",placeholder:"Enter a name\u2026",onInput:f=>pt(f.target.value)}),e.createElement(ft,null)),e.createElement("div",{className:s.card.rule}),e.createElement("p",{className:s.card.hint},"GreetingDisplay reads GreetCtx via useContext \u2014 no prop drilling.")),e.createElement("div",{className:s.card.card},e.createElement("p",{className:s.card.label},"useRef \xB7 cx \xB7 useEffect"),e.createElement("p",{className:s.card.heading},"Refs & Dynamic Classes"),e.createElement("textarea",{ref:E,className:s.ref.textarea,placeholder:"Type something\u2026",onInput:f=>B(f.target.value.length)}),e.createElement("p",{className:s.ref.meta},"chars: ",e.createElement("span",null,()=>j)),e.createElement("div",{className:s.ref.btnRow},e.createElement("button",{className:s.ref.btn,onClick:()=>E.current&&E.current.focus()},"Focus"),e.createElement("button",{className:s.ref.btn,onClick:()=>E.current&&E.current.select()},"Select all"),e.createElement("button",{className:s.ref.btn,onClick:()=>{E.current&&(E.current.value="",B(0))}},"Clear")),e.createElement("div",{className:s.card.rule}),e.createElement("p",{className:s.card.hint,style:"margin-bottom:0.6rem"},"cx() joins truthy classes, applied via useEffect + useRef:"),e.createElement("div",{className:s.mode.btnRow},e.createElement("button",{ref:oe,className:N(s.mode.btn,s.mode.active),onClick:()=>L("default")},"Default"),e.createElement("button",{ref:se,className:s.mode.btn,onClick:()=>L("bold")},"Bold"),e.createElement("button",{ref:ce,className:s.mode.btn,onClick:()=>L("italic")},"Italic"),e.createElement("button",{ref:ie,className:s.mode.btn,onClick:()=>L("large")},"Large")),e.createElement("div",{ref:J,className:s.mode.preview},"The quick brown fox jumps over the lazy dog."))))},Se=gt;var Ce={1:{title:"Why Dust runs components once",lead:"Traditional frameworks re-render components whenever state changes. Dust takes a different path: your component function runs exactly once, and reactive primitives handle all future DOM updates.",sections:[{heading:"The problem with re-renders",body:"Every time state changes in React, the entire component tree re-evaluates. Even with memoization and diffing, you're fighting the framework to avoid unnecessary work. Dust eliminates the problem at the root."},{heading:"How Dust works instead",body:"When you call useState(), you get a Proxy-wrapped getter. When that getter is read inside a reactive context (a JSX child wrapped in () => ...), Dust records the dependency. When state changes, only that exact DOM text node or subtree updates \u2014 nothing else."},{heading:"Zero diffing, zero VDOM",body:"There's no virtual DOM, no reconciliation algorithm, and no fiber scheduler. State change \u2192 subscriber callback \u2192 DOM mutation. Three steps. Direct. Fast."}]},2:{title:"Reactive state without a virtual DOM",lead:"Dust's useState returns a Proxy-wrapped function. Reading it registers a subscription. Writing it fires all subscribers. No VDOM layer in between \u2014 state flows directly to DOM nodes.",sections:[{heading:"Proxies as reactive primitives",body:"The getter returned by useState is a Proxy. Accessing .someProperty on it creates a derived reactive value for that property path. This enables patterns like user.name directly in JSX without any special compiler magic beyond the jsx-getter-consumer plugin."},{heading:"Subscriptions are surgical",body:"Each reactive DOM location \u2014 a text node, an attribute, a child subtree \u2014 independently subscribes to exactly the state it reads. A counter changing doesn't touch your nav, your header, or anything else on the page."},{heading:"useEffect integrates naturally",body:"Effects receive the same getter-based dep array. When a dep changes, the cleanup runs, then the effect re-runs. It's the same subscription model, applied to side effects instead of DOM nodes."}]},3:{title:"CSS-in-JS that costs nothing at runtime",lead:"The css tagged template hashes its content, injects the class once into a <style> tag, and returns the class name. Deduplication is automatic. Nesting is native CSS. Runtime cost is a Set lookup.",sections:[{heading:"How the css tag works",body:"css`color: red` computes a hash of the template string, checks a Set for duplicates, appends .dXXXXXX { color: red } to a shared <style> element, and returns the class name string. After the first call, subsequent calls with the same styles are a no-op."},{heading:"Native CSS nesting",body:"Because the output is real CSS injected into a <style> tag, you can use any modern CSS syntax including nesting with &, container queries, and :has(). No PostCSS required \u2014 the browser handles it natively."},{heading:"cx for conditional classes",body:"cx(base, isActive && activeClass, isFocused && focusClass) filters falsy values and joins with a space. Pair it with useRef + useEffect to update className imperatively when reactive state changes."}]}};var ht={outer:n`
    max-width: 720px;
    margin: 0 auto;
    padding: 4rem 2rem 6rem;
  `,meta:n`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.75rem;
  `,tag:n`
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #818cf8;
    background: rgba(129, 140, 248, 0.1);
    border: 1px solid rgba(129, 140, 248, 0.2);
    padding: 0.2rem 0.6rem;
    border-radius: 4px;
  `,id:n`
    font-size: 0.8rem;
    color: #52525b;
    font-family: 'SF Mono', 'Fira Code', monospace;
  `,title:n`
    font-size: clamp(1.75rem, 4vw, 2.75rem);
    font-weight: 800;
    color: #f4f4f5;
    letter-spacing: -0.03em;
    line-height: 1.2;
    margin-bottom: 1rem;
  `,lead:n`
    font-size: 1.1rem;
    color: #71717a;
    line-height: 1.75;
    margin-bottom: 2.5rem;
    padding-bottom: 2.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  `,body:n`
    color: #a1a1aa;
    line-height: 1.8;
    font-size: 1rem;
  `,section:n`
    margin-bottom: 2rem;
    & h2 {
      font-size: 1.25rem;
      font-weight: 700;
      color: #f4f4f5;
      margin-bottom: 0.75rem;
      letter-spacing: -0.01em;
    }
    & p {
      margin-bottom: 1rem;
    }
    & code {
      font-family: 'SF Mono', 'Fira Code', monospace;
      font-size: 0.85em;
      background: rgba(255, 255, 255, 0.06);
      padding: 0.15em 0.4em;
      border-radius: 4px;
      color: #818cf8;
    }
  `},bt={row:n`
    display: flex;
    gap: 1rem;
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.07);
  `,link:n`
    display: inline-flex;
    align-items: center;
    padding: 0.6rem 1.2rem;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #71717a;
    font-size: 0.875rem;
    font-weight: 500;
    text-decoration: none;
    transition:
      border-color 0.15s,
      color 0.15s;
    &:hover {
      border-color: rgba(255, 255, 255, 0.2);
      color: #f4f4f5;
    }
  `,next:n`
    margin-left: auto;
  `},w={article:ht,nav:bt};var xt=()=>{let{id:r}=xe(),t=Ce[r]??{title:`Post #${r}`,lead:"This post is coming soon.",sections:[]},a=Math.max(1,parseInt(r,10)-1),c=parseInt(r,10)+1,[i]=y(t.sections);return e.createElement("article",{className:w.article.outer},e.createElement("div",{className:w.article.meta},e.createElement("span",{className:w.article.tag},"Blog"),e.createElement("span",{className:w.article.id},"post #",()=>r)),e.createElement("h1",{className:w.article.title},()=>t.title),e.createElement("p",{className:w.article.lead},()=>t.lead),e.createElement("div",{className:w.article.body},i.map(l=>e.createElement("div",{className:w.article.section},e.createElement("h2",null,()=>l.heading),e.createElement("p",null,()=>l.body)))),e.createElement("div",{className:w.nav.row},e.createElement("a",{href:R(`/blog/${a}`),className:w.nav.link},"\u2190 Previous"),e.createElement("a",{href:R(`/blog/${c}`),className:N(w.nav.link,w.nav.next)},"Next \u2192")))},De=xt;var yt=()=>e.createElement("nav",{className:C.nav.base},e.createElement("a",{href:R("/"),className:C.nav.logo},"\u26A1 dust"),e.createElement("a",{href:R("/"),className:C.nav.link},"Home"),e.createElement("a",{href:R("/docs"),className:C.nav.link},"Docs"),e.createElement("a",{href:R("/playground"),className:C.nav.link},"Playground"),e.createElement("a",{href:R("/blog/1"),className:C.nav.link},"Blog"),e.createElement("a",{href:"/dust/benchmark/",className:C.nav.link},"Benchmark")),Et=()=>e.createElement(e.Fragment,null,e.createElement(yt,null),e.createElement("div",{className:C.page.wrap},e.createElement(ae,null,e.createElement(F,{path:"/",component:Ne}),e.createElement(F,{path:"/docs",component:we}),e.createElement(F,{path:"/playground",component:Se}),e.createElement(F,{path:"/blog/:id",component:De})))),Te=Et;pe("/dust");var wt=Q(document.getElementById("root"));wt.render(e.createElement(Te,null));})();
