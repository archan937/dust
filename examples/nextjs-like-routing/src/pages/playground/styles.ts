import { css } from 'dust';

const page = {
  wrap: css`
    max-width: 1100px;
    margin: 0 auto;
    padding: 4rem 2rem 6rem;
  `,
  title: css`
    font-size: 2.25rem;
    font-weight: 800;
    color: #f4f4f5;
    letter-spacing: -0.03em;
    margin-bottom: 0.35rem;
  `,
  sub: css`
    color: #71717a;
    font-size: 1rem;
    margin-bottom: 3rem;
  `,
};

const card = {
  grid: css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(460px, 1fr));
    gap: 1.5rem;
  `,
  card: css`
    padding: 2rem;
    border-radius: 16px;
    background: #18181b;
    border: 1px solid rgba(255, 255, 255, 0.08);
  `,
  label: css`
    font-size: 0.68rem;
    font-weight: 600;
    color: #818cf8;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 0.3rem;
    font-family: 'SF Mono', 'Fira Code', monospace;
  `,
  heading: css`
    font-size: 1.15rem;
    font-weight: 700;
    color: #f4f4f5;
    margin-bottom: 1.5rem;
    letter-spacing: -0.01em;
  `,
  rule: css`
    height: 1px;
    background: rgba(255, 255, 255, 0.06);
    margin: 1.25rem 0;
  `,
  hint: css`
    font-size: 0.75rem;
    color: #3f3f46;
    font-family: 'SF Mono', 'Fira Code', monospace;
  `,
};

const stopwatch = {
  display: css`
    font-size: 3rem;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.03em;
    color: #f4f4f5;
    font-family: 'SF Mono', 'Fira Code', monospace;
    margin-bottom: 1.5rem;
    text-align: center;
  `,
  btnRow: css`
    display: flex;
    gap: 0.75rem;
    justify-content: center;
  `,
  btn: css`
    padding: 0 1.4rem;
    min-width: 7.5rem;
    height: 2.25rem;
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    border: none;
    transition:
      opacity 0.15s,
      transform 0.1s;
    &:hover {
      opacity: 0.8;
      transform: translateY(-1px);
    }
    &:active {
      transform: translateY(0);
    }
  `,
  green: css`
    background: rgba(74, 222, 128, 0.15);
    color: #4ade80;
    border: 1px solid rgba(74, 222, 128, 0.3) !important;
  `,
  red: css`
    background: rgba(248, 113, 113, 0.15);
    color: #f87171;
    border: 1px solid rgba(248, 113, 113, 0.3) !important;
  `,
  ghost: css`
    background: rgba(255, 255, 255, 0.05);
    color: #71717a;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
  `,
};

const note = {
  inputRow: css`
    display: flex;
    gap: 0.6rem;
    margin-bottom: 0.75rem;
  `,
  input: css`
    flex: 1;
    padding: 0.6rem 0.9rem;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.04);
    color: #f4f4f5;
    font-size: 0.9rem;
    font-family: inherit;
    outline: none;
    transition: border-color 0.15s;
    &:focus {
      border-color: #6366f1;
    }
    &::placeholder {
      color: #52525b;
    }
  `,
  addBtn: css`
    padding: 0.6rem 1rem;
    border-radius: 8px;
    background: #6366f1;
    color: #fff;
    font-size: 0.875rem;
    font-weight: 600;
    font-family: inherit;
    border: none;
    cursor: pointer;
    transition: background 0.15s;
    &:hover {
      background: #818cf8;
    }
  `,
  listWrap: css`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    min-height: 2rem;
  `,
  item: css`
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.55rem 0.75rem;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.06);
  `,
  dot: css`
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 1.5px solid #52525b;
    background: transparent;
    color: #4ade80;
    font-size: 0.7rem;
    font-weight: 700;
    cursor: pointer;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: inherit;
    transition:
      border-color 0.15s,
      background 0.15s;
    &:hover {
      border-color: #4ade80;
    }
  `,
  dotDone: css`
    border-color: #4ade80;
    background: rgba(74, 222, 128, 0.12);
  `,
  text: css`
    flex: 1;
    font-size: 0.875rem;
    color: #a1a1aa;
    & s {
      color: #52525b;
    }
  `,
  delBtn: css`
    width: 22px;
    height: 22px;
    border-radius: 4px;
    border: none;
    background: transparent;
    color: #3f3f46;
    font-size: 0.8rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: inherit;
    transition:
      color 0.15s,
      background 0.15s;
    &:hover {
      color: #f87171;
      background: rgba(248, 113, 113, 0.1);
    }
  `,
  empty: css`
    color: #3f3f46;
    font-size: 0.875rem;
    text-align: center;
    padding: 0.75rem 0;
  `,
};

const context = {
  input: css`
    width: 100%;
    padding: 0.6rem 0.9rem;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.04);
    color: #f4f4f5;
    font-size: 0.9rem;
    font-family: inherit;
    outline: none;
    margin-bottom: 1rem;
    transition: border-color 0.15s;
    &:focus {
      border-color: #6366f1;
    }
    &::placeholder {
      color: #52525b;
    }
  `,
  output: css`
    padding: 0.85rem 1.1rem;
    border-radius: 10px;
    background: rgba(99, 102, 241, 0.07);
    border: 1px solid rgba(99, 102, 241, 0.18);
    color: #a1a1aa;
    font-size: 0.95rem;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
    & strong {
      color: #818cf8;
    }
  `,
  badge: css`
    margin-left: auto;
    font-size: 0.68rem;
    font-weight: 500;
    color: #52525b;
    font-family: 'SF Mono', 'Fira Code', monospace;
    background: rgba(255, 255, 255, 0.04);
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
  `,
};

const ref = {
  textarea: css`
    width: 100%;
    padding: 0.75rem 0.9rem;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.04);
    color: #f4f4f5;
    font-size: 0.9rem;
    font-family: inherit;
    outline: none;
    resize: vertical;
    min-height: 80px;
    transition: border-color 0.15s;
    &:focus {
      border-color: #6366f1;
    }
    &::placeholder {
      color: #52525b;
    }
  `,
  meta: css`
    margin: 0.6rem 0 1rem;
    font-size: 0.8rem;
    color: #52525b;
    font-family: 'SF Mono', 'Fira Code', monospace;
    & span {
      color: #818cf8;
    }
  `,
  btnRow: css`
    display: flex;
    gap: 0.6rem;
    margin-bottom: 1.25rem;
  `,
  btn: css`
    padding: 0.45rem 0.9rem;
    border-radius: 7px;
    font-size: 0.8rem;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.04);
    color: #71717a;
    transition: all 0.15s;
    &:hover {
      color: #f4f4f5;
      border-color: rgba(255, 255, 255, 0.2);
    }
  `,
};

const mode = {
  btnRow: css`
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-top: 0.5rem;
  `,
  btn: css`
    padding: 0.38rem 0.85rem;
    border-radius: 6px;
    font-size: 0.8rem;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: transparent;
    color: #52525b;
    transition: all 0.15s;
    &:hover {
      color: #a1a1aa;
    }
  `,
  active: css`
    background: rgba(99, 102, 241, 0.15);
    border-color: rgba(99, 102, 241, 0.4);
    color: #818cf8;
  `,
  preview: css`
    margin-top: 0.75rem;
    padding: 0.65rem 0.9rem;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.07);
    background: rgba(255, 255, 255, 0.02);
    font-size: 0.9rem;
    color: #a1a1aa;
    min-height: 2.5rem;
    display: flex;
    align-items: center;
  `,
  bold: css`
    font-weight: 700;
    color: #f4f4f5;
  `,
  italic: css`
    font-style: italic;
    color: #818cf8;
  `,
  large: css`
    font-size: 1.15rem;
    letter-spacing: 0.03em;
    color: #a5b4fc;
  `,
};

export default { page, card, stopwatch, note, context, ref, mode };
