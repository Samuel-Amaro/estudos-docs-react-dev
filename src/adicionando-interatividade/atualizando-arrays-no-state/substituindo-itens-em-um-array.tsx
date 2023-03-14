/**
 * * SUBSTITUINDO ITENS EM UM ARRAY
 * 
 *  É particularmente comum querer substituir um ou mais itens em uma matriz. Atribuições como arr[0] = 'bird'estão mudando o array original, então você vai querer usar map para isso também.
 * 
 * Para substituir um item, crie uma nova matriz com map. Dentro de sua mapchamada, você receberá o índice do item como segundo argumento. Use-o para decidir se deve retornar o item original (o primeiro argumento) ou outra coisa:
*/

import { useState } from "react";


const initialCounters = [0, 0, 0];

export default function CounterList() {
  const [counters, setCounters] = useState(initialCounters);

  function handleIncrementClick(index: number) {
    const nextCounters = counters.map((c, i) => {
      if (i === index) {
        // incrementa o contado clicado,
        return c + 1;
      } else {
        // O resto não mudou
        return c;
      }
    });
    setCounters(nextCounters);
  }

  return (
    <ul>
      {counters.map((counter, i) => (
        <li key={i}>
          {counter}
          <button
            onClick={() => {
              handleIncrementClick(i);
            }}
          >
            +1
          </button>
        </li>
      ))}
    </ul>
  );
}