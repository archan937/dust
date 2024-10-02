import Dust, { useState } from "dust";

import Counter from "../components/Counter";
import SayHello from "../components/SayHello";

function Home() {
  const [counter, setCounter] = useState(0);
  const [show, setShow] = useState(false);

  console.log("Rendering <Home/>");

  return (
    <>
      <h1>Welcome to Dust!</h1>
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
        See more at: <a href="https://github.com/archan937/dust">Github</a>
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
    </>
  );
}

export default Home;
