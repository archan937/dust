import Dust, { DirectoryRouter } from 'dust';

import { nav, navLogo, navLink, pageWrap } from './App.styles';

function Nav() {
  return (
    <nav className={nav}>
      <a href="/" className={navLogo}>
        ⚡ dust
      </a>
      <a href="/" className={navLink}>
        Home
      </a>
      <a href="/playground" className={navLink}>
        Playground
      </a>
      <a href="/blog/1" className={navLink}>
        Blog
      </a>
    </nav>
  );
}

function App() {
  return (
    <>
      <Nav />
      <div className={pageWrap}>
        <DirectoryRouter pages="./pages" />
      </div>
    </>
  );
}

export default App;
