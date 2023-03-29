/**
 * * OPÇÃO 1: RENDERIZAR UM COMPONENTE EM DIFERENTES POSIÇÕES
 *
 *  Se você quiser que esses dois Counters sejam independentes, você pode renderizá-los em duas posições diferentes:
 */

import { Counter3 } from "./reiniciando-o-estado-na-mesma-posicao";
import { useState } from "react";

export default function Scoreboard2() {
  const [isPlayerA, setIsPlayerA] = useState(true);
  return (
    <div>
      {isPlayerA && <Counter3 person="Taylor" />}
      {!isPlayerA && <Counter3 person="Sarah" />}
      <button
        onClick={() => {
          setIsPlayerA(!isPlayerA);
        }}
      >
        Next player!
      </button>
    </div>
  );
}

/***
 * Inicialmente, isPlayerA é true. Portanto, a primeira posição contém Counter o estado e a segunda está vazia.
 * 
 * Quando você clica no botão “Próximo jogador”, a primeira posição é limpa, mas a segunda agora contém um arquivo Counter.
 * 
 * O estado de cada um Counter é destruído cada vez que é removido do DOM. É por isso que eles são redefinidos toda vez que você clica no botão.
 * 
 * Essa solução é conveniente quando você tem apenas alguns componentes independentes renderizados no mesmo local. Neste exemplo, você só tem dois, então não é complicado renderizar ambos separadamente no JSX.
*/