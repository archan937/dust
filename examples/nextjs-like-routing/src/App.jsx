import Dust, { DirectoryRouter } from 'dust';

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
        <DirectoryRouter pages="./pages" />
      </div>
    </>
  );
}

export default App;
