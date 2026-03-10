import Dust, { createElement, createRoot, css, cx, useState } from 'dust';
import type { Getter } from 'src/types';

declare const hljs: {
  highlight: (code: string, opts: { language: string }) => { value: string };
};

// Keyframe for running pulse — injected once at module load
const _ks = document.createElement('style');
_ks.textContent =
  '@keyframes bm-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.75)}}' +
  '@keyframes bm-spin{to{transform:rotate(360deg)}}';
document.head.appendChild(_ks);

// ── Styles ─────────────────────────────────────────────────────────────────

const s = {
  page: css`
    max-width: 900px;
    margin: 0 auto;
    padding: 3rem 1.5rem 5rem;
  `,
  header: css`
    margin-bottom: 2rem;
  `,
  title: css`
    font-size: 1.75rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin-bottom: 0.35rem;
  `,
  version: css`
    display: inline-block;
    font-size: 0.72rem;
    font-weight: 600;
    padding: 0.15rem 0.5rem;
    border-radius: 999px;
    background: #1d4ed8;
    color: #bfdbfe;
    vertical-align: middle;
    margin-left: 0.4rem;
    position: relative;
    top: -2px;
  `,
  sub: css`
    color: #71717a;
    font-size: 0.9rem;
    max-width: 580px;
    line-height: 1.65;
  `,
  btn: css`
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.5rem 1.2rem;
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    border: none;
    background: #3b82f6;
    color: #fff;
    transition: background 0.15s;
    &:hover {
      background: #2563eb;
    }
    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  `,
  status: css`
    margin-top: 0.75rem;
    font-size: 0.82rem;
    color: #52525b;
    min-height: 1.2rem;
  `,
  cards: css`
    margin-top: 2.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  `,
  card: css`
    background: #111113;
    border: 1px solid #27272a;
    border-radius: 10px;
    overflow: hidden;
  `,
  cardTop: css`
    padding: 1rem 1.25rem 0.85rem;
    border-bottom: 1px solid #1f1f22;
  `,
  cardName: css`
    font-size: 0.95rem;
    font-weight: 700;
    color: #f4f4f5;
    margin-bottom: 0.25rem;
  `,
  cardDesc: css`
    font-size: 0.8rem;
    color: #52525b;
    line-height: 1.5;
  `,
  stats: css`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border-bottom: 1px solid #1f1f22;
  `,
  stat: css`
    padding: 0.7rem 1.25rem;
    border-right: 1px solid #1f1f22;
    &:last-child {
      border-right: none;
    }
  `,
  statLabel: css`
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #3f3f46;
    margin-bottom: 0.2rem;
  `,
  statValue: css`
    font-size: 0.95rem;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  `,
  statSub: css`
    font-size: 0.72rem;
    font-weight: 400;
    margin-top: 1px;
    font-variant-numeric: tabular-nums;
    color: #3f3f46;
  `,
  dustColor: css`
    color: #34d399;
  `,
  reactColor: css`
    color: #60a5fa;
  `,
  speedupColor: css`
    color: #fbbf24;
  `,
  bars: css`
    padding: 0.85rem 1.25rem;
    border-bottom: 1px solid #1f1f22;
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
  `,
  barRow: css`
    display: flex;
    align-items: center;
    gap: 0.65rem;
  `,
  barLabel: css`
    width: 46px;
    text-align: right;
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    flex-shrink: 0;
  `,
  barTrack: css`
    flex: 1;
    height: 5px;
    background: #1c1c1f;
    border-radius: 3px;
    overflow: hidden;
  `,
  barValue: css`
    width: 68px;
    text-align: right;
    font-size: 0.78rem;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    flex-shrink: 0;
  `,
  barRange: css`
    width: 110px;
    text-align: right;
    font-size: 0.68rem;
    color: #3f3f46;
    font-variant-numeric: tabular-nums;
    flex-shrink: 0;
  `,
  codeGrid: css`
    display: grid;
    grid-template-columns: 1fr 1fr;
  `,
  codePane: css`
    overflow: hidden;
    &:first-child {
      border-right: 1px solid #1f1f22;
    }
  `,
  codePaneHeader: css`
    padding: 0.4rem 0.85rem;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  `,
  codePaneHeaderDust: css`
    background: #052e16;
    color: #34d399;
    border-bottom: 1px solid #14532d;
  `,
  codePaneHeaderReact: css`
    background: #0c1a2e;
    color: #60a5fa;
    border-bottom: 1px solid #1e3a5f;
  `,
  pre: css`
    margin: 0;
    padding: 0.85rem;
    overflow-x: auto;
    background: #0d1117;
    font-family: 'Fira Code', 'Cascadia Code', 'JetBrains Mono', monospace;
  `,
  note: css`
    margin-top: 2.5rem;
    padding: 1rem 1.25rem;
    border-radius: 8px;
    background: #111113;
    border: 1px solid #27272a;
    font-size: 0.83rem;
    color: #71717a;
    line-height: 1.7;
  `,
  hidden: css`
    position: absolute;
    width: 0;
    height: 0;
    overflow: hidden;
    pointer-events: none;
  `,
  footer: css`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background: rgba(9, 9, 11, 0.88);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-top: 1px solid #27272a;
  `,
  footerInner: css`
    max-width: 900px;
    margin: 0 auto;
    padding: 0.65rem 1.5rem 0.6rem;
    display: flex;
    align-items: center;
    gap: 0;
  `,
  footerStep: css`
    flex: 1;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-width: 0;
  `,
  footerArrow: css`
    color: #27272a;
    font-size: 0.75rem;
    flex-shrink: 0;
    padding: 0 0.1rem;
  `,
  stepDot: css`
    width: 22px;
    height: 22px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.65rem;
    font-weight: 700;
    flex-shrink: 0;
    transition: background 0.3s, color 0.3s;
  `,
  stepDotIdle: css`
    background: #18181b;
    color: #3f3f46;
    border: 1px solid #27272a;
  `,
  stepDotRunning: css`
    background: #1d4ed8;
    color: #fff;
    border: 1px solid #3b82f6;
    animation: bm-pulse 1.2s ease-in-out infinite;
  `,
  stepDotDone: css`
    background: #14532d;
    color: #34d399;
    border: 1px solid #166534;
  `,
  stepText: css`
    min-width: 0;
    overflow: hidden;
  `,
  stepName: css`
    font-size: 0.72rem;
    font-weight: 600;
    color: #71717a;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.2;
  `,
  stepNameRunning: css`
    color: #93c5fd;
  `,
  stepNameDone: css`
    color: #f4f4f5;
  `,
  stepMeta: css`
    font-size: 0.67rem;
    color: #3f3f46;
    font-variant-numeric: tabular-nums;
    line-height: 1.2;
    margin-top: 1px;
  `,
  stepMetaRunning: css`
    color: #60a5fa;
  `,
  stepMetaDone: css`
    color: #34d399;
    font-weight: 600;
  `,
  footerTrack: css`
    height: 2px;
    background: #18181b;
    position: relative;
    overflow: hidden;
  `,
};

