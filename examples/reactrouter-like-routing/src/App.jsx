import Dust, { BrowserRouter, Route } from 'dust';

import AboutMe from './pages/AboutMe';
import BlogArticle from './pages/BlogArticle';
import Home from './pages/Home';

function App() {
  console.log('Rendering <App />');

  return (
    <>
      <nav>
        <a href="/">Home</a>
        <a href="/about">About Me</a>
        <a href="/blog/3">Blog Article #3</a>
        <a href="/blog/42">Blog Article #42</a>
      </nav>
      <div id="root">
        <BrowserRouter>
          <Route path="/" component={Home} />
          <Route path="/about" component={AboutMe} />
          <Route path="/blog/:id" component={BlogArticle} />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
