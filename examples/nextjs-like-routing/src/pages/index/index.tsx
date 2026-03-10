import Dust, { useState } from 'dust';

import { features } from './data';
import s from './styles';

const Home = (): JSX.Element => {
  const [name, setName] = useState('');
  const [featureItems] = useState(features);

  const onInput = (e: InputEvent): void =>
    setName((e.target as HTMLInputElement).value);

  return (
    <>
      <div className={s.hero.wrap}>
        <div className={s.hero.badge}>✦ Reactive UIs, built differently.</div>
        <h1 className={s.hero.headline}>
          Zero re-renders,
          <br />
          <strong>by design</strong>.
        </h1>
        <p className={s.hero.sub}>
          <strong>No virtual DOM.</strong> <strong>No diffing.</strong>{' '}
          <strong>No wasted renders.</strong>{' '}
          <strong>No rerender management.</strong> Components run once — state
          updates flow directly to the <em>exact DOM nodes</em> that depend on
          them.{' '}
          <strong>No useMemo, no useCallback, no fighting the runtime.</strong>
        </p>
        <div className={s.cta.row}>
          <a href="/playground" className={s.cta.primary}>
            Try the playground →
          </a>
          <a href="/docs" className={s.cta.ghost}>
            Read the docs
          </a>
        </div>
      </div>

      <div className={s.demo.wrap}>
        <p className={s.demo.eyebrow}>⚡ Live useState demo — type below</p>
        <input
          className={s.demo.input}
          type="text"
          placeholder="What's your name?"
          onInput={onInput}
        />
        <p className={s.demo.output}>
          {name ? (
            <>
              Hello, <strong>{name}</strong>! Welcome to Dust.
            </>
          ) : (
            'Your greeting appears here, reactively.'
          )}
        </p>
      </div>

      <div className={s.section.wrap}>
        <h2 className={s.section.title}>
          Everything you need, nothing you don't
        </h2>
        <div className={s.card.grid}>
          {featureItems.map((f) => (
            <div className={s.card.base}>
              <span className={s.card.icon}>{f.icon}</span>
              <code className={s.card.name}>{f.name}</code>
              <p className={s.card.desc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