// ── Types ──────────────────────────────────────────────────────────────────

interface BenchResult {
  name: string;
  description: string;
  iterations: number;
  dustRuns: number[];
  reactRuns: number[];
  dustCode: string;
  reactCode: string;
}

type TestState = 'idle' | 'running' | 'done';

interface TestProgress {
  label: string;
  state: TestState;
  run: number;
  speedup: string;
}

const TEST_LABELS = [
  'Counter',
  'Prop drilling',
  'Wide tree',
  'Targeted update',
  'Initial render',
];

const makeProgress = (): TestProgress[] =>
  TEST_LABELS.map((label) => ({ label, state: 'idle', run: 0, speedup: '' }));

// ── Reactive state ─────────────────────────────────────────────────────────

const [results, setResults] = useState<BenchResult[]>([]);
const [status, setStatus] = useState('');
const [running, setRunning] = useState(false);
const [reactVersion, setReactVersion] = useState('');
const [progresses, setProgresses] = useState<TestProgress[]>(makeProgress());

// ── Helpers ────────────────────────────────────────────────────────────────

const RUNS = 5;

const setTestProgress = (index: number, update: Partial<TestProgress>): void =>
  setProgresses((ps) =>
    ps.map((p, i) => (i === index ? { ...p, ...update } : p)),
  );

const sleep = (ms: number): Promise<void> =>
  new Promise((r) => setTimeout(r, ms));

const bench = (fn: () => void, iterations: number): number => {
  for (let i = 0; i < Math.ceil(iterations / 10); i++) fn();
  const t = performance.now();
  for (let i = 0; i < iterations; i++) fn();
  return performance.now() - t;
};

const avg = (arr: number[]): number =>
  arr.reduce((a, b) => a + b, 0) / arr.length;
const minOf = (arr: number[]): number => Math.min(...arr);
const maxOf = (arr: number[]): number => Math.max(...arr);

const fmt = (ms: number): string => `${ms.toFixed(1)} ms`;
const fmtShort = (ms: number): string => `${ms.toFixed(1)}`;

