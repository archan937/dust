import Dust, { useState } from 'dust';

function SayHello() {
  const [name, setName] = useState('');
  const onInput = ({ target }) => setName(target.value);

  console.log('Rendering <SayHello />');

  return (
    <div>
      <p>
        What is your name?{' '}
        <input type="text" onKeyDown={onInput} onKeyUp={onInput} />
      </p>
      <p style="font-style: italic; border-left: 4px solid #0070f3; padding-left: 12px;">
        Hello, {name()}!
      </p>
    </div>
  );
}

export default SayHello;
