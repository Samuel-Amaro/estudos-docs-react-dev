/**
 * * MESMO COMPONENTE NA MESMA POSIÇÃO PRESERVA O ESTADO
 *
 *  Neste exemplo, existem duas <Counter /> tags diferentes:
 */

import { useState } from "react";

export default function WrapperCounterFancy() {
  const [isFancy, setIsFancy] = useState(false);
  return (
    <div>
      {isFancy ? <Counter2 isFancy={true} /> : <Counter2 isFancy={false} />}
      <label>
        <input
          type="checkbox"
          checked={isFancy}
          onChange={(e) => {
            setIsFancy(e.target.checked);
          }}
        />
        Use fancy styling
      </label>
    </div>
  );
}

type PropsCounter2 = {
  isFancy: boolean;
};

export function Counter2({ isFancy }: PropsCounter2) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = "counter";
  if (hover) {
    className += " hover";
  }
  if (isFancy) {
    className += " fancy";
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>Add one</button>
    </div>
  );
}

/**
 * Quando você marca ou desmarca a caixa de seleção, o estado do contador não é redefinido. Seja isFancyis true ou false, você sempre terá a <Counter /> como o primeiro filho do div retornado do App componente raiz:
 * 
 * Atualizar o App estado não zera o Counter pq Counter fica na mesma posição
 * 
 * É o mesmo componente na mesma posição, portanto, da perspectiva do React, é o mesmo contador.
*/