const perOp = (ms: number, n: number): string =>
  `${((ms / n) * 1000).toFixed(1)} µs/op`;

const speedup = (reactMs: number, dustMs: number): string => {
  const x = reactMs / dustMs;
  return x >= 1.05 ? `${x.toFixed(1)}× faster` : '≈ equal';
};

// ── Components ─────────────────────────────────────────────────────────────

const CodePane = ({
  label,
  lang,
  code,
}: {
  label: string;
  lang: string;
  code: string;
}): JSX.Element => {
  const wrap = document.createElement('div');
  wrap.className = s.codePane;

  const header = document.createElement('div');
  header.className = cx(
    s.codePaneHeader,
    label === 'Dust' ? s.codePaneHeaderDust : s.codePaneHeaderReact,
  );
  header.textContent = label;

  const pre = document.createElement('pre');
  pre.className = s.pre;

  const codeEl = document.createElement('code');
  try {
    codeEl.innerHTML = hljs.highlight(code.trim(), { language: lang }).value;
  } catch {
    codeEl.textContent = code.trim();
  }

  pre.appendChild(codeEl);
  wrap.appendChild(header);
  wrap.appendChild(pre);
  return wrap;
};

const BarRow = ({
  label,
  runs,
  maxMs,
  color,
}: {
  label: string;
  runs: number[];
  maxMs: number;
  color: string;
}): JSX.Element => {
  const avgMs = avg(runs);
  const pct = ((avgMs / maxMs) * 100).toFixed(1);
  return (
    <div className={s.barRow}>
      <span className={s.barLabel} style={`color:${color}`}>
        {label}
      </span>
      <div className={s.barTrack}>
        <div
          style={`width:${pct}%;height:100%;background:${color};border-radius:3px;transition:width 0.4s ease`}
        />
      </div>
      <span className={s.barValue} style={`color:${color}`}>
        {fmt(avgMs)}
      </span>
      <span className={s.barRange}>
        {fmtShort(minOf(runs))} – {fmtShort(maxOf(runs))} ms
      </span>
    </div>
  );
};

const BenchCard = ({ result }: { result: BenchResult }): JSX.Element => {
  const dustAvg = avg(result.dustRuns);
  const reactAvg = avg(result.reactRuns);
  const maxMs = Math.max(dustAvg, reactAvg);
  return (
    <div className={s.card}>
      <div className={s.cardTop}>
        <div className={s.cardName}>{result.name}</div>
        <div className={s.cardDesc}>{result.description}</div>
      </div>

      <div className={s.stats}>
        <div className={s.stat}>
          <div className={s.statLabel}>Iterations</div>
          <div className={s.statValue} style="color:#52525b">
            {result.iterations.toLocaleString()}
          </div>
          <div className={s.statSub}>{RUNS} runs</div>
        </div>
        <div className={s.stat}>
          <div className={cx(s.statLabel, s.dustColor)}>Dust avg</div>
          <div className={cx(s.statValue, s.dustColor)}>{fmt(dustAvg)}</div>
          <div className={s.statSub}>{perOp(dustAvg, result.iterations)}</div>
        </div>
        <div className={s.stat}>
          <div className={cx(s.statLabel, s.reactColor)}>React avg</div>
          <div className={cx(s.statValue, s.reactColor)}>{fmt(reactAvg)}</div>
          <div className={s.statSub}>{perOp(reactAvg, result.iterations)}</div>
        </div>
        <div className={s.stat}>
          <div className={cx(s.statLabel, s.speedupColor)}>Speedup</div>
          <div className={cx(s.statValue, s.speedupColor)}>
            {speedup(reactAvg, dustAvg)}
          </div>
        </div>
      </div>

      <div className={s.bars}>
        <BarRow label="Dust" runs={result.dustRuns} maxMs={maxMs} color="#34d399" />
        <BarRow label="React" runs={result.reactRuns} maxMs={maxMs} color="#60a5fa" />
      </div>

      <div className={s.codeGrid}>
        <CodePane label="Dust" lang="typescript" code={result.dustCode} />
        <CodePane label="React" lang="javascript" code={result.reactCode} />
      </div>
    </div>
  );
};

const cards = results.map((result) => <BenchCard result={result} />);

// ── Progress footer ─────────────────────────────────────────────────────────

