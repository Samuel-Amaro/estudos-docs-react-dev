/**
 * * CONSERTE UM CONTADOR DE CONGELAMENTO
 * 
 * Este Timer componente mantém uma countvariável de estado que aumenta a cada segundo. O valor pelo qual está aumentando é armazenado na incrementvariável de estado, que você pode controlar com os botões de mais e menos. Por exemplo, tente pressionar o botão de adição nove vezes e observe que o countagora aumenta a cada segundo em dez, em vez de um.
 * 
 * Há um pequeno problema com esta interface do usuário. Você pode perceber que, se continuar pressionando os botões de mais ou menos mais rápido do que uma vez por segundo, o próprio cronômetro parece pausar. Ele só recomeça depois que um segundo se passa desde a última vez que você pressionou um dos botões. Descubra por que isso está acontecendo e corrija o problema para que o cronômetro funcione a cada segundo sem interrupções.
*/

import { useState, useEffect } from "react";
import { experimental_useEffectEvent as useEffectEvent } from "react";
import "./style1.css"

export default function Timer2() {
  const [count, setCount] = useState(0);
  const [increment, setIncrement] = useState(1);

  const onCount = useEffectEvent(() => {
    setCount((c) => c + increment);
  });

  useEffect(() => {
    const id = setInterval(() => {
      //setCount((c) => c + increment);
      onCount();
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <>
      <h1>
        Counter: {count}
        <button onClick={() => setCount(0)}>Reset</button>
      </h1>
      <hr />
      <p>
        Every second, increment by:
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
    </>
  );
}