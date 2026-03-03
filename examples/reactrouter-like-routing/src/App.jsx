import Dust, { useState, useEffect } from 'dust';

import CounterPage from './pages/CounterPage';
import TodoPage from './pages/TodoPage';
import ProfilePage from './pages/ProfilePage';
import TimerPage from './pages/TimerPage';

const ROUTES = {
  '/':        CounterPage,
  '/todo':    TodoPage,
  '/profile': ProfilePage,
  '/timer':   TimerPage,
};

const NAV = [
  ['/',        'Counter'],
  ['/todo',    'Todos'],
  ['/profile', 'Profile'],
  ['/timer',   'Timer'],
];

export default function App() {
  const getHash = () => window.location.hash.slice(1) || '/';
  const [route, setRoute] = useState(getHash());

  window.addEventListener('hashchange', () => setRoute(getHash()));

  // Build nav links and keep a reference to each anchor element
  // so useEffect can toggle the .active class reactively.
  const navEl = <nav />;
  const links = NAV.map(([path, label]) => {
    const a = <a href={`#${path}`}>{label}</a>;
    navEl.appendChild(a);
    return { path, a };
  });

  useEffect(() => {
    const current = route();
    links.forEach(({ path, a }) => {
      a.className = path === current ? 'active' : '';
    });
  }, [route]);

  // Swap page content on route change.
  const pageEl = <main />;

  useEffect(() => {
    pageEl.innerHTML = '';
    const Page = ROUTES[route()] ?? ROUTES['/'];
    pageEl.appendChild(Page());
  }, [route]);

  return (
    <>
      <header>
        <div className="logo">Dust <span>reactive UI</span></div>
        {navEl}
      </header>
      {pageEl}
    </>
  );
}
