import Dust, {
  createContext,
  cx,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'dust';

import s from './styles';

interface Note {
  id: number;
  text: string;
}

const [ctxName, setCtxName] = useState('Dust');
const GreetCtx = createContext(ctxName);

const GreetingDisplay = (): JSX.Element => {
  const name = useContext(GreetCtx);
  return (
    <div className={s.context.output}>
      <span>
        👋 Hello, <strong>{name() || 'Dust'}</strong>!
      </span>
      <span className={s.context.badge}>useContext</span>
    </div>
  );
};

const Playground = (): JSX.Element => {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const swToggleRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!running()) return;
    const id = setInterval(() => setElapsed((e) => e + 10), 10);
    return (): void => clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (swToggleRef.current) {
      swToggleRef.current.className = cx(
        s.stopwatch.btn,
        running() ? s.stopwatch.red : s.stopwatch.green,
      );
    }
  }, [running]);

  const fmt = (ms: number): string => {
    const m = String(Math.floor(ms / 60000)).padStart(2, '0');
    const sec = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0');
    const cs = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
    return `${m}:${sec}.${cs}`;
  };

  const [notes, setNotes] = useState<Note[]>([]);
  const [noteInputVal, setNoteInputVal] = useState('');
  const noteInputRef = useRef<HTMLInputElement | null>(null);

  const addNote = (): void => {
    const text = noteInputVal().trim();
    if (!text) return;
    setNotes((n) => [...n, { id: Date.now(), text }]);
    setNoteInputVal('');
    if (noteInputRef.current) noteInputRef.current.value = '';
  };

  const noteItems = notes.map((note) => {
    const [done, setDone] = useState(false);
    const dotRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
      if (dotRef.current) {
        dotRef.current.className = cx(s.note.dot, done() && s.note.dotDone);
      }
    }, [done]);

    return (
      <div className={s.note.item}>
        <button
          ref={dotRef}
          className={s.note.dot}
          onClick={() => setDone((v) => !v)}
        >
          {done() ? '✓' : ''}
        </button>
        <span className={s.note.text}>
          {done() ? <s>{note.text}</s> : note.text}
        </span>
        <button
          className={s.note.delBtn}
          onClick={() => setNotes((n) => n.filter((x) => x !== note))}
        >
          ✕
        </button>
      </div>
    );
  });

  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const [charCount, setCharCount] = useState(0);
  const [mode, setMode] = useState('default');

  const cxRef = useRef<HTMLDivElement | null>(null);
  const modeBtnDefaultRef = useRef<HTMLButtonElement | null>(null);
  const modeBtnBoldRef = useRef<HTMLButtonElement | null>(null);
  const modeBtnItalicRef = useRef<HTMLButtonElement | null>(null);
  const modeBtnLargeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (cxRef.current) {
      cxRef.current.className = cx(
        s.mode.preview,
        mode() === 'bold' && s.mode.bold,
        mode() === 'italic' && s.mode.italic,
        mode() === 'large' && s.mode.large,
      );
    }
    const refs = [
      modeBtnDefaultRef,
      modeBtnBoldRef,
      modeBtnItalicRef,
      modeBtnLargeRef,
    ];
    const vals = ['default', 'bold', 'italic', 'large'];
    refs.forEach((r, i) => {
      if (r.current)
        r.current.className = cx(
          s.mode.btn,
          mode() === vals[i] && s.mode.active,
        );
    });
  }, [mode]);

  return (
    <div className={s.page.wrap}>
      <h1 className={s.page.title}>Playground</h1>
      <p className={s.page.sub}>Interactive demos of every Dust primitive.</p>

      <div className={s.card.grid}>
        <div className={s.card.card}>
          <p className={s.card.label}>useState · useEffect · cx</p>
          <p className={s.card.heading}>Stopwatch</p>
          <div className={s.stopwatch.display}>{() => fmt(elapsed())}</div>
          <div className={s.stopwatch.btnRow}>
            <button
              ref={swToggleRef}
              className={cx(s.stopwatch.btn, s.stopwatch.green)}
              onClick={() => setRunning((v) => !v)}
            >
              {running() ? '⏸ Pause' : '▶ Start'}
            </button>
            <button
              className={cx(s.stopwatch.btn, s.stopwatch.ghost)}
              onClick={() => {
                setRunning(false);
                setElapsed(0);
              }}
            >
              ↺ Reset
            </button>
          </div>
          <div className={s.card.rule} />
          <p className={s.card.hint}>
            useEffect clears interval on cleanup. cx() swaps class via useRef.
          </p>
        </div>

        <div className={s.card.card}>
          <p className={s.card.label}>ReactiveList · useState per item</p>
          <p className={s.card.heading}>Notes</p>
          <div className={s.note.inputRow}>
            <input
              ref={noteInputRef}
              className={s.note.input}
              type="text"
              placeholder="Add a note…"
              onInput={(e) =>
                setNoteInputVal((e.target as HTMLInputElement).value)
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter') addNote();
              }}
            />
            <button className={s.note.addBtn} onClick={addNote}>
              Add
            </button>
          </div>
          <div className={s.note.listWrap}>
            {noteItems}
            {!notes().length && <p className={s.note.empty}>No notes yet.</p>}
          </div>
          <div className={s.card.rule} />
          <p className={s.card.hint}>
            notes.map() → ReactiveList. Each item has its own useState.
          </p>
        </div>

        <div className={s.card.card}>
          <p className={s.card.label}>createContext · useContext</p>
          <p className={s.card.heading}>Context</p>
          <GreetCtx.Provider value={ctxName}>
            <input
              className={s.context.input}
              type="text"
              placeholder="Enter a name…"
              onInput={(e) => setCtxName((e.target as HTMLInputElement).value)}
            />
            <GreetingDisplay />
          </GreetCtx.Provider>
          <div className={s.card.rule} />
          <p className={s.card.hint}>
            GreetingDisplay reads GreetCtx via useContext — no prop drilling.
          </p>
        </div>

        <div className={s.card.card}>
          <p className={s.card.label}>useRef · cx · useEffect</p>
          <p className={s.card.heading}>Refs & Dynamic Classes</p>
          <textarea
            ref={textRef}
            className={s.ref.textarea}
            placeholder="Type something…"
            onInput={(e) =>
              setCharCount((e.target as HTMLTextAreaElement).value.length)
            }
          />
          <p className={s.ref.meta}>
            chars: <span>{charCount}</span>
          </p>
          <div className={s.ref.btnRow}>
            <button
              className={s.ref.btn}
              onClick={() => textRef.current && textRef.current.focus()}
            >
              Focus
            </button>
            <button
              className={s.ref.btn}
              onClick={() => textRef.current && textRef.current.select()}
            >
              Select all
            </button>
            <button
              className={s.ref.btn}
              onClick={() => {
                if (textRef.current) {
                  textRef.current.value = '';
                  setCharCount(0);
                }
              }}
            >
              Clear
            </button>
          </div>
          <div className={s.card.rule} />
          <p className={s.card.hint} style="margin-bottom:0.6rem">
            cx() joins truthy classes, applied via useEffect + useRef:
          </p>
          <div className={s.mode.btnRow}>
            <button
              ref={modeBtnDefaultRef}
              className={cx(s.mode.btn, s.mode.active)}
              onClick={() => setMode('default')}
            >
              Default
            </button>
            <button
              ref={modeBtnBoldRef}
              className={s.mode.btn}
              onClick={() => setMode('bold')}
            >
              Bold
            </button>
            <button
              ref={modeBtnItalicRef}
              className={s.mode.btn}
              onClick={() => setMode('italic')}
            >
              Italic
            </button>
            <button
              ref={modeBtnLargeRef}
              className={s.mode.btn}
              onClick={() => setMode('large')}
            >
              Large
            </button>
          </div>
          <div ref={cxRef} className={s.mode.preview}>
            The quick brown fox jumps over the lazy dog.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playground;
