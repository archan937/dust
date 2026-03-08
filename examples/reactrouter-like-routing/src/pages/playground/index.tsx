import Dust, {
  cx,
  useState,
  useEffect,
  useRef,
  createContext,
  useContext,
} from 'dust';

import {
  pageWrap,
  pageTitle,
  pageSub,
  demoGrid,
  demoCard,
  cardLabel,
  cardHeading,
  rule,
  hint,
  swDisplay,
  swBtnRow,
  swBtn,
  swBtnGreen,
  swBtnRed,
  swBtnGhost,
  noteInputRow,
  noteInputEl,
  noteAddBtn,
  noteListWrap,
  noteItem,
  noteDot,
  noteDotDone,
  noteTextEl,
  noteDelBtn,
  emptyMsg,
  ctxInputEl,
  ctxOutputEl,
  ctxBadge,
  refTextarea,
  refMeta,
  refBtnRow,
  refBtn,
  modeBtnRow,
  modeBtn,
  modeBtnActive,
  cxPreviewEl,
  cxBold,
  cxItalic,
  cxLarge,
} from './styles';

interface Note {
  id: number;
  text: string;
}

const [ctxName, setCtxName] = useState('Dust');
const GreetCtx = createContext(ctxName);

function GreetingDisplay() {
  const name = useContext(GreetCtx);
  return (
    <div className={ctxOutputEl}>
      <span>
        👋 Hello, <strong>{name()}</strong>!
      </span>
      <span className={ctxBadge}>useContext</span>
    </div>
  );
}

function Playground() {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const swToggleRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!running()) return;
    const id = setInterval(() => setElapsed((e) => e + 10), 10);
    return () => clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (swToggleRef.current) {
      swToggleRef.current.className = cx(
        swBtn,
        running() ? swBtnRed : swBtnGreen,
      );
    }
  }, [running]);

  const fmt = (ms: number) => {
    const m = String(Math.floor(ms / 60000)).padStart(2, '0');
    const s = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0');
    const cs = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
    return `${m}:${s}.${cs}`;
  };

  const [notes, setNotes] = useState<Note[]>([]);
  const [noteInputVal, setNoteInputVal] = useState('');
  const noteInputRef = useRef<HTMLInputElement | null>(null);

  const addNote = () => {
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
        dotRef.current.className = cx(noteDot, done() && noteDotDone);
      }
    }, [done]);

    return (
      <div className={noteItem}>
        <button
          ref={dotRef}
          className={noteDot}
          onClick={() => setDone((v) => !v)}
        >
          {done() ? '✓' : ''}
        </button>
        <span className={noteTextEl}>
          {done() ? <s>{note.text}</s> : note.text}
        </span>
        <button
          className={noteDelBtn}
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
        cxPreviewEl,
        mode() === 'bold' && cxBold,
        mode() === 'italic' && cxItalic,
        mode() === 'large' && cxLarge,
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
        r.current.className = cx(modeBtn, mode() === vals[i] && modeBtnActive);
    });
  }, [mode]);

  return (
    <div className={pageWrap}>
      <h1 className={pageTitle}>Playground</h1>
      <p className={pageSub}>Interactive demos of every Dust primitive.</p>

      <div className={demoGrid}>
        <div className={demoCard}>
          <p className={cardLabel}>useState · useEffect · cx</p>
          <p className={cardHeading}>Stopwatch</p>
          <div className={swDisplay}>{() => fmt(elapsed())}</div>
          <div className={swBtnRow}>
            <button
              ref={swToggleRef}
              className={cx(swBtn, swBtnGreen)}
              onClick={() => setRunning((v) => !v)}
            >
              {running() ? '⏸ Pause' : '▶ Start'}
            </button>
            <button
              className={cx(swBtn, swBtnGhost)}
              onClick={() => {
                setRunning(false);
                setElapsed(0);
              }}
            >
              ↺ Reset
            </button>
          </div>
          <div className={rule} />
          <p className={hint}>
            useEffect clears interval on cleanup. cx() swaps class via useRef.
          </p>
        </div>

        <div className={demoCard}>
          <p className={cardLabel}>ReactiveList · useState per item</p>
          <p className={cardHeading}>Notes</p>
          <div className={noteInputRow}>
            <input
              ref={noteInputRef}
              className={noteInputEl}
              type="text"
              placeholder="Add a note…"
              onInput={(e) =>
                setNoteInputVal((e.target as HTMLInputElement).value)
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter') addNote();
              }}
            />
            <button className={noteAddBtn} onClick={addNote}>
              Add
            </button>
          </div>
          <div className={noteListWrap}>
            {noteItems}
            {!notes().length && <p className={emptyMsg}>No notes yet.</p>}
          </div>
          <div className={rule} />
          <p className={hint}>
            notes.map() → ReactiveList. Each item has its own useState.
          </p>
        </div>

        <div className={demoCard}>
          <p className={cardLabel}>createContext · useContext</p>
          <p className={cardHeading}>Context</p>
          <GreetCtx.Provider value={ctxName}>
            <input
              className={ctxInputEl}
              type="text"
              placeholder="Enter a name…"
              onInput={(e) => setCtxName((e.target as HTMLInputElement).value)}
            />
            <GreetingDisplay />
          </GreetCtx.Provider>
          <div className={rule} />
          <p className={hint}>
            GreetingDisplay reads GreetCtx via useContext — no prop drilling.
          </p>
        </div>

        <div className={demoCard}>
          <p className={cardLabel}>useRef · cx · useEffect</p>
          <p className={cardHeading}>Refs & Dynamic Classes</p>
          <textarea
            ref={textRef}
            className={refTextarea}
            placeholder="Type something…"
            onInput={(e) =>
              setCharCount((e.target as HTMLTextAreaElement).value.length)
            }
          />
          <p className={refMeta}>
            chars: <span>{charCount()}</span>
          </p>
          <div className={refBtnRow}>
            <button
              className={refBtn}
              onClick={() => textRef.current && textRef.current.focus()}
            >
              Focus
            </button>
            <button
              className={refBtn}
              onClick={() => textRef.current && textRef.current.select()}
            >
              Select all
            </button>
            <button
              className={refBtn}
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
          <div className={rule} />
          <p className={hint} style="margin-bottom:0.6rem">
            cx() joins truthy classes, applied via useEffect + useRef:
          </p>
          <div className={modeBtnRow}>
            <button
              ref={modeBtnDefaultRef}
              className={cx(modeBtn, modeBtnActive)}
              onClick={() => setMode('default')}
            >
              Default
            </button>
            <button
              ref={modeBtnBoldRef}
              className={modeBtn}
              onClick={() => setMode('bold')}
            >
              Bold
            </button>
            <button
              ref={modeBtnItalicRef}
              className={modeBtn}
              onClick={() => setMode('italic')}
            >
              Italic
            </button>
            <button
              ref={modeBtnLargeRef}
              className={modeBtn}
              onClick={() => setMode('large')}
            >
              Large
            </button>
          </div>
          <div ref={cxRef} className={cxPreviewEl}>
            The quick brown fox jumps over the lazy dog.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Playground;
