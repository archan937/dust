import Dust, { useState, useEffect } from 'dust';

export default function CounterPage() {
  const [count, setCount] = useState(0);

  // Derived values require useEffect — Dust has no computed values,
  // reactive text nodes only work with direct getter references.
  const doubledEl = <span className="stat-value">0</span>;
  const squaredEl = <span className="stat-value">0</span>;

  useEffect(() => {
    const n = count();
    doubledEl.textContent = String(n * 2);
    squaredEl.textContent = String(n * n);
  }, [count]);

  return (
    <section>
      <div className="section-header">
        <h2>Counter</h2>
        <p>Primitive state · functional updates · derived values via useEffect</p>
      </div>
      <div className="demo">
        <div className="counter-display">{count}</div>
        <div className="counter-controls">
          <button onClick={() => setCount(0)}>Reset</button>
          <button onClick={() => setCount(n => n - 1)}>−</button>
          <button onClick={() => setCount(n => n + 1)}>+</button>
          <button onClick={() => setCount(n => n + 10)}>+10</button>
        </div>
        <div className="derived">
          <span className="stat-label">×2 =</span>{doubledEl}
          &nbsp;&nbsp;
          <span className="stat-label">² =</span>{squaredEl}
        </div>
      </div>
    </section>
  );
}