const StepPill = ({ p, i }: { p: TestProgress; i: number }): JSX.Element => {
  const isDone = p.state === 'done';
  const isRunning = p.state === 'running';
  return (
    <div className={s.footerStep}>
      <div
        className={cx(
          s.stepDot,
          isDone ? s.stepDotDone : isRunning ? s.stepDotRunning : s.stepDotIdle,
        )}
      >
        {isDone ? '✓' : String(i + 1)}
      </div>
      <div className={s.stepText}>
        <div
          className={cx(
            s.stepName,
            isDone ? s.stepNameDone : isRunning ? s.stepNameRunning : '',
          )}
        >
          {p.label}
        </div>
        <div
          className={cx(
            s.stepMeta,
            isDone ? s.stepMetaDone : isRunning ? s.stepMetaRunning : '',
          )}
        >
          {isDone
            ? p.speedup
            : isRunning
              ? `run ${p.run} / ${RUNS}`
              : '·'}
        </div>
      </div>
    </div>
  );
};

const ProgressFooter = (): JSX.Element => (
  <div className={s.footer}>
    <div className={s.footerInner}>
      {() => {
        const ps = progresses();
        const frag = document.createDocumentFragment();
        ps.forEach((p, i) => {
          frag.appendChild(StepPill({ p, i }));
          if (i < ps.length - 1) {
            const arrow = document.createElement('span');
            arrow.className = s.footerArrow;
            arrow.textContent = '›';
            frag.appendChild(arrow);
          }
        });
        return frag;
      }}
    </div>
    <div className={s.footerTrack}>
      {() => {
        const ps = progresses();
        const done = ps.filter((p) => p.state === 'done').length;
        const curr = ps.find((p) => p.state === 'running');
        const pct = Math.min(
          100,
          Math.round(
            ((done * RUNS + (curr?.run ?? 0)) / (TEST_LABELS.length * RUNS)) *
              100,
          ),
        );
        const fill = document.createElement('div');
        fill.style.cssText = `height:100%;width:${pct}%;background:linear-gradient(90deg,#3b82f6,#34d399);transition:width 0.4s ease`;
        return fill;
      }}
    </div>
  </div>
);

// ── Sandbox ────────────────────────────────────────────────────────────────

const sandboxEl = document.createElement('div');
sandboxEl.className = s.hidden;
document.body.appendChild(sandboxEl);

// ── Run ────────────────────────────────────────────────────────────────────

