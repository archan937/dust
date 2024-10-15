import Dust, { DirectoryRouter } from "dust";

function App() {
  console.log("Rendering <App/> using <DirectoryRouter/>");

  return (
    <>
      <a href="/dust" style="padding-right: 15px">
        Home
      </a>
      <a href="/dust/docs/routing" style="padding-right: 15px">
        Routing Docs
      </a>
      <a href="/dust/blog/3" style="padding-right: 15px">
        Blog Article 3
      </a>
      <a href="/dust/blog/4" style="padding-right: 15px">
        Blog Article 4
      </a>
      <a href="/dust/about-me" style="padding-right: 15px">
        About Me
      </a>
      <DirectoryRouter pages="./pages" />
    </>
  );
}

export default App;
