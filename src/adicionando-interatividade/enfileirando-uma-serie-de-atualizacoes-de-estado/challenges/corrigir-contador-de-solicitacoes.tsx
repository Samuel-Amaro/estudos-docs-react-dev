/**
 * * Corrigir um contador de solicitações
 *
 * Você está trabalhando em um aplicativo de mercado de arte que permite ao usuário enviar vários pedidos de um item de arte ao mesmo tempo. Cada vez que o usuário pressiona o botão “Comprar”, o contador “Pendente” deve aumentar em um. Após três segundos, o contador “Pendente” deve diminuir e o contador “Concluído” deve aumentar.
 *
 * No entanto, o contador “Pendente” não se comporta conforme o esperado. Quando você pressiona “Comprar”, diminui para -1(o que não deveria ser possível!). E se você clicar rápido duas vezes, ambos os contadores parecem se comportar de forma imprevisível.
 *
 * Por que isso acontece? Fixe ambos os contadores.
 */

import { useState } from "react";

export default function RequestTracker() {
  const [pending, setPending] = useState(0);
  const [completed, setCompleted] = useState(0);

  async function handleClick() {
    setPending((pending) => pending + 1);
    await delay(3000);
    setPending((pending) => pending - 1);
    setCompleted((completed) => completed + 1);
  }

  return (
    <>
      <h3>Pending: {pending}</h3>
      <h3>Completed: {completed}</h3>
      <button onClick={handleClick}>Buy</button>
    </>
  );
}

function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
