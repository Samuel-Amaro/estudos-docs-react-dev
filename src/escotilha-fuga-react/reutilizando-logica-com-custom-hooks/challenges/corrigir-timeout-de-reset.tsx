/**
 * * CORRIGIR UM TIMEOUT DE RESET
 *
 *  Neste exemplo, há dois intervalos separados.
 *
 * O App componente chama useCounter, que chama useInterval para atualizar o contador a cada segundo. Mas o App componente também chama useInterval para atualizar aleatoriamente a cor de fundo da página a cada dois segundos.
 *
 * Por algum motivo, o retorno de chamada que atualiza o plano de fundo da página nunca é executado. Adicione alguns logs dentro useInterval:
 *
 * Os logs correspondem ao que você espera que aconteça? Se alguns dos seus Efeitos parecem ressincronizar desnecessariamente, você consegue adivinhar qual dependência está causando isso? Existe alguma maneira de remover essa dependência do seu efeito?
 *
 * Depois de corrigir o problema, você deve esperar que o plano de fundo da página seja atualizado a cada dois segundos.
 */

import {
  useEffect,
  useState,
  experimental_useEffectEvent as useEffectEvent,
} from "react";

export default function CounterApp4() {
  const count = useCounter(1000);

  useInterval(() => {
    const randomColor = `hsla(${Math.random() * 360}, 100%, 50%, 0.2)`;
    document.body.style.backgroundColor = randomColor;
  }, 2000);

  return <h1>Seconds passed: {count}</h1>;
}

function useCounter(delay: number) {
  const [count, setCount] = useState(0);
  useInterval(() => {
    setCount((c) => c + 1);
  }, delay);
  return count;
}

//onTick manipulador de eventos, manipuladores de eventos passados para custom hooks devem ser envolvidos em eventos de effect
//!obs: EffectEvent e uma API experimental não usada ainda em uma vesão estavel do react

function useInterval(onTick: () => void, delay: number) {
  const onTickEffect = useEffectEvent(onTick);
  useEffect(() => {
    console.log("✅ Setting up an interval with delay ", delay);
    const id = setInterval(() => {
      onTickEffect();
    }, delay);
    return () => {
      console.log("❌ Clearing an interval with delay ", delay);
      clearInterval(id);
    };
  }, [delay]);
}
