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
        <div className={badge}>✦ Zero re-renders by design</div>
        <h1 className={headline}>
          Reactive UIs,
          <br />
          built <strong>differently</strong>.
        </h1>
        <p className={sub}>
          Dust components run <strong>once</strong>. State is a reactive proxy.
          Only the exact DOM nodes that depend on changed state update — nothing
          else.
        </p>
        <div className={ctaRow}>
          <a href="/playground" className={btnPrimary}>
            Try the playground →
          </a>
          <a href="/blog/1" className={btnGhost}>
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
          {name() ? (
            <>
              Hello, <strong>{name()}</strong>! Welcome to Dust.
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
