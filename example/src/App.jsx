import Hydrogen, { useState } from "hydrogen.js";

import Counter from "./components/Counter";

function App() {
  const [counter, setCounter] = useState(0);
  const [show, setShow] = useState(false);

  console.log("Rendering <App/>");

  return (
    <>
      <h1>Hydrogen.js Example</h1>
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
