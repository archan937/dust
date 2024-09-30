import Hydrogen, { useState } from "hydrogen.js";

import Counter from "./components/Counter";
import SayHello from "./components/SayHello";

function App() {
  const [counter, setCounter] = useState(0);
  const [show, setShow] = useState(false);

  console.log("Rendering <App/>");

  return (
    <>
      <h1>Welcome to Hydrogen.js!</h1>
      <p>
        <i>
          A minimalistic reactive Javascript library for building dynamic state
          component-based interfaces.
        </i>
      </p>
      <p>
        <i>
          <strong>
            (please note the browser console: components are NOT RERENDERED on
            change
          </strong>
          )
        </i>
      </p>
      <p>
        See more at:{" "}
        <a href="https://github.com/archan937/hydrogen.js">Github</a>
      </p>
      <h3 style="margin-top: 60px">Say Hello example:</h3>
      <SayHello />
      <h3 style="margin-top: 60px">Classic Counter example:</h3>
      <Counter
        counter={counter}
        setCounter={setCounter}
        show={show}
        setShow={setShow}
      />
      <Counter
        counter={counter}
        setCounter={setCounter}
        show={show}
        setShow={setShow}
      />
      <Counter
        counter={counter}
        setCounter={setCounter}
        show={show}
        setShow={setShow}
      />
    </>
  );
}

export default App;
