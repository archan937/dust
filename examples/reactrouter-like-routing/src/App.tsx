import Dust, { BrowserRouter, Route } from 'dust';

import s from './App.styles';
import Docs from './pages/docs';
import Home from './pages/home';
import Playground from './pages/playground';
import Post from './pages/post';

const Nav = (): JSX.Element => (
  <nav className={s.nav.base}>
    <a href="/" className={s.nav.logo}>
      ⚡ dust
    </a>
    <a href="/" className={s.nav.link}>
      Home
    </a>
    <a href="/docs" className={s.nav.link}>
      Docs
    </a>
    <a href="/playground" className={s.nav.link}>
      Playground
    </a>
    <a href="/blog/1" className={s.nav.link}>
      Blog
    </a>
  </nav>
);

const App = (): JSX.Element => (
  <>
    <Nav />
    <div className={s.page.wrap}>
      <BrowserRouter>
        <Route path="/" component={Home} />
        <Route path="/docs" component={Docs} />
        <Route path="/playground" component={Playground} />
        <Route path="/blog/:id" component={Post} />
      </BrowserRouter>
    </div>
  </>
);

export default App;
