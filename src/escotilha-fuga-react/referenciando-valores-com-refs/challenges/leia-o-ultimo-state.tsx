/**
 * * LEIA O ÚLTIMO ESTADO
 *
 *  Neste exemplo, depois de pressionar “Enviar”, há um pequeno atraso antes que a mensagem seja exibida. Digite “olá”, pressione Enviar e, em seguida, edite rapidamente a entrada novamente. Apesar de suas edições, o alerta ainda mostraria “hello” (que era o valor do estado no momento em que o botão foi clicado).
 *
 * Normalmente, esse comportamento é o que você deseja em um aplicativo. No entanto, pode haver casos ocasionais em que você deseja que algum código assíncrono leia a versão mais recente de algum estado. Você consegue pensar em uma maneira de fazer o alerta mostrar o texto de entrada atual em vez do que era no momento do clique?
 */

import { useState, useRef } from "react";

export default function Chat2() {
    const [text, setText] = useState("");
    const refTextChat = useRef<string>("");

  function handleSend() {
    setTimeout(() => {
      alert("Sending: " + refTextChat.current);
    }, 3000);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
    refTextChat.current = e.target.value;
  }

  return (
    <>
      <input
        value={text}
        onChange={(e) => handleChange(e)}
      />
      <button onClick={handleSend}>Send</button>
    </>
  );
}
