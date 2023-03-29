/**
 * * EVITE CONTRADIÇÕES NO ESTADO
 * 
 * Aqui está um formulário de feedback do hotel com isSending variáveis isSent ​​de estado:
*/

import React, { useState } from "react";

export default function FeedbackForm() {
  const [text, setText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSending(true);
    await sendMessage(text);
    setIsSending(false);
    setIsSent(true);
  }

  if (isSent) {
    return <h1>Thanks for feedback!</h1>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>How was your stay at The Prancing Pony?</p>
      <textarea
        disabled={isSending}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <button disabled={isSending} type="submit">
        Send
      </button>
      {isSending && <p>Sending...</p>}
    </form>
  );
}

// Pretend to send a message.
function sendMessage(text: string) {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
}

/**
 * Embora esse código funcione, ele deixa a porta aberta para estados “impossíveis”. Por exemplo, se você esquecer de chamar setIsSent e setIsSending juntos, poderá acabar em uma situação em que isSending e isSent são verdadeiros ao mesmo tempo. Quanto mais complexo for o seu componente, mais difícil será entender o que aconteceu.
 * 
 * Como isSending e isSent nunca devem ser verdadeiros ao mesmo tempo, é melhor substituí-los por uma variável de estado de status que pode assumir um dos três estados válidos: 'digitando' (inicial), 'enviando' e 'enviado':
*/

export function FeedbackForm2() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState('typing');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending'); //enviando
    await sendMessage(text);
    setStatus('sent'); //enviado
  }

  const isSending = status === 'sending';
  const isSent = status === 'sent';

  //enviado
  if (isSent) {
    return <h1>Thanks for feedback!</h1>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>How was your stay at The Prancing Pony?</p>
      <textarea
        disabled={isSending}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <button disabled={isSending} type="submit">
        Send
      </button>
      {isSending && <p>Sending...</p>}
    </form>
  );
}