const run = async (): Promise<void> => {
  setRunning(true);
  setResults([]);
  setProgresses(makeProgress());

  const [{ default: React }, { createRoot: reactCreateRoot }, { flushSync }] =
    await Promise.all([
      import('https://esm.sh/react@19') as Promise<{
        default: typeof import('react');
      }>,
      import('https://esm.sh/react-dom@19/client') as Promise<{
        createRoot: typeof import('react-dom/client').createRoot;
      }>,
      import('https://esm.sh/react-dom@19') as Promise<{
        flushSync: typeof import('react-dom').flushSync;
      }>,
    ]);

  setReactVersion(React.version);

  // ── Test 1: Counter — 50,000 rapid increments ───────────────────────────

  // Dust: state inside component, just like React.
  // Component runs once. Text node subscribes directly to the getter.
  // Each setState → 1 text node mutation.
  //
  // React: component re-runs on every setState.
  // Each setState → component re-runs, new vdom built, diffed, committed.

  let dustSetCounter: ((n: (p: number) => number) => void) | null = null;
  const DustCounter = (): JSX.Element => {
    const [count, setCount] = useState(0);
    dustSetCounter = setCount;
    return <span>{count}</span>;
  };
  const dustCounterEl = document.createElement('div');
  sandboxEl.appendChild(dustCounterEl);
  createRoot(dustCounterEl).render(<DustCounter />);

  let reactSetCounter: ((n: (p: number) => number) => void) | null = null;
  const ReactCounter = () => {
    const [count, setCount] = React.useState(0);
    reactSetCounter = setCount;
    return React.createElement('span', null, count);
  };
  const reactCounterEl = document.createElement('div');
  sandboxEl.appendChild(reactCounterEl);
  const reactCounterRoot = reactCreateRoot(reactCounterEl);
  flushSync(() =>
    reactCounterRoot.render(
      React.createElement(ReactCounter as React.ComponentType),
    ),
  );

  const COUNTER_N = 50_000;
  const dustCounterRuns: number[] = [];
  const reactCounterRuns: number[] = [];
  setTestProgress(0, { state: 'running' });
  for (let r = 0; r < RUNS; r++) {
    setTestProgress(0, { run: r + 1 });
    setStatus(`1/5  Counter — run ${r + 1}/${RUNS}…`);
    await sleep(16);
    dustCounterRuns.push(bench(() => dustSetCounter!((n) => n + 1), COUNTER_N));
    reactCounterRuns.push(
      bench(() => flushSync(() => reactSetCounter!((n) => n + 1)), COUNTER_N),
    );
  }

  reactCounterRoot.unmount();
  sandboxEl.removeChild(dustCounterEl);
  sandboxEl.removeChild(reactCounterEl);
  setTestProgress(0, {
    state: 'done',
    speedup: speedup(avg(reactCounterRuns), avg(dustCounterRuns)),
  });

  setResults((r) => [
    ...r,
    {
      name: 'Counter — 50,000 updates',
      description:
        'Single state value, single text node. React re-runs the component and reconciles the vdom on every update.',
      iterations: COUNTER_N,
      dustRuns: dustCounterRuns,
      reactRuns: reactCounterRuns,
      dustCode: `\
// State at module scope — accessible anywhere.
const [count, setCount] = useState(0);

const Counter = () => <span>{count}</span>;
// {count} → transpiled to () => count
// text node subscribes to count getter

setCount(n => n + 1);
// → 1 text node mutation
// → component never re-runs`,
      reactCode: `\
// Setter stored during render for external access.
let setCount;

const Counter = () => {
  const [count, set] = useState(0);
  setCount = set;
  return <span>{count}</span>;
};

setCount(n => n + 1);
// → component re-runs
// → new vdom built, diffed
// → DOM commit`,
    },
  ]);

  // ── Test 2: Prop drilling — 30 levels, 10,000 updates ───────────────────

  // Dust: all 30 components run once at mount. The getter is passed
  // by reference — no copies. Only the leaf text node subscribes.
  //
  // React: every intermediate component re-renders because its prop
  // changed. 31 component calls per update × 10k = 310,000 total.

  type CP = { count: Getter<number> };

  const DustLeaf = ({ count }: CP): JSX.Element => <span>{count}</span>;
  let DustDrillChain: (props: CP) => JSX.Element = DustLeaf;
  for (let i = 0; i < 29; i++) {
    const Inner = DustDrillChain;
    DustDrillChain = ({ count }: CP) =>
      createElement(Inner, { count }) as JSX.Element;
  }

  let dustSetDrill: ((n: (p: number) => number) => void) | null = null;
  const DustDrillRoot = (): JSX.Element => {
    const [count, setCount] = useState(0);
    dustSetDrill = setCount;
    return createElement(DustDrillChain, { count }) as JSX.Element;
  };
  const dustDrillEl = document.createElement('div');
  sandboxEl.appendChild(dustDrillEl);
  createRoot(dustDrillEl).render(<DustDrillRoot />);

  let reactSetDrill: ((n: (p: number) => number) => void) | null = null;
  const ReactLeaf = ({ count }: { count: number }) =>
    React.createElement('span', null, count);
  let ReactDrillChain: React.ComponentType<{ count: number }> = ReactLeaf;
  for (let i = 0; i < 29; i++) {
    const Inner: React.ComponentType<{ count: number }> = ReactDrillChain;
    ReactDrillChain = ({ count }: { count: number }): React.ReactElement =>
      React.createElement(Inner, { count });
  }
  const OuterChain = ReactDrillChain;
  const ReactDrillRoot = () => {
    const [count, setCount] = React.useState(0);
    reactSetDrill = setCount;
    return React.createElement(OuterChain, { count });
  };
  const reactDrillEl = document.createElement('div');
  sandboxEl.appendChild(reactDrillEl);
  const reactDrillRoot = reactCreateRoot(reactDrillEl);
  flushSync(() =>
    reactDrillRoot.render(
      React.createElement(ReactDrillRoot as React.ComponentType),
    ),
  );

  const DRILL_N = 10_000;
  const dustDrillRuns: number[] = [];
  const reactDrillRuns: number[] = [];
  setTestProgress(1, { state: 'running' });
  for (let r = 0; r < RUNS; r++) {
    setTestProgress(1, { run: r + 1 });
    setStatus(`2/5  Prop drilling — run ${r + 1}/${RUNS}…`);
    await sleep(16);
    dustDrillRuns.push(bench(() => dustSetDrill!((n) => n + 1), DRILL_N));
    reactDrillRuns.push(
      bench(() => flushSync(() => reactSetDrill!((n) => n + 1)), DRILL_N),
    );
  }

  reactDrillRoot.unmount();
  sandboxEl.removeChild(dustDrillEl);
  sandboxEl.removeChild(reactDrillEl);
  setTestProgress(1, {
    state: 'done',
    speedup: speedup(avg(reactDrillRuns), avg(dustDrillRuns)),
  });

  setResults((r) => [
    ...r,
    {
      name: 'Prop drilling — 30 levels, 10,000 updates',
      description:
        'State at root, rendered in a leaf 30 levels deep. React re-renders every intermediate component on each update.',
      iterations: DRILL_N,
      dustRuns: dustDrillRuns,
      reactRuns: reactDrillRuns,
      dustCode: `\
// State at module scope — accessible anywhere.
const [count, setCount] = useState(0);

const Root   = () => <Level1 count={count} />;
const Level1 = ({ count }) => <Level2 count={count} />;
// ...
const Level30 = ({ count }) => <span>{count}</span>;
// All 30 run once. Only the leaf text node subscribes.

setCount(n => n + 1);
// → 0 component re-runs
// → 1 text node mutation`,
      reactCode: `\
// Setter stored during render for external access.
let setCount;

const Root = () => {
  const [count, set] = useState(0);
  setCount = set;
  return <Level1 count={count} />;
};
const Level1  = ({ count }) => <Level2  count={count} />;
// ...
const Level30 = ({ count }) => <span>{count}</span>;

setCount(n => n + 1);
// → 31 component calls per update
// → 310,000 total for 10k updates
// (fix: wrap each level in React.memo)`,
    },
  ]);

  // ── Test 3: Wide tree — 200 child components, 5,000 updates ─────────────

  // Dust: each child receives the getter and subscribes its own text node.
  // Update → 200 direct text node mutations, 0 component re-runs.
  //
  // React: root + 200 children all re-render.
  // 201 component calls per update × 5k = 1,005,000 total.

  type WP = { count: Getter<number> };
  const DustWideChild = ({ count }: WP): JSX.Element => <span>{count}</span>;

  let dustSetWide: ((n: (p: number) => number) => void) | null = null;
  const DustWideRoot = (): JSX.Element => {
    const [count, setCount] = useState(0);
    dustSetWide = setCount;
    return createElement(
      'div',
      null,
      ...Array.from({ length: 200 }, () =>
        createElement(DustWideChild, { count }),
      ),
    ) as JSX.Element;
  };
  const dustWideEl = document.createElement('div');
  sandboxEl.appendChild(dustWideEl);
  createRoot(dustWideEl).render(<DustWideRoot />);

  let reactSetWide: ((n: (p: number) => number) => void) | null = null;
  const ReactWideChild = ({ count }: { count: number }) =>
    React.createElement('span', null, count);
  const ReactWideRoot = () => {
    const [count, setCount] = React.useState(0);
    reactSetWide = setCount;
    return React.createElement(
      'div',
      null,
      ...Array.from({ length: 200 }, (_, i) =>
        React.createElement(ReactWideChild, { key: i, count }),
      ),
    );
  };
  const reactWideEl = document.createElement('div');
  sandboxEl.appendChild(reactWideEl);
  const reactWideRoot = reactCreateRoot(reactWideEl);
  flushSync(() =>
    reactWideRoot.render(
      React.createElement(ReactWideRoot as React.ComponentType),
    ),
  );

  const WIDE_N = 5_000;
  const dustWideRuns: number[] = [];
  const reactWideRuns: number[] = [];
  setTestProgress(2, { state: 'running' });
  for (let r = 0; r < RUNS; r++) {
    setTestProgress(2, { run: r + 1 });
    setStatus(`3/5  Wide tree — run ${r + 1}/${RUNS}…`);
    await sleep(16);
    dustWideRuns.push(bench(() => dustSetWide!((n) => n + 1), WIDE_N));
    reactWideRuns.push(
      bench(() => flushSync(() => reactSetWide!((n) => n + 1)), WIDE_N),
    );
  }

  reactWideRoot.unmount();
  sandboxEl.removeChild(dustWideEl);
  sandboxEl.removeChild(reactWideEl);
  setTestProgress(2, {
    state: 'done',
    speedup: speedup(avg(reactWideRuns), avg(dustWideRuns)),
  });

  setResults((r) => [
    ...r,
    {
      name: 'Wide tree — 200 children, 5,000 updates',
      description:
        '200 separate child components each display the same state. React re-renders all 200 children whenever the parent state changes.',
      iterations: WIDE_N,
      dustRuns: dustWideRuns,
      reactRuns: reactWideRuns,
      dustCode: `\
// State at module scope — accessible anywhere.
const [count, setCount] = useState(0);

const Child = ({ count }) => <span>{count}</span>;
const Root  = () => (
  <div>
    {Array.from({ length: 200 }, () =>
      <Child count={count} />  // getter, not value
    )}
  </div>
);

setCount(n => n + 1);
// → 0 component re-runs
// → 200 text node mutations`,
      reactCode: `\
// Setter stored during render for external access.
let setCount;

const Child = ({ count }) => <span>{count}</span>;
const Root  = () => {
  const [count, set] = useState(0);
  setCount = set;
  return (
    <div>
      {Array.from({ length: 200 }, (_, i) =>
        <Child key={i} count={count} />  // value, not getter
      )}
    </div>
  );
};

setCount(n => n + 1);
// → 201 component calls per update
// → 1,005,000 total for 5k updates
// (fix: wrap Child in React.memo)`,
    },
  ]);

  // ── Test 4: 10,000 items with independent state, targeted update × 1,000 ──

  // Both sides use the same structure: 10,000 independently-stateful items,
  // update one at index 5,000.
  //
  // Dust: 10k useState pairs inside the root component. Each getter is wired
  // directly to its <span> text node. Update → 1 text node mutation.
  //
  // React: 10k individual <Item> components, each with its own useState.
  // The setter is stored in an array for external access. Update → React
  // re-renders only Item[5000], builds its vdom, diffs, commits.
  // (Using a single array state would be worse — this is the fair approach.)

  let dustFatPairs: ReturnType<typeof useState<number>>[] = [];
  const DustFatRoot = (): JSX.Element => {
    const pairs = Array.from({ length: 10_000 }, (_, i) => useState(i));
    dustFatPairs = pairs;
    return createElement(
      'div',
      null,
      ...pairs.map(([getter]) => createElement('span', null, getter)),
    ) as JSX.Element;
  };
  const dustFatEl = document.createElement('div');
  sandboxEl.appendChild(dustFatEl);
  createRoot(dustFatEl).render(<DustFatRoot />);

  // React: individual item components — each has its own useState.
  // Updating one re-renders only that component (no array spreading).
  const reactFatSetters: Array<(fn: (n: number) => number) => void> =
    Array(10_000).fill(null);
  const ReactItem = ({ index, init }: { index: number; init: number }) => {
    const [count, setCount] = React.useState(init);
    reactFatSetters[index] = setCount;
    return React.createElement('span', null, count);
  };
  const ReactFatRoot = () =>
    React.createElement(
      'div',
      null,
      ...Array.from({ length: 10_000 }, (_, i) =>
        React.createElement(ReactItem, { key: i, index: i, init: i }),
      ),
    );
  const reactFatEl = document.createElement('div');
  sandboxEl.appendChild(reactFatEl);
  const reactFatRoot = reactCreateRoot(reactFatEl);
  flushSync(() =>
    reactFatRoot.render(
      React.createElement(ReactFatRoot as React.ComponentType),
    ),
  );

  const FAT_N = 1_000;
  const dustFatRuns: number[] = [];
  const reactFatRuns: number[] = [];
  setTestProgress(3, { state: 'running' });
  for (let r = 0; r < RUNS; r++) {
    setTestProgress(3, { run: r + 1 });
    setStatus(`4/5  Targeted update — run ${r + 1}/${RUNS}…`);
    await sleep(16);
    dustFatRuns.push(bench(() => dustFatPairs[5_000][1]((n) => n + 1), FAT_N));
    reactFatRuns.push(
      bench(
        () => flushSync(() => reactFatSetters[5_000]((n) => n + 1)),
        FAT_N,
      ),
    );
  }

  reactFatRoot.unmount();
  sandboxEl.removeChild(dustFatEl);
  sandboxEl.removeChild(reactFatEl);
  setTestProgress(3, {
    state: 'done',
    speedup: speedup(avg(reactFatRuns), avg(dustFatRuns)),
  });

  setResults((r) => [
    ...r,
    {
      name: 'Targeted update — 10k items, update one',
      description:
        'Both sides use 10k independently-stateful items. React uses individual item components (the fair approach) — only Item[5000] re-renders. Dust updates one text node directly with no component re-run.',
      iterations: FAT_N,
      dustRuns: dustFatRuns,
      reactRuns: reactFatRuns,
      dustCode: `\
// State lives at module scope — accessible anywhere.
const pairs = Array.from({ length: 10_000 }, (_, i) =>
  useState(i)
);

const App = () => (
  <div>{pairs.map(([g]) => <span>{g}</span>)}</div>
);

pairs[5_000][1](n => n + 1);
// → 1 text node mutation
// → 0 component re-runs`,
      reactCode: `\
// 10k individual item components, each with
// its own useState — the idiomatic approach.
const Item = ({ index, init }) => {
  const [count, setCount] = useState(init);
  setters[index] = setCount;  // store for external access
  return <span>{count}</span>;
};

setters[5_000](n => n + 1);
// → only Item[5000] re-renders
// → vdom built, diffed, committed
// → 9,999 components untouched`,
    },
  ]);

  // ── Test 5: Initial render — 5,000 items ────────────────────────────────

  // Cold mount of 5,000 list items. Included for honesty —
  // React's vdom commit path is heavily optimised for this.

  const RENDER_N = 100;
  const dustRenderRuns: number[] = [];
  const reactRenderRuns: number[] = [];
  setTestProgress(4, { state: 'running' });
  for (let r = 0; r < RUNS; r++) {
    setTestProgress(4, { run: r + 1 });
    setStatus(`5/5  Initial render — run ${r + 1}/${RUNS}…`);
    await sleep(16);
    dustRenderRuns.push(
      bench(() => {
        const el = document.createElement('div');
        sandboxEl.appendChild(el);
        createRoot(el).render(
          createElement(
            'ul',
            null,
            ...Array.from({ length: 5_000 }, (_, i) =>
              createElement('li', null, String(i)),
            ),
          ) as Node,
        );
        sandboxEl.removeChild(el);
      }, RENDER_N),
    );
    reactRenderRuns.push(
      bench(() => {
        const el = document.createElement('div');
        sandboxEl.appendChild(el);
        const root = reactCreateRoot(el);
        flushSync(() =>
          root.render(
            React.createElement(
              'ul',
              null,
              ...Array.from({ length: 5_000 }, (_, i) =>
                React.createElement('li', { key: i }, i),
              ),
            ),
          ),
        );
        root.unmount();
        sandboxEl.removeChild(el);
      }, RENDER_N),
    );
  }

  setTestProgress(4, {
    state: 'done',
    speedup: speedup(avg(reactRenderRuns), avg(dustRenderRuns)),
  });

  setResults((r) => [
    ...r,
    {
      name: 'Initial render — 5,000 items',
      description:
        "Cold mount of 5,000 list items. React's highly-optimised commit path is competitive here — included for honesty.",
      iterations: RENDER_N,
      dustRuns: dustRenderRuns,
      reactRuns: reactRenderRuns,
      dustCode: `\
// Direct DOM construction, no vdom layer.
const root = createRoot(el);
root.render(
  <ul>
    {Array.from({ length: 5_000 }, (_, i) =>
      <li>{String(i)}</li>
    )}
  </ul>
);`,
      reactCode: `\
// vdom construction + batch commit.
// React's scheduler is heavily optimised
// for this pattern.
const root = createRoot(el);
root.render(
  <ul>
    {Array.from({ length: 5_000 }, (_, i) =>
      <li key={i}>{i}</li>
    )}
  </ul>
);`,
    },
  ]);

  setStatus('Done.');
  setRunning(false);
};

