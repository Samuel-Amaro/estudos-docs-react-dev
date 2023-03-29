/**
 * * CORRIGIR O DESAPARECIMENTO DO TEXTO DE ENTRADA
 *
 * Este exemplo mostra uma mensagem quando você pressiona o botão. No entanto, pressionar o botão também redefine acidentalmente a entrada. Por que isso acontece? Corrija-o para que pressionar o botão não redefina o texto de entrada.
 */

import { useState } from "react";

export default function Challenge1() {
  const [showHint, setShowHint] = useState(false);
  return (
    <div>
      {showHint && (
        <p>
          <i>Hint: Your favorite city?</i>
        </p>
      )}
      <Form />
      <button
        onClick={() => {
          setShowHint(!showHint);
        }}
      >
        {showHint ? "Hide" : "Show"} hint
      </button>
    </div>
  );
}

function Form() {
  const [text, setText] = useState("");
  return <textarea value={text} onChange={(e) => setText(e.target.value)} />;
}
