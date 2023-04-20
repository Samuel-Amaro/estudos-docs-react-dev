/**
 * * EXTRAIR UM USECOUNTER HOOK
 * 
 *  Este componente usa uma variável de estado e um efeito para exibir um número que aumenta a cada segundo. Extraia essa lógica em um Hook personalizado chamado useCounter. Seu objetivo é fazer com que a Counter implementação do componente fique exatamente assim:
 * 
 * Você precisará escrever seu Hook personalizado useCounter.js e importá-lo para o Counter.js arquivo.
*/

import { useState, useEffect } from "react";

export default function CounterApp() {
  const count = useCounter();
  return <h1>Seconds passed: {count}</h1>;
}

function useCounter() {
    const [count, setCount] = useState(0);
    useEffect(() => {
      const id = setInterval(() => {
        setCount((c) => c + 1);
      }, 1000);
      return () => clearInterval(id);
    }, []);
    return count;
}