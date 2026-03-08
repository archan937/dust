import { css } from 'dust';

export const heroWrap = css`
  max-width: 860px;
  margin: 0 auto;
  padding: 7rem 2rem 4rem;
  text-align: center;
`;

export const badge = css`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.85rem;
  border-radius: 9999px;
  border: 1px solid rgba(129, 140, 248, 0.3);
  background: rgba(129, 140, 248, 0.08);
  color: #818cf8;
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-bottom: 2rem;
`;

export const headline = css`
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: #f4f4f5;
  margin-bottom: 1.5rem;
  & strong {
    background: linear-gradient(135deg, #818cf8, #6366f1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

export const sub = css`
  font-size: 1.15rem;
  color: #71717a;
  max-width: 560px;
  margin: 0 auto 2.5rem;
  line-height: 1.7;
  & strong {
    color: #a1a1aa;
  }
`;

export const ctaRow = css`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

export const btnPrimary = css`
  display: inline-flex;
  align-items: center;
  padding: 0.7rem 1.5rem;
  border-radius: 8px;
  background: #6366f1;
  color: #fff;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition:
    background 0.15s,
    transform 0.1s;
  &:hover {
    background: #818cf8;
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(0);
  }
`;

export const btnGhost = css`
  display: inline-flex;
  align-items: center;
  padding: 0.7rem 1.5rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #a1a1aa;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition:
    border-color 0.15s,
    color 0.15s,
    transform 0.1s;
  &:hover {
    border-color: rgba(255, 255, 255, 0.25);
    color: #f4f4f5;
    transform: translateY(-1px);
  }
`;

export const demoWrap = css`
  max-width: 640px;
  margin: 0 auto 5rem;
  padding: 2rem;
  border-radius: 16px;
  background: #18181b;
  border: 1px solid rgba(255, 255, 255, 0.08);
`;

export const demoEyebrow = css`
  font-size: 0.78rem;
  font-weight: 500;
  color: #818cf8;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-bottom: 1.25rem;
`;

export const demoInput = css`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);
  color: #f4f4f5;
  font-size: 1rem;
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

export const demoOutput = css`
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 8px;
  background: rgba(99, 102, 241, 0.06);
  border: 1px solid rgba(99, 102, 241, 0.15);
  color: #a1a1aa;
  font-size: 0.95rem;
  min-height: 3rem;
  display: flex;
  align-items: center;
  & strong {
    color: #818cf8;
    margin: 0 0.2em;
  }
`;

export const sectionWrap = css`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem 6rem;
`;

export const sectionTitle = css`
  font-size: 1.75rem;
  font-weight: 700;
  color: #f4f4f5;
  letter-spacing: -0.02em;
  margin-bottom: 2.5rem;
  text-align: center;
`;

export const grid = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.25rem;
`;

export const card = css`
  padding: 1.75rem;
  border-radius: 12px;
  background: #18181b;
  border: 1px solid rgba(255, 255, 255, 0.07);
  transition:
    border-color 0.2s,
    transform 0.2s;
  &:hover {
    border-color: rgba(129, 140, 248, 0.3);
    transform: translateY(-2px);
  }
`;

export const cardIcon = css`
  display: block;
  font-size: 1.75rem;
  margin-bottom: 0.75rem;
`;

export const cardName = css`
  display: block;
  font-size: 0.95rem;
  font-weight: 600;
  color: #818cf8;
  margin-bottom: 0.5rem;
  font-family: 'SF Mono', 'Fira Code', 'Fira Mono', monospace;
`;

export const cardDesc = css`
  font-size: 0.875rem;
  color: #71717a;
  line-height: 1.65;
`;
