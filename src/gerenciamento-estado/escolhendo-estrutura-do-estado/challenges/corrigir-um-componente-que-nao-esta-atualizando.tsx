/**
 * * CORRIGIR UM COMPONENTE QUE NÃO ESTÁ ATUALIZANDO
 * 
 *  Este Clock componente recebe duas props: color e time. Quando você seleciona uma cor diferente na caixa de seleção, o Clock componente recebe uma color propriedade diferente de seu componente pai. No entanto, por algum motivo, a cor exibida não é atualizada. Por que? Corrigir o problema.
*/

import { useState, useEffect } from "react";

function useTime() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function AppClock() {
  const time = useTime();
  const [color, setColor] = useState("lightcoral");
  return (
    <div>
      <p>
        Pick a color:{" "}
        <select value={color} onChange={(e) => setColor(e.target.value)}>
          <option value="lightcoral">lightcoral</option>
          <option value="midnightblue">midnightblue</option>
          <option value="rebeccapurple">rebeccapurple</option>
        </select>
      </p>
      <Clock color={color} time={time.toLocaleTimeString()} />
    </div>
  );
}

type PropsClock = {
    color: string;
    time: string;
};

function Clock({color, time} : PropsClock) {
  return <h1 style={{ color: color }}>{time}</h1>;
}
