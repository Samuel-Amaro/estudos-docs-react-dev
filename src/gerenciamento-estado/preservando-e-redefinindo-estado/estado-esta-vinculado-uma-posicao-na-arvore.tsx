/**
 * * O ESTADO ESTÁ VINCULADO A UMA POSIÇÃO NA ÁRVORE
 * 
 *  Quando você dá um estado a um componente, você pode pensar que o estado “vive” dentro do componente. Mas o estado é mantido dentro do React. O React associa cada parte do estado que está mantendo com o componente correto, onde esse componente fica na árvore da interface do usuário.
 * 
 * Aqui, há apenas uma <Counter /> tag JSX, mas ela é renderizada em duas posições diferentes:
*/

import { useState } from "react";

export default function Counter() {
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
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>Add one</button>
    </div>
  );
}