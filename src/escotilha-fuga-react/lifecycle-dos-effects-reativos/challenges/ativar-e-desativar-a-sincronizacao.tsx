/**
 * * ATIVAR E DESATIVAR A SINCRONIZAÇÃO
 *
 * Neste exemplo, um Effect se inscreve no pointermove evento de janela para mover um ponto rosa na tela. Tente passar o mouse sobre a área de visualização (ou tocar na tela se estiver em um dispositivo móvel) e veja como o ponto rosa segue seu movimento.
 *
 * Há também uma caixa de seleção. Marcar a caixa de seleção alterna a canMove variável de estado, mas essa variável de estado não é usada em nenhum lugar do código. Sua tarefa é alterar o código para que, quando canMove estiver false(a caixa de seleção estiver marcada), o ponto pare de se mover. Depois de ativar novamente a caixa de seleção (e definir canMove como true), a caixa deve seguir o movimento novamente. Em outras palavras, se o ponto pode se mover ou não, deve permanecer sincronizado se a caixa de seleção estiver marcada.
 */

import { useState, useEffect } from "react";
import "./style2.css";

export default function AppMove() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [canMove, setCanMove] = useState(true);

  useEffect(() => {
    function handleMove(e: PointerEvent) {
      //solution 1
      if (canMove) {
        setPosition({ x: 0, y: 0 });
        return;
      }
      setPosition({ x: e.clientX, y: e.clientY });
    }
    //or solution 2
    /*
    if (canMove) {
      window.addEventListener('pointermove', handleMove);
      return () => window.removeEventListener('pointermove', handleMove);
    }
    */
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
