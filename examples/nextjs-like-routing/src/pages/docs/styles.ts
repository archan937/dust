import { css } from 'dust';

export const pageWrap = css`
  max-width: 780px;
  margin: 0 auto;
  padding: 4rem 2rem 8rem;
`;

export const hero = css`
  margin-bottom: 4rem;
`;

export const pageTitle = css`
  font-size: 2.25rem;
  font-weight: 800;
  color: #f4f4f5;
  letter-spacing: -0.03em;
  margin-bottom: 0.5rem;
`;

export const pageSub = css`
  font-size: 1.05rem;
  color: #71717a;
  line-height: 1.7;
`;

export const toc = css`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 2rem;
`;

export const tocLink = css`
  padding: 0.3rem 0.8rem;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.03);
  color: #818cf8;
  font-size: 0.8rem;
  font-weight: 500;
  text-decoration: none;
  transition: border-color 0.15s, background 0.15s;
  &:hover {
    border-color: rgba(129, 140, 248, 0.4);
    background: rgba(129, 140, 248, 0.08);
  }
`;

export const section = css`
  margin-bottom: 3.5rem;
`;

export const sectionTitle = css`
  font-size: 1.35rem;
  font-weight: 700;
  color: #f4f4f5;
  letter-spacing: -0.02em;
  margin-bottom: 1rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
`;

export const apiName = css`
  font-size: 1rem;
  font-weight: 700;
  color: #a5b4fc;
  font-family: 'SF Mono', 'Fira Code', monospace;
  margin: 1.75rem 0 0.5rem;
`;

export const desc = css`
  font-size: 0.95rem;
  color: #71717a;
  line-height: 1.75;
  margin-bottom: 0.75rem;
  & strong {
    color: #a1a1aa;
    font-weight: 600;
  }
  & code {
    font-family: 'SF Mono', 'Fira Code', monospace;
    font-size: 0.85em;
    color: #818cf8;
    background: rgba(99, 102, 241, 0.1);
    padding: 0.1em 0.35em;
    border-radius: 4px;
  }
`;

export const codeBlock = css`
  background: #111113;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 10px;
  padding: 1.1rem 1.25rem;
  margin: 0.75rem 0 1.25rem;
  overflow-x: auto;
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 0.82rem;
  line-height: 1.75;
  color: #a1a1aa;
  & .kw { color: #818cf8; }
  & .fn { color: #67e8f9; }
  & .str { color: #86efac; }
  & .cmt { color: #3f3f46; }
  & .tag { color: #f9a8d4; }
  & .attr { color: #fde68a; }
`;

export const rule = css`
  height: 1px;
  background: rgba(255, 255, 255, 0.06);
  margin: 3.5rem 0;
`;

export const callout = css`
  padding: 0.9rem 1.1rem;
  border-radius: 8px;
  background: rgba(99, 102, 241, 0.07);
  border: 1px solid rgba(99, 102, 241, 0.18);
  color: #a1a1aa;
  font-size: 0.88rem;
  line-height: 1.7;
  margin: 1rem 0;
  & strong {
    color: #a5b4fc;
  }
  & code {
    font-family: 'SF Mono', 'Fira Code', monospace;
    font-size: 0.85em;
    color: #818cf8;
  }
`;
