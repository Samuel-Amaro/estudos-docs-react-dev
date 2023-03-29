/**
 * * REINICIANDO O ESTADO NA MESMA POSIÇÃO
 * 
 * Por padrão, o React preserva o estado de um componente enquanto ele permanece na mesma posição. Normalmente, isso é exatamente o que você deseja, então faz sentido como o comportamento padrão. Mas, às vezes, você pode querer redefinir o estado de um componente. Considere este aplicativo que permite que dois jogadores acompanhem suas pontuações durante cada turno:
*/

import { useState } from "react";

export default function Scoreboard() {
  const [isPlayerA, setIsPlayerA] = useState(true);
  return (
    <div>
      {isPlayerA ? <Counter3 person="Taylor" /> : <Counter3 person="Sarah" />}
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

type PropsCounter3 = {
    person: string;
};

export function Counter3({ person } : PropsCounter3) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = "counter";
  if (hover) {
    className += " hover";
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>
        {person}s score: {score}
      </h1>
      <button onClick={() => setScore(score + 1)}>Add one</button>
    </div>
  );
}

/**
 * Atualmente, quando você muda de jogador, a pontuação é preservada. Os dois Counters aparecem na mesma posição, então o React os vê como o mesmo Counter cujo person prop mudou.
 * 
 * Mas conceitualmente, neste aplicativo, eles devem ser dois contadores separados. Eles podem aparecer no mesmo lugar na IU, mas um é um contador para Taylor e outro é um contador para Sarah.
 * 
 * Existem duas maneiras de redefinir o estado ao alternar entre eles:
 * 
    * Renderizar componentes em diferentes posições
    * 
    * Dê a cada componente uma identidade explícita com key
*/