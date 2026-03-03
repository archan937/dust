import Dust, { useState, useEffect } from 'dust';

export default function TimerPage() {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  let intervalId = null;

  // useEffect runs the callback immediately and re-runs whenever `running` changes.
  // The return value of useEffect is an unsubscribe function, NOT a cleanup for the
  // callback itself — so we clear the previous interval at the top of each run.
  useEffect(() => {
    clearInterval(intervalId);
    if (running()) {
      intervalId = setInterval(() => setElapsed(s => s + 1), 1000);
    }
  }, [running]);

  const toggleBtn = <button onClick={() => setRunning(r => !r)}>Start</button>;
  const logEl = <div className="effect-log" />;

  // Derived DOM updates for things that can't be expressed as direct getter refs.
  useEffect(() => {
    toggleBtn.textContent = running() ? 'Pause' : 'Start';

    const entry = document.createElement('p');
    entry.className = 'log-entry';
    entry.textContent = `→ ${running() ? 'started' : 'paused'} at ${elapsed()}s`;
    logEl.prepend(entry);
  }, [running]);

  const reset = () => {
    setRunning(false);
    setElapsed(0);
    logEl.innerHTML = '';
  };

  return (
    <section>
      <div className="section-header">
        <h2>Timer</h2>
        <p>useEffect for side effects · interval management · derived DOM updates</p>
      </div>
      <div className="demo">
        <div className="timer-display">
          {elapsed}<span className="unit">s</span>
        </div>
        <div className="timer-controls">
          {toggleBtn}
          <button onClick={() => reset()}>Reset</button>
        </div>
        {logEl}
      </div>
    </section>
  );
}
