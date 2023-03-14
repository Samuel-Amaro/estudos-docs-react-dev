/**
 * * CONFIGURANDO RENDERIZAÇÕES DE ACIONADORES DE ESTADO
 *
 * Você pode pensar na interface do usuário como sendo alterada diretamente em resposta ao evento do usuário, como um clique. No React, funciona um pouco diferente desse modelo mental. Na página anterior, você viu que definir o estado solicita uma nova renderização do React. Isso significa que para uma interface reagir ao evento, você precisa atualizar o state .
 *
 * Neste exemplo, quando você pressiona “enviar”, setIsSent(true) diz ao React para renderizar novamente a interface do usuário:
 */

import { useState } from "react";

export default function Form() {
  const [isSent, setIsSent] = useState(false);
  const [message, setMessage] = useState("Hi!");

  if (isSent) {
    return <h1>Your message is on its way!</h1>;
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setIsSent(true);
        //setMessage(message);
        sendMessage(message);
      }}
    >
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}


function sendMessage(message: string) {
    //...
}

/**
 * Veja o que acontece quando você clica no botão:
 * 
    *  O onSubmit manipulador de eventos é executado.
    * 
    * setIsSent(true) define isSente true enfileira uma nova renderização.
    *
    * O React renderiza novamente o componente de acordo com o novo isSentvalor.
    * 
 * Vamos dar uma olhada mais de perto na relação entre estado e renderização. 
*/