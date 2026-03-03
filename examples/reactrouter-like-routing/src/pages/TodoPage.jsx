import Dust, { useState, useEffect } from 'dust';

export default function TodoPage() {
  const [todos, setTodos] = useState([]);

  const inputEl = <input type="text" placeholder="Add a todo and press Enter…" />;
  const listEl = <ul className="todo-list" />;
  const emptyEl = <p className="todo-empty">No todos yet.</p>;

  const add = () => {
    const text = inputEl.value.trim();
    if (!text) return;
    setTodos(prev => [...prev, text]);
    inputEl.value = '';
    inputEl.focus();
  };

  inputEl.addEventListener('keydown', e => { if (e.key === 'Enter') add(); });

  // Re-render list whenever todos changes.
  // useEffect runs immediately and on every dep change.
  useEffect(() => {
    const items = todos();
    listEl.innerHTML = '';
    emptyEl.style.display = items.length ? 'none' : '';

    items.forEach((text, i) => {
      listEl.appendChild(
        <li>
          <span>{text}</span>
          <button
            className="danger"
            onClick={() => setTodos(prev => prev.filter((_, j) => j !== i))}
          >
            Remove
          </button>
        </li>
      );
    });
  }, [todos]);

  return (
    <section>
      <div className="section-header">
        <h2>Todo List</h2>
        <p>Array state · useEffect for list rendering · in-place array mutation</p>
      </div>
      <div className="demo">
        <div className="todo-input">
          {inputEl}
          <button className="primary" onClick={() => add()}>Add</button>
        </div>
        {emptyEl}
        {listEl}
      </div>
    </section>
  );
}
