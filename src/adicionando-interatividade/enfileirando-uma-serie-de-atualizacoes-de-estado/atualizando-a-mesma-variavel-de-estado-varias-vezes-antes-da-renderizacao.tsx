/**
 * * ATUALIZANDO A MESMA VARIÁVEL DE ESTADO VÁRIAS VEZES ANTES DA PROXIMA RENDERIZAÇÃO
 *
 * É um caso de uso incomum, mas se você quiser atualizar a mesma variável de estado várias vezes antes da próxima renderização, em vez de passar o valor do próximo estado como setNumber(number + 1), você pode passar uma função que calcula o próximo estado com base no anterior em a fila, como setNumber(n => n + 1). É uma maneira de dizer ao React para “fazer algo com o valor do estado” em vez de apenas substituí-lo.
 *
 * Tente incrementar o contador agora:
 */

import { useState } from "react";

export default function Counter3() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button
        onClick={() => {
          // Definir o estado apenas o altera para a próxima renderização.
          //É uma maneira de dizer ao React para “fazer algo com o valor do estado” em vez de apenas substituí-lo.
          //n => n + 1 e uma chamada de função de atualização
          setNumber((n) => n + 1);
          setNumber((n) => n + 1);
          setNumber((n) => n + 1);
        }}
      >
        +3
      </button>
    </>
  );
}

/**
 * Aqui, n => n + 1 é chamada de função de atualização. Quando você o passa para um configurador de estado:
 * 
    * O React enfileira essa função para ser processada depois que todos os outros códigos no manipulador de eventos forem executados. 
    * 
    * Durante a próxima renderização, o React percorre a fila e fornece o estado final atualizado.
*/