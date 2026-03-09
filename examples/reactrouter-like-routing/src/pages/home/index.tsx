import Dust, { useState } from 'dust';

import { features } from './data';
import {
  heroWrap,
  badge,
  headline,
  sub,
  ctaRow,
  btnPrimary,
  btnGhost,
  demoWrap,
  demoEyebrow,
  demoInput,
  demoOutput,
  sectionWrap,
  sectionTitle,
  grid,
  card,
  cardIcon,
  cardName,
  cardDesc,
} from './styles';

function Home() {
  const [name, setName] = useState('');
  const [featureItems] = useState(features);

  const onInput = (e: InputEvent) =>
    setName((e.target as HTMLInputElement).value);

  return (
    <>
      <div className={heroWrap}>
        <div className={badge}>✦ Reactive UIs, built differently.</div>
        <h1 className={headline}>
          Zero re-renders,
          <br />
          <strong>by design</strong>.
        </h1>
        <p className={sub}>
          <strong>No virtual DOM.</strong>{' '}
          <strong>No diffing.</strong>{' '}
          <strong>No wasted renders.</strong>{' '}
          <strong>No rerender management.</strong>{' '}
          Components run once — state updates flow directly
          to the <em>exact DOM nodes</em> that depend on them.{' '}
          <strong>No useMemo, no useCallback, no fighting the runtime.</strong>
        </p>
        <div className={ctaRow}>
          <a href="/playground" className={btnPrimary}>
            Try the playground →
          </a>
          <a href="/docs" className={btnGhost}>
            Read the docs
          </a>
        </div>
      </div>

      <div className={demoWrap}>
        <p className={demoEyebrow}>⚡ Live useState demo — type below</p>
        <input
          className={demoInput}
          type="text"
          placeholder="What's your name?"
          onInput={onInput}
        />
        <p className={demoOutput}>
          {name ? (
            <>
              Hello, <strong>{name}</strong>! Welcome to Dust.
            </>
          ) : (
            'Your greeting appears here, reactively.'
          )}
        </p>
      </div>

      <div className={sectionWrap}>
        <h2 className={sectionTitle}>Everything you need, nothing you don't</h2>
        <div className={grid}>
          {featureItems.map((f) => (
            <div className={card}>
              <span className={cardIcon}>{f.icon}</span>
              <code className={cardName}>{f.name}</code>
              <p className={cardDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
