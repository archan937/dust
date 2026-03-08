import Dust, { BrowserRouter, Route } from 'dust';

import Home from './pages/home';
import Playground from './pages/playground';
import Post from './pages/post';
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
        <BrowserRouter>
          <Route path="/" component={Home} />
          <Route path="/playground" component={Playground} />
          <Route path="/blog/:id" component={Post} />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
