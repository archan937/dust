import { css } from 'dust';

export const articleOuter = css`
  max-width: 720px;
  margin: 0 auto;
  padding: 4rem 2rem 6rem;
`;

export const articleMeta = css`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.75rem;
`;

export const articleTag = css`
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #818cf8;
  background: rgba(129, 140, 248, 0.1);
  border: 1px solid rgba(129, 140, 248, 0.2);
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
`;

export const articleId = css`
  font-size: 0.8rem;
  color: #52525b;
  font-family: 'SF Mono', 'Fira Code', monospace;
`;

export const articleTitle = css`
  font-size: clamp(1.75rem, 4vw, 2.75rem);
  font-weight: 800;
  color: #f4f4f5;
  letter-spacing: -0.03em;
  line-height: 1.2;
  margin-bottom: 1rem;
`;

export const articleLead = css`
  font-size: 1.1rem;
  color: #71717a;
  line-height: 1.75;
  margin-bottom: 2.5rem;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
`;

export const articleBody = css`
  color: #a1a1aa;
  line-height: 1.8;
  font-size: 1rem;
`;

export const articleSection = css`
  margin-bottom: 2rem;
  & h2 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #f4f4f5;
    margin-bottom: 0.75rem;
    letter-spacing: -0.01em;
  }
  & p {
    margin-bottom: 1rem;
  }
  & code {
    font-family: 'SF Mono', 'Fira Code', monospace;
    font-size: 0.85em;
    background: rgba(255, 255, 255, 0.06);
    padding: 0.15em 0.4em;
    border-radius: 4px;
    color: #818cf8;
  }
`;

export const navRow = css`
  display: flex;
  gap: 1rem;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
`;

export const navLink = css`
  display: inline-flex;
  align-items: center;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #71717a;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition:
    border-color 0.15s,
    color 0.15s;
  &:hover {
    border-color: rgba(255, 255, 255, 0.2);
    color: #f4f4f5;
  }
`;

export const navLinkNext = css`
  margin-left: auto;
`;
