import Dust from 'dust';

function Counter({ count, setCount, show, setShow }) {
  console.log('Rendering <Counter />');

  return (
    <>
      <p>
        Count: <strong>{count()}</strong>
      </p>
      <button onClick={() => setCount((n) => n + 1)}>+</button>{' '}
      <button onClick={() => setCount((n) => n - 1)}>−</button>
      <p>
        <button onClick={() => setShow((v) => !v)}>Toggle message</button>
      </p>
      {show() && (
        <p>
          <strong>Hello from Dust! 🎉</strong>
        </p>
      )}
    </>
  );
}

export default Counter;
