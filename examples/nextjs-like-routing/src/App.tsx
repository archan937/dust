import Dust, { DirectoryRouter } from 'dust';

import s from './App.styles';

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
      <DirectoryRouter pages="./pages" />
    </div>
  </>
);

export default App;
