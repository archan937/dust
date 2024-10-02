import Dust, { DirectoryRouter } from "dust";

function App() {
  console.log("Rendering <App/> using <DirectoryRouter/>");

  return (
    <>
      <a href="/" style="padding-right: 15px">
        Home
      </a>
      <a href="/docs/routing" style="padding-right: 15px">
        Routing Docs
      </a>
      <a href="/about-me" style="padding-right: 15px">
        About Me
      </a>
      <DirectoryRouter pages="src/nextjs-pages" />
    </>
  );
}

export default App;
