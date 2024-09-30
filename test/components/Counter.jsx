import Hydrogen, { useState } from "src";

function Counter() {
  const [counter, setCounter] = useState(0);

  return (
    <div class="counter">
      <p>
        Counter: <strong>{counter()}</strong>
      </p>
      <button onClick={() => setCounter((counter) => counter + 1)}>Up</button>
      <button onClick={() => setCounter((counter) => counter - 1)}>Down</button>
    </div>
  );
}

export default Counter;
