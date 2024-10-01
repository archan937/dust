import Dust from "dust";

function Counter({ counter, setCounter, show, setShow }) {
  console.log("Rendering <Counter/>");

  return (
    <>
      Counter: <strong>{counter()}</strong>
      <p>
        <button onClick={() => setCounter((counter) => counter + 1)}>Up</button>
        <button onClick={() => setCounter((counter) => counter - 1)}>
          Down
        </button>
      </p>
      <p>
        <button onClick={() => setShow((prev) => !prev)}>Toggle</button>
      </p>
      <p>
        {show() && (
          <p>
            <strong>Hello!</strong>
          </p>
        )}
      </p>
    </>
  );
}

export default Counter;
