/**
 * * O QUE ACONTECE SE VOCÊ SUBSTITUIR O ESTADO DEPOIS DE ATUALIZÁ-LO
 * 
 *  Vamos tentar mais um exemplo. O que você acha que number estará na próxima renderização?
*/


import { useState } from "react";

export default function Counter5() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button
        onClick={() => {
          //durante a proxima renderização, o react passa pela fila de estado

          //para resumo podemos pensar no que esta passando para o setNumber configurador de estado

          //qualquer outro valor como um 5 adiciona "substituir por 5", a fila, ignorando oque já está na fila.
          //substitui por 5
          setNumber(number + 5);

          //n => n + 1, uma função de atualização é adicionado á fila de estado
          //atualiza para 6
          setNumber((n) => n + 1);

          //substitui por 42
          setNumber(42);

          //Em seguida, o React armazena 42 como o resultado final e o retorna de useState.

          /**
           * Depois que o manipulador de eventos for concluído, o React acionará uma nova renderização. Durante a re-renderização, o React processará a fila. As funções do atualizador são executadas durante a renderização, portanto, as funções do atualizador devem ser puras e retornar apenas o resultado. Não tente definir o estado de dentro deles ou executar outros efeitos colaterais. No Strict Mode, o React executará cada função do atualizador duas vezes (mas descartará o segundo resultado) para ajudá-lo a encontrar erros.
           */
        }}
      >
        Increase the number
      </button>
    </>
  );
}