// ── App ─────────────────────────────────────────────────────────────────────

const App = (): JSX.Element => (
  <div className={s.page}>
    <div className={s.header}>
      <h1 className={s.title}>
        Dust vs React
        {() =>
          reactVersion() && (
            <span className={s.version}>React {reactVersion()}</span>
          )
        }
      </h1>
      <p className={s.sub}>
        Five scenarios targeting the exact patterns where React's re-render
        model creates the most overhead. All React updates forced synchronous
        via <code>flushSync</code>. Each test runs {RUNS} times; bars show
        average with min–max range.
      </p>
    </div>

    <button className={s.btn} disabled={running()} onClick={run}>
      {running() ? '⏳ Running…' : '▶ Run benchmarks'}
    </button>

    <p className={s.status}>{status}</p>

    <div className={s.cards}>{cards}</div>

    {() =>
      results().length > 0 && (
        <div className={s.note}>
          <strong style="color:#e4e4e7">Why these tests?</strong> Prop
          drilling, wide trees, and fat components are the exact patterns React
          developers reach for <code>React.memo</code>,{' '}
          <code>useCallback</code>, and <code>useMemo</code> to fix. Dust avoids
          all of it structurally — not through memoization, but because
          components never re-run. Each reactive value maintains a direct link
          to its DOM node. State updates are wire-to-DOM, nothing in between.
        </div>
      )
    }

    {() => (running() || results().length > 0) && <ProgressFooter />}
  </div>
);


createRoot(document.getElementById('root')!).render(<App />);
