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
    padding: 5rem 1.5rem 3rem;
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
    scroll-margin-top: 5rem;
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
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background: rgba(9, 9, 11, 0.88);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid #27272a;
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
    <div
      className={s.footerStep}
      style="cursor:pointer"
      onClick={() => {
        const el = document.querySelectorAll(`.${s.card}`)[i] as
          | HTMLElement
          | undefined;
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
        }
      }}
    >
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

// ── Benchmark mount helpers ─────────────────────────────────────────────────

const runDustBenchmark = (Component: () => JSX.Element): HTMLElement => {
  const el = document.createElement('div');
  sandboxEl.appendChild(el);
  createRoot(el).render(<Component />);
  return el;
};

const teardownDust = (el: HTMLElement): void => {
  sandboxEl.removeChild(el);
};

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

  const runReactBenchmark = (
    Component: React.ComponentType,
  ): { root: ReturnType<typeof reactCreateRoot>; el: HTMLElement } => {
    const el = document.createElement('div');
    sandboxEl.appendChild(el);
    const root = reactCreateRoot(el);
    flushSync(() => root.render(React.createElement(Component)));
    return { root, el };
  };

  const teardownReact = ({
    root,
    el,
  }: {
    root: ReturnType<typeof reactCreateRoot>;
    el: HTMLElement;
  }): void => {
    root.unmount();
    sandboxEl.removeChild(el);
  };

  // ── Test 1: Counter — 50,000 rapid increments ───────────────────────────

  let dustSetCounter: ((n: (p: number) => number) => void) | null = null;
  const DustCounterBenchmark = (): JSX.Element => {
    const [count, setCount] = useState(0);
    dustSetCounter = setCount;
    return Dust.createElement('span', null, count) as JSX.Element;
  };

  let reactSetCounter: ((n: (p: number) => number) => void) | null = null;
  const ReactCounterBenchmark = () => {
    const [count, setCount] = React.useState(0);
    reactSetCounter = setCount;
    return React.createElement('span', null, count);
  };

  const dustCounterEl = runDustBenchmark(DustCounterBenchmark);
  const reactCounter = runReactBenchmark(ReactCounterBenchmark);

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

  teardownDust(dustCounterEl);
  teardownReact(reactCounter);
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
const DustCounterBenchmark = (): JSX.Element => {
  const [count, setCount] = useState(0);
  dustSetCounter = setCount;
  return Dust.createElement('span', null, count);
};

dustSetCounter(n => n + 1);
// → 1 text node mutation
// → component never re-runs`,
      reactCode: `\
const ReactCounterBenchmark = () => {
  const [count, setCount] = React.useState(0);
  reactSetCounter = setCount;
  return React.createElement('span', null, count);
};

flushSync(() => reactSetCounter(n => n + 1));
// → component re-runs
// → new vdom built, diffed
// → DOM commit`,
    },
  ]);

  // ── Test 2: Prop drilling — 30 levels, 10,000 updates ───────────────────

  type CP = { count: Getter<number> };

  const DustLeaf = ({ count }: CP): JSX.Element =>
    Dust.createElement('span', null, count) as JSX.Element;
  let DustDrillChain: (props: CP) => JSX.Element = DustLeaf;
  for (let i = 0; i < 29; i++) {
    const Inner = DustDrillChain;
    DustDrillChain = ({ count }: CP) =>
      Dust.createElement(Inner, { count }) as JSX.Element;
  }

  let dustSetDrill: ((n: (p: number) => number) => void) | null = null;
  const DustDrillBenchmark = (): JSX.Element => {
    const [count, setCount] = useState(0);
    dustSetDrill = setCount;
    return Dust.createElement(DustDrillChain, { count }) as JSX.Element;
  };

  const ReactLeaf = ({ count }: { count: number }) =>
    React.createElement('span', null, count);
  let ReactDrillChain: React.ComponentType<{ count: number }> = ReactLeaf;
  for (let i = 0; i < 29; i++) {
    const Inner: React.ComponentType<{ count: number }> = ReactDrillChain;
    ReactDrillChain = ({ count }: { count: number }): React.ReactElement =>
      React.createElement(Inner, { count });
  }
  const ReactDrillTop = ReactDrillChain;

  let reactSetDrill: ((n: (p: number) => number) => void) | null = null;
  const ReactDrillBenchmark = () => {
    const [count, setCount] = React.useState(0);
    reactSetDrill = setCount;
    return React.createElement(ReactDrillTop, { count });
  };

  const dustDrillEl = runDustBenchmark(DustDrillBenchmark);
  const reactDrill = runReactBenchmark(ReactDrillBenchmark);

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

  teardownDust(dustDrillEl);
  teardownReact(reactDrill);
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
const DustLeaf = ({ count }) =>
  Dust.createElement('span', null, count);
