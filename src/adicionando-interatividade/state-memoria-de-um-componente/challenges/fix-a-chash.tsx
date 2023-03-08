import { useState } from "react";

/**
 * * Estado é isolado e privado
 *  
 * Aqui está um pequeno formulário que deve permitir que o usuário deixe algum feedback. Quando o feedback é enviado, ele deve exibir uma mensagem de agradecimento. No entanto, ele trava com uma mensagem de erro dizendo “Renderizou menos ganchos do que o esperado”. Você consegue identificar o erro e corrigi-lo?
 * 
 * @returns 
*/

export default function FeedbackForm() {
  const [isSent, setIsSent] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  return (
    <>
      {isSent && <h1>Thank you!</h1>}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert(`Sending: "${message}"`);
          setIsSent(true);
        }}
      >
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <br />
        <button type="submit">Send</button>
      </form>
    </>
  );
}
