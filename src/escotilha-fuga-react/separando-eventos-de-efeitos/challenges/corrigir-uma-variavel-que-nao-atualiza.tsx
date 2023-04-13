/**
 * * CORRIGIR UMA VARIÁVEL QUE NÃO ATUALIZA
 *
 *  Este Timer componente mantém uma count variável de estado que aumenta a cada segundo. O valor pelo qual está aumentando é armazenado na increment variável de estado. Você pode controlar a increment variável com os botões de mais e menos.
 *
 * No entanto, não importa quantas vezes você clique no botão de adição, o contador ainda será incrementado em um a cada segundo. O que há de errado com este código? Por que é increment sempre igual 1 dentro do código do Effect? Encontre o erro e corrija-o.
 */

import { useState, useEffect } from "react";
import "./style1.css";

export default function Timer() {
  const [count, setCount] = useState(0);
  const [increment, setIncrement] = useState(1);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => c + increment);
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [increment]);

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
