/**
 * * ENVIE UM FORMULÁRIO SEM EFEITOS
 * 
 *  Este Form componente permite enviar uma mensagem a um amigo. Quando você envia o formulário, a showForm variável de estado é definida como false. Isso aciona uma chamada de efeito sendMessage(message), que envia a mensagem (você pode vê-la no console). Depois que a mensagem é enviada, você vê uma caixa de diálogo “Obrigado” com um botão “Abrir chat” que permite voltar ao formulário.
 * 
 * Os usuários do seu aplicativo estão enviando muitas mensagens. Para tornar o bate-papo um pouco mais difícil, você decidiu mostrar primeiro a caixa de diálogo "Obrigado" em vez do formulário. Altere a showFormvariável de estado para inicializar falseem vez de true. Assim que você fizer essa alteração, o console mostrará que uma mensagem vazia foi enviada. Algo nessa lógica está errado!
 * 
 * Qual é a causa raiz desse problema? E como você pode consertar isso?
*/

import { useState, useEffect } from "react";

export default function FormSubmitMessageApp() {
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");

  /*useEffect(() => {
    if (!showForm) {
      sendMessage(message);
    }
  }, [showForm, message]);
  */

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setShowForm(false);
    sendMessage(message);
  }

  if (!showForm) {
    return (
      <>
        <h1>Thanks for using our services!</h1>
        <button
          onClick={() => {
            setMessage("");
            setShowForm(true);
          }}
        >
          Open chat
        </button>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit" disabled={message === ""}>
        Send
      </button>
    </form>
  );
}

function sendMessage(message: string) {
  console.log("Sending message: " + message);
}
