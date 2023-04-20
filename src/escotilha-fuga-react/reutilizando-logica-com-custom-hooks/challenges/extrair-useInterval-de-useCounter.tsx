/**
 * * EXTRAIR useInterval de useCounter
 *
 *  Atualmente, seu useCounterGancho faz duas coisas. Ele configura um intervalo e também incrementa uma variável de estado em cada marca de intervalo. Divida a lógica que configura o intervalo em um Gancho separado chamado useInterval. Deve receber dois argumentos: o onTickcallback e o delay. Após essa alteração, sua useCounterimplementação deve ficar assim:
 *
 * Escreva useIntervalno useInterval.jsarquivo e importe-o para o useCounter.jsarquivo.
 */

import { useEffect, useState } from "react";

export default function CounterApp3() {
  const count = useCounter(1000);
  return <h1>Seconds passed: {count}</h1>;
}

function useCounter(delay: number) {
  const [count, setCount] = useState(0);
  useInterval(() => {
    setCount((c) => c + 1);
  }, delay);
  return count;
}

function useInterval(onTick: () => void, delay: number) {
  useEffect(() => {
    const id = setInterval(() => {
      onTick();
    }, delay);
    return () => clearInterval(id);
  }, [onTick, delay]);
}
