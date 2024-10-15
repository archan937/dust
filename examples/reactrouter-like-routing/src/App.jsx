import Dust, { BrowserRouter, Route } from "dust";

import AboutMe from "./pages/AboutMe";
import BlogArticle from "./pages/BlogArticle";
import Home from "./pages/Home";

function App() {
  console.log("Rendering <App/> using BrowserRouter");

  return (
    <>
      <a href="/browser" style="padding-right: 15px">
        Home
      </a>
      <a href="/blog/3" style="padding-right: 15px">
        Blog Article 3
      </a>
      <a href="/blog/4" style="padding-right: 15px">
        Blog Article 4
      </a>
      <a href="/browser/about-me" style="padding-right: 15px">
        About Me
      </a>
      <BrowserRouter>
        <Route index redirect="browser" />
        <Route path="/blog/:id" component={BlogArticle} />
        <Route path="browser">
          <Route index component={Home} />
          <Route path="about-me" component={AboutMe} />
        </Route>
      </BrowserRouter>
    </>
  );
}

export default App;
