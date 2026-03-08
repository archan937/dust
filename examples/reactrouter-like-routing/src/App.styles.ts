import { css } from 'dust';

export const nav = css`
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 0 2rem;
  height: 60px;
  background: rgba(9, 9, 11, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

export const navLogo = css`
  font-size: 1.1rem;
  font-weight: 700;
  color: #818cf8;
  text-decoration: none;
  letter-spacing: -0.02em;
  margin-right: auto;
  &:hover {
    color: #a5b4fc;
  }
`;

export const navLink = css`
  font-size: 0.875rem;
  font-weight: 500;
  color: #71717a;
  text-decoration: none;
  transition: color 0.15s;
  &:hover {
    color: #f4f4f5;
  }
`;

export const pageWrap = css`
  min-height: calc(100vh - 60px);
`;
