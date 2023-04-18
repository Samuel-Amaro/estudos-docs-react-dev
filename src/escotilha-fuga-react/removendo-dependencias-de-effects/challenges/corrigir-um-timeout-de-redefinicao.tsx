/**
 * * CORRIGIR UM TIMEOUT DE REDEFINIÇÃO
 *
 *  Este efeito configura um intervalo que marca a cada segundo. Você notou algo estranho acontecendo: parece que o intervalo é destruído e recriado toda vez que marca. Corrija o código para que o intervalo não seja constantemente recriado.
 */

import { useState, useEffect } from "react";

export default function AppTimer2() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("✅ Creating an interval");
    const id = setInterval(() => {
      console.log("⏰ Interval tick");
      setCount((prevCount) => prevCount + 1);
    }, 1000);
    return () => {
      console.log("❌ Clearing an interval");
      clearInterval(id);
    };
  }, []);

  return <h1>Counter: {count}</h1>;
}
