/**
 * * IMPLEMENTE UM MOVIMENTO SURPREENDENTE
 *
 *  Neste exemplo, o usePointerPosition()Hook rastreia a posição atual do ponteiro. Tente mover o cursor ou o dedo sobre a área de visualização e veja o ponto vermelho seguir seu movimento. Sua posição é salva na pos1 variável.
 *
 * Na verdade, existem cinco (!) pontos vermelhos diferentes sendo renderizados. Você não os vê porque atualmente todos eles aparecem na mesma posição. Isso é o que você precisa consertar. Em vez disso, o que você deseja implementar é um movimento “escalonado”: ​​cada ponto deve “seguir” o caminho do ponto anterior. Por exemplo, se você mover rapidamente o cursor, o primeiro ponto deve segui-lo imediatamente, o segundo ponto deve seguir o primeiro ponto com um pequeno atraso, o terceiro ponto deve seguir o segundo ponto e assim por diante.
 *
 * Você precisa implementar o useDelayedValue Hook customizado. Sua implementação atual retorna o value fornecido a ele. Em vez disso, você deseja retornar o valor de delay milissegundos atrás. Você pode precisar de algum estado e um efeito para fazer isso.
 *
 * Depois de implementar useDelayed Value, você deve ver os pontos se movendo um após o outro.
 */

import { useEffect, useState } from "react";

function useDelayedValue(value: DataPosition, delay: number) {
  const [delayedValue, setDelayedValue] = useState(value);
  useEffect(() => {
    setTimeout(() => {
      setDelayedValue(value);
    }, delay);
  }, [delay, value]);
  return delayedValue;
}

export default function Canvas() {
  const pos1 = usePointerPosition();
  const pos2 = useDelayedValue(pos1, 100);
  const pos3 = useDelayedValue(pos2, 200);
  const pos4 = useDelayedValue(pos3, 100);
  const pos5 = useDelayedValue(pos3, 50);
  return (
    <>
      <Dot position={pos1} opacity={1} />
      <Dot position={pos2} opacity={0.8} />
      <Dot position={pos3} opacity={0.6} />
      <Dot position={pos4} opacity={0.4} />
      <Dot position={pos5} opacity={0.2} />
    </>
  );
}

type DataPosition = {
  x: number;
  y: number;
};

type PropDot = {
  position: DataPosition;
  opacity: number;
};

function Dot({ position, opacity }: PropDot) {
  return (
    <div
      style={{
        position: "absolute",
        backgroundColor: "pink",
        borderRadius: "50%",
        opacity,
        transform: `translate(${position.x}px, ${position.y}px)`,
        pointerEvents: "none",
        left: -20,
        top: -20,
        width: 40,
        height: 40,
      }}
    />
  );
}

export function usePointerPosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    function handleMove(e: PointerEvent) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);
  return position;
}
