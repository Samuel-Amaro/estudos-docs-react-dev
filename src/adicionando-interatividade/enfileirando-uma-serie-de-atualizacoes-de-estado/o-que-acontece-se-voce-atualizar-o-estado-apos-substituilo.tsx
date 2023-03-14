/**
 * * O QUE ACONTECE SE VOCÊ ATUALIZAR O ESTADO APÓS SUBSTITUÍ-LO
 *
 *  E esse manipulador de eventos? O que você acha que number estará na próxima renderização?
 */

import { useState } from "react";

export default function Counter4() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button
        onClick={() => {
          //durante a proxima renderização, o react passa pela fila de estado
          //substitui por 5
          setNumber(number + 5);
          //atualiza para 6
          setNumber((n) => n + 1);
        }}
      >
        +3
      </button>
    </>
  );
}
