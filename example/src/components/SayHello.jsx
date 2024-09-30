import Hydrogen, { useState } from "hydrogen.js";

function SayHello() {
  const [name, setName] = useState("");

  console.log("Rendering <SayHello/>");

  return (
    <div>
      <p>
        What is your name?{" "}
        <input type="text" onKeyUp={(event) => setName(event.target.value)} />
      </p>
      <p style="margin-top: 20px; padding: 8px 16px; font-family: Georgia; font-size: 17px; font-style: italic; border-left: 4px solid black">
        Hello, {name()}!<br />
        How are you today?
      </p>
    </div>
  );
}

export default SayHello;
