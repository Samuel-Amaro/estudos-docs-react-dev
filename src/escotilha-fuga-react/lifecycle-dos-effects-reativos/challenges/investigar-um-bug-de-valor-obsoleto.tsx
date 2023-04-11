/**
 * * INVESTIGAR UM BUG DE VALOR OBSOLETO
 *
 *  Neste exemplo, o ponto rosa deve se mover quando a caixa de seleção estiver marcada e deve parar de se mover quando a caixa de seleção estiver desativada. A lógica para isso já foi implementada: o handleMove manipulador de eventos verifica a canMovevariável de estado.
 *
 * No entanto, por algum motivo, a canMovevariável de estado dentro dela handleMoveparece estar “desatualizada”: é sempre true, mesmo depois de você marcar a caixa de seleção. Como isso é possível? Encontre o erro no código e corrija-o.
 */

import { useState, useEffect } from "react";
import "./style2.css";

export default function AppMove2() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [canMove, setCanMove] = useState(true);

  useEffect(() => {
    function handleMove(e: PointerEvent) {
      if (canMove) {
        setPosition({ x: e.clientX, y: e.clientY });
      }
    }
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, [canMove]);

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={canMove}
          onChange={(e) => setCanMove(e.target.checked)}
        />
        The dot is allowed to move
      </label>
      <hr />
      <div
        style={{
          position: "absolute",
          backgroundColor: "pink",
          borderRadius: "50%",
          opacity: 0.6,
          transform: `translate(${position.x}px, ${position.y}px)`,
          pointerEvents: "none",
          left: -20,
          top: -20,
          width: 40,
          height: 40,
        }}
      />
    </>
  );
}
