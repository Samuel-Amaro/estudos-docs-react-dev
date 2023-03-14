/**
 * * A RENDERIZAÇÃO TIRA UM INSTANTANEO DO TEMPO
 * 
 *  Aqui está um pequeno experimento para mostrar como isso funciona. Neste exemplo, você pode esperar que clicar no botão “+3” aumentaria o contador três vezes porque ele chama setNumber(number + 1)três vezes.
 * 
 * Veja o que acontece quando você clica no botão “+3”:
*/

import { useState } from "react";

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button
        onClick={() => {
          // Definir o estado apenas o altera para a próxima renderização.
          setNumber(number + 1);
          setNumber(number + 1);
          setNumber(number + 1);
        }}
      >
        +3
      </button>
    </>
  );
}

/**
 * Observe que number apenas incrementa uma vez por clique!
 * 
 * Definir o estado apenas o altera para a próxima renderização. Durante a primeira renderização, number foi 0. É por isso que, no handler desse render onClick , o valor de number is ainda é 0 mesmo depois de setNumber(number + 1)ter sido chamado:
 * 
 * Aqui está o que o manipulador de cliques deste botão diz ao React para fazer:
 * 
    * setNumber(number + 1): number é 0 assim setNumber(0 + 1). O React se prepara para mudar number para 1 na próxima renderização.
    * 
    * setNumber(number + 1): number é 0 assim setNumber(0 + 1). O React se prepara para mudar number para 1 na próxima renderização.
    * 
    * setNumber(number + 1): number é 0 assim setNumber(0 + 1). O React se prepara para mudar number para 1 na próxima renderização.
    * 
 * Mesmo que você tenha chamado setNumber(number + 1) três vezes, o manipulador de eventos dessa renderização number é sempre 0, portanto, você define o estado como 1 três vezes. É por isso que, após a conclusão do manipulador de eventos, o React renderiza novamente o componente com number igual a 1 em vez de 3. 
 * 
 * Você também pode visualizar isso substituindo mentalmente as variáveis ​​de estado por seus valores em seu código. 
 * 
 * É por isso que clicar no botão novamente definirá o contador para 2, depois para 3 no próximo clique e assim por diante.
*/