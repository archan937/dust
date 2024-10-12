import Dust from "dust";

function Routing() {
  console.log("Rendering <Routing/>");

  return (
    <>
      <h1>You can use two types of routing</h1>
      <ul>
        <li>DirectoryRouter - Routing similar to Next.js</li>
        <li>BrowserRouter - Routing similar to ReactRouterDOM</li>
      </ul>
    </>
  );
}

export default Routing;