let DustDrillChain = DustLeaf;
for (let i = 0; i < 29; i++) {
  const Inner = DustDrillChain;
  DustDrillChain = ({ count }) =>
    Dust.createElement(Inner, { count });
}
const DustDrillBenchmark = (): JSX.Element => {
  const [count, setCount] = useState(0);
  dustSetDrill = setCount;
  return Dust.createElement(DustDrillChain, { count });
};

dustSetDrill(n => n + 1);
// → 0 component re-runs
// → 1 text node mutation`,
      reactCode: `\
const ReactLeaf = ({ count }) =>
  React.createElement('span', null, count);
let ReactDrillChain = ReactLeaf;
for (let i = 0; i < 29; i++) {
  const Inner = ReactDrillChain;
  ReactDrillChain = ({ count }) =>
    React.createElement(Inner, { count });
}
const ReactDrillBenchmark = () => {
  const [count, setCount] = React.useState(0);
  reactSetDrill = setCount;
  return React.createElement(ReactDrillTop, { count });
};

flushSync(() => reactSetDrill(n => n + 1));
// → 31 component calls per update
// → 310,000 total for 10k updates`,
    },
  ]);

  // ── Test 3: Wide tree — 200 child components, 5,000 updates ─────────────

  type WP = { count: Getter<number> };
  const DustWideChild = ({ count }: WP): JSX.Element =>
    Dust.createElement('span', null, count) as JSX.Element;

  let dustSetWide: ((n: (p: number) => number) => void) | null = null;
  const DustWideBenchmark = (): JSX.Element => {
    const [count, setCount] = useState(0);
    dustSetWide = setCount;
    return Dust.createElement(
      'div',
      null,
      ...Array.from({ length: 200 }, () =>
        Dust.createElement(DustWideChild, { count }),
      ),
    ) as JSX.Element;
  };

  const ReactWideChild = ({ count }: { count: number }) =>
    React.createElement('span', null, count);

  let reactSetWide: ((n: (p: number) => number) => void) | null = null;
  const ReactWideBenchmark = () => {
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

  const dustWideEl = runDustBenchmark(DustWideBenchmark);
  const reactWide = runReactBenchmark(ReactWideBenchmark);

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

  teardownDust(dustWideEl);
  teardownReact(reactWide);
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
const DustWideChild = ({ count }) =>
  Dust.createElement('span', null, count);

const DustWideBenchmark = (): JSX.Element => {
  const [count, setCount] = useState(0);
  dustSetWide = setCount;
  return Dust.createElement('div', null,
    ...Array.from({ length: 200 }, () =>
      Dust.createElement(DustWideChild, { count }),
    ),
  );
};

dustSetWide(n => n + 1);
// → 0 component re-runs
// → 200 text node mutations`,
      reactCode: `\
const ReactWideChild = ({ count }) =>
  React.createElement('span', null, count);

const ReactWideBenchmark = () => {
  const [count, setCount] = React.useState(0);
  reactSetWide = setCount;
  return React.createElement('div', null,
    ...Array.from({ length: 200 }, (_, i) =>
      React.createElement(ReactWideChild, { key: i, count }),
    ),
  );
};

flushSync(() => reactSetWide(n => n + 1));
// → 201 component calls per update
// → 1,005,000 total for 5k updates`,
    },
  ]);

  // ── Test 4: 10,000 items with independent state, targeted update × 1,000 ──

  let dustFatPairs: ReturnType<typeof useState<number>>[] = [];
  const DustTargetedUpdateBenchmark = (): JSX.Element => {
    const pairs = Array.from({ length: 10_000 }, (_, i) => useState(i));
    dustFatPairs = pairs;
    return Dust.createElement(
      'div',
      null,
      ...pairs.map(([getter]) => Dust.createElement('span', null, getter)),
    ) as JSX.Element;
  };

  const reactFatSetters: Array<(fn: (n: number) => number) => void> =
    Array(10_000).fill(null);
  const ReactFatItem = ({ index, init }: { index: number; init: number }) => {
    const [count, setCount] = React.useState(init);
    reactFatSetters[index] = setCount;
    return React.createElement('span', null, count);
  };
  const ReactTargetedUpdateBenchmark = () =>
    React.createElement(
      'div',
      null,
      ...Array.from({ length: 10_000 }, (_, i) =>
        React.createElement(ReactFatItem, { key: i, index: i, init: i }),
      ),
    );

  const dustFatEl = runDustBenchmark(DustTargetedUpdateBenchmark);
  const reactFat = runReactBenchmark(ReactTargetedUpdateBenchmark);

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

  teardownDust(dustFatEl);
  teardownReact(reactFat);
  setTestProgress(3, {
    state: 'done',
    speedup: speedup(avg(reactFatRuns), avg(dustFatRuns)),
  });

  setResults((r) => [
    ...r,
    {
      name: 'Targeted update — 10k items, update one',
      description:
        'Both sides use 10k independently-stateful items. React uses individual item components (the fair approach) — only ReactFatItem[5000] re-renders. Dust updates one text node directly with no component re-run.',
      iterations: FAT_N,
      dustRuns: dustFatRuns,
      reactRuns: reactFatRuns,
      dustCode: `\
let dustFatPairs = [];
const DustTargetedUpdateBenchmark = (): JSX.Element => {
  const pairs = Array.from({ length: 10_000 }, (_, i) => useState(i));
  dustFatPairs = pairs;
  return Dust.createElement(
    'div',
    null,
    ...pairs.map(([getter]) => Dust.createElement('span', null, getter)),
  );
};

dustFatPairs[5_000][1](n => n + 1);
// → 1 text node mutation
// → 0 component re-runs`,
      reactCode: `\
const reactFatSetters = Array(10_000).fill(null);
const ReactFatItem = ({ index, init }) => {
  const [count, setCount] = React.useState(init);
  reactFatSetters[index] = setCount;
  return React.createElement('span', null, count);
};
const ReactTargetedUpdateBenchmark = () =>
  React.createElement(
    'div',
    null,
    ...Array.from({ length: 10_000 }, (_, i) =>
      React.createElement(ReactFatItem, { key: i, index: i, init: i }),
    ),
  );

flushSync(() => reactFatSetters[5_000](n => n + 1));
// → only ReactFatItem[5000] re-renders
// → 9,999 components untouched`,
    },
  ]);

  // ── Test 5: Initial render — 5,000 items ────────────────────────────────

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
              createElement('li', null, i),
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
const el = document.createElement('div');
sandboxEl.appendChild(el);
createRoot(el).render(
  createElement('ul', null,
    ...Array.from({ length: 5_000 }, (_, i) =>
      createElement('li', null, i),
    ),
  ),
);
sandboxEl.removeChild(el);`,
      reactCode: `\
const el = document.createElement('div');
sandboxEl.appendChild(el);
const root = reactCreateRoot(el);
flushSync(() =>
  root.render(
    React.createElement('ul', null,
      ...Array.from({ length: 5_000 }, (_, i) =>
        React.createElement('li', { key: i }, i),
      ),
    ),
  ),
);
root.unmount();
sandboxEl.removeChild(el);`,
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
