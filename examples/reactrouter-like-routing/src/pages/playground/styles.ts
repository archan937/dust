import { css } from 'dust';

export const pageWrap = css`
  max-width: 1100px;
  margin: 0 auto;
  padding: 4rem 2rem 6rem;
`;

export const pageTitle = css`
  font-size: 2.25rem;
  font-weight: 800;
  color: #f4f4f5;
  letter-spacing: -0.03em;
  margin-bottom: 0.35rem;
`;

export const pageSub = css`
  color: #71717a;
  font-size: 1rem;
  margin-bottom: 3rem;
`;

export const demoGrid = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(460px, 1fr));
  gap: 1.5rem;
`;

export const demoCard = css`
  padding: 2rem;
  border-radius: 16px;
  background: #18181b;
  border: 1px solid rgba(255, 255, 255, 0.08);
`;

export const cardLabel = css`
  font-size: 0.68rem;
  font-weight: 600;
  color: #818cf8;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 0.3rem;
  font-family: 'SF Mono', 'Fira Code', monospace;
`;

export const cardHeading = css`
  font-size: 1.15rem;
  font-weight: 700;
  color: #f4f4f5;
  margin-bottom: 1.5rem;
  letter-spacing: -0.01em;
`;

export const rule = css`
  height: 1px;
  background: rgba(255, 255, 255, 0.06);
  margin: 1.25rem 0;
`;

export const hint = css`
  font-size: 0.75rem;
  color: #3f3f46;
  font-family: 'SF Mono', 'Fira Code', monospace;
`;

export const swDisplay = css`
  font-size: 3rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.03em;
  color: #f4f4f5;
  font-family: 'SF Mono', 'Fira Code', monospace;
  margin-bottom: 1.5rem;
  text-align: center;
`;

export const swBtnRow = css`
  display: flex;
  gap: 0.75rem;
  justify-content: center;
`;

export const swBtn = css`
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
`;

export const swBtnGreen = css`
  background: rgba(74, 222, 128, 0.15);
  color: #4ade80;
  border: 1px solid rgba(74, 222, 128, 0.3) !important;
`;

export const swBtnRed = css`
  background: rgba(248, 113, 113, 0.15);
  color: #f87171;
  border: 1px solid rgba(248, 113, 113, 0.3) !important;
`;

export const swBtnGhost = css`
  background: rgba(255, 255, 255, 0.05);
  color: #71717a;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
`;

export const noteInputRow = css`
  display: flex;
  gap: 0.6rem;
  margin-bottom: 0.75rem;
`;

export const noteInputEl = css`
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
`;

export const noteAddBtn = css`
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
`;

export const noteListWrap = css`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-height: 2rem;
`;

export const noteItem = css`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.55rem 0.75rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
`;

export const noteDot = css`
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
`;

export const noteDotDone = css`
  border-color: #4ade80;
  background: rgba(74, 222, 128, 0.12);
`;

export const noteTextEl = css`
  flex: 1;
  font-size: 0.875rem;
  color: #a1a1aa;
  & s {
    color: #52525b;
  }
`;

export const noteDelBtn = css`
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
`;

export const emptyMsg = css`
  color: #3f3f46;
  font-size: 0.875rem;
  text-align: center;
  padding: 0.75rem 0;
`;

export const ctxInputEl = css`
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
`;

export const ctxOutputEl = css`
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
`;

export const ctxBadge = css`
  margin-left: auto;
  font-size: 0.68rem;
  font-weight: 500;
  color: #52525b;
  font-family: 'SF Mono', 'Fira Code', monospace;
  background: rgba(255, 255, 255, 0.04);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
`;

export const refTextarea = css`
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
`;

export const refMeta = css`
  margin: 0.6rem 0 1rem;
  font-size: 0.8rem;
  color: #52525b;
  font-family: 'SF Mono', 'Fira Code', monospace;
  & span {
    color: #818cf8;
  }
`;

export const refBtnRow = css`
  display: flex;
  gap: 0.6rem;
  margin-bottom: 1.25rem;
`;

export const refBtn = css`
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
`;

export const modeBtnRow = css`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
`;

export const modeBtn = css`
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
`;

export const modeBtnActive = css`
  background: rgba(99, 102, 241, 0.15);
  border-color: rgba(99, 102, 241, 0.4);
  color: #818cf8;
`;

export const cxPreviewEl = css`
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
`;

export const cxBold = css`
  font-weight: 700;
  color: #f4f4f5;
`;

export const cxItalic = css`
  font-style: italic;
  color: #818cf8;
`;

export const cxLarge = css`
  font-size: 1.15rem;
  letter-spacing: 0.03em;
  color: #a5b4fc;
`;
