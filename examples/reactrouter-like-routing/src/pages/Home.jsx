import Dust, { useState } from 'dust';

import Counter from '../components/Counter';
import SayHello from '../components/SayHello';

function Home() {
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(false);

  console.log('Rendering <Home />');

  return (
    <>
      <h1>Welcome to Dust!</h1>
      <p>
        <i>
          A minimalistic reactive JavaScript library for building dynamic
          component-based interfaces. Components are{' '}
          <strong>never re-rendered</strong> — only the reactive parts update.
        </i>
      </p>
      <h3>Say Hello</h3>
      <SayHello />
      <h3>Counter</h3>
      <Counter
        count={count}
        setCount={setCount}
        show={show}
        setShow={setShow}
      />
    </>
  );
}

export default Home;
