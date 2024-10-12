import Dust, { useState } from "dust";

function SayHello() {
  const [name, setName] = useState("");
  const onChange = ({ target }) => setName(target.value);

  console.log("Rendering <SayHello/>");

  return (
    <div>
      <p>
        What is your name?{" "}
        <input type="text" onKeyDown={onChange} onKeyUp={onChange} />
      </p>
      <p style="margin-top: 20px; padding: 8px 16px; font-family: Georgia; font-size: 17px; font-style: italic; border-left: 4px solid black">
        Hello, {name()}!<br />
        How are you today?
      </p>
    </div>
  );
}

export default SayHello;
