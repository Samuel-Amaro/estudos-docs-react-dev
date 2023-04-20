/**
 * * TORNE O ATRASO DO CONTADOR CONFIGURÁVEL
 *
 *  Neste exemplo, há uma delayvariável de estado controlada por um controle deslizante, mas seu valor não é usado. Passe o delayvalor para seu useCounterHook personalizado e altere o useCounterHook para usar o ms passado delayem vez de codificar permanentemente 1000.
 */

import { useEffect, useState } from "react";

export default function CounterApp2() {
  const [delay, setDelay] = useState(1000);
  const count = useCounter(delay);
  return (
    <>
      <label>
        Tick duration: {delay} ms
        <br />
        <input
          type="range"
          value={delay}
          min="10"
          max="2000"
          onChange={(e) => setDelay(Number(e.target.value))}
        />
      </label>
      <hr />
      <h1>Ticks: {count}</h1>
    </>
  );
}

function useCounter(delay: number) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => c + 1);
    }, delay);
    return () => clearInterval(id);
  }, [delay]);
  return count;
}
