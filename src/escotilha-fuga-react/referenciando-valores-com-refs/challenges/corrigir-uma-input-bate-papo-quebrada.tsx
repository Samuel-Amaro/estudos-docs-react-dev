/**
 * * CORRIGIR UMA INPUT DE BATE-BAPO QUEBRADA
 * 
 * Digite uma mensagem e clique em “Enviar”. Você notará que há um atraso de três segundos antes de ver a mensagem "Enviado!" alerta. Durante esse atraso, você pode ver um botão "Desfazer". Clique. Este botão "Desfazer" deve parar o "Enviado!" mensagem apareça. Ele faz isso chamando clearTimeout o ID de tempo limite salvo durante handleSend. No entanto, mesmo depois de clicar em “Desfazer”, a mensagem “Enviado!” mensagem ainda aparece. Descubra por que não funciona e corrija-o.
*/

import { useRef, useState } from "react";

export default function Chat() {
  const [text, setText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const timeoutID = useRef<number | null>(null);

  function handleSend() {
    setIsSending(true);
    timeoutID.current = setTimeout(() => {
      alert("Sent!");
      setIsSending(false);
    }, 3000);
  }

  function getRef() {
    if(!timeoutID.current) {
        return undefined;
    }
    return timeoutID.current;
  }

  function handleUndo() {
    setIsSending(false);
    clearTimeout(getRef());
  }

  return (
    <>
      <input
        disabled={isSending}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button disabled={isSending} onClick={handleSend}>
        {isSending ? "Sending..." : "Send"}
      </button>
      {isSending && <button onClick={handleUndo}>Undo</button>}
    </>
  );
}