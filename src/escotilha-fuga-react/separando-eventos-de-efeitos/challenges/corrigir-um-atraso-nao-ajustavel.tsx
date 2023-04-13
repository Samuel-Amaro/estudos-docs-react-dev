/**
 * * CORRIGIR UM ATRASO NÃO AJUSTÁVEL
 *
 * Neste exemplo, você pode personalizar o intervalo de atraso. É armazenado em uma delayvariável de estado que é atualizada por dois botões. No entanto, mesmo que você pressione o botão “mais 100 ms” até chegar a delay1000 milissegundos (ou seja, um segundo), você notará que o cronômetro ainda aumenta muito rápido (a cada 100 ms). É como se suas alterações fossem delayignoradas. Encontre e corrija o bug.
 */

import { useState, useEffect } from "react";
import { experimental_useEffectEvent as useEffectEvent } from "react";

export default function Timer3() {
  const [count, setCount] = useState(0);
  const [increment, setIncrement] = useState(1);
  const [delay, setDelay] = useState(100);

  const onTick = useEffectEvent(() => {
    setCount((c) => c + increment);
  });

  /*const onMount = useEffectEvent(() => {
    return setInterval(() => {
      onTick();
    }, delay);
  });*/

  useEffect(() => {
    const id = setInterval(() => {
      onTick();
    }, delay);
    return () => {
      clearInterval(id);
    };
  }, [delay]);

  return (
    <>
      <h1>
        Counter: {count}
        <button onClick={() => setCount(0)}>Reset</button>
      </h1>
      <hr />
      <p>
        Increment by:
        <button
          disabled={increment === 0}
          onClick={() => {
            setIncrement((i) => i - 1);
          }}
        >
          –
        </button>
        <b>{increment}</b>
        <button
          onClick={() => {
            setIncrement((i) => i + 1);
          }}
        >
          +
        </button>
      </p>
      <p>
        Increment delay:
        <button
          disabled={delay === 100}
          onClick={() => {
            setDelay((d) => d - 100);
          }}
        >
          –100 ms
        </button>
        <b>{delay} ms</b>
        <button
          onClick={() => {
            setDelay((d) => d + 100);
          }}
        >
          +100 ms
        </button>
      </p>
    </>
  );
}
