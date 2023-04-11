/**
 *  Aqui está um botão contador que é implementado com o estado:
*/

import { useRef, useState } from "react";

export default function CounterWithState() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return <button onClick={handleClick}>You clicked {count} times</button>;
}

/**
 * Como o count valor é exibido, faz sentido usar um valor de estado para ele. Quando o valor do contador é definido com setCount(), o React renderiza novamente o componente e a tela é atualizada para refletir a nova contagem.
 * 
 * Se você tentasse implementar isso com uma referência, o React nunca renderizaria novamente o componente, então você nunca veria a mudança de contagem! Veja como clicar neste botão não atualiza seu texto :
*/

export function CounterWithRef() {
  const countRef = useRef(0);

  function handleClick() {
    // This doesn't re-render the component!
    countRef.current = countRef.current + 1;
  }

  return (
    <button onClick={handleClick}>You clicked {countRef.current} times</button>
  );
}

/**
 * É por isso que a leitura ref.current durante a renderização leva a um código não confiável. Se você precisar disso, use state.
*/
