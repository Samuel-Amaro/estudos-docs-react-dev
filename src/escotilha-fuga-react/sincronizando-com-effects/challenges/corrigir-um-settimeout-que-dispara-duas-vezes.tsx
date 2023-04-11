/**
 * * CORRIGIR UM SETTIMEOUT QUE DISPARA DUAS VEZES
 *
 *  Este Countercomponente exibe um contador que deve ser incrementado a cada segundo. Na montagem, ele chama setInterval. Isso faz com onTickque seja executado a cada segundo. A onTickfunção incrementa o contador.
 *
 * No entanto, em vez de incrementar uma vez por segundo, ele incrementa duas vezes. Por que é que? Encontre a causa do bug e corrija-o.
 */

import { useState, useEffect, useRef } from "react";
import "./style.css";

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    function onTick() {
      setCount((c) => c + 1);
    }

    const idInterval = setInterval(onTick, 1000);

    return () => {
      clearInterval(idInterval);
    };
  }, []);

  return <h1>{count}</h1>;
}

export default function Form3() {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow((s) => !s)}>
        {show ? "Hide" : "Show"} counter
      </button>
      <br />
      <hr />
      {show && <Counter />}
    </>
  );
}
