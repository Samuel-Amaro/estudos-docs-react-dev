/**
 * * ENCONTRE E CORRIGIR A MUTAÇÃO
 *
 * Há uma caixa arrastável em um fundo estático. Você pode alterar a cor da caixa usando a entrada selecionada.
 *
 * Mas há um bug. Se você mover a caixa primeiro e depois mudar sua cor, o fundo (que não deveria se mover!) “pulará” para a posição da caixa. Mas isso não deveria acontecer: a prop Background do position é definida como initialPosition, que é { x: 0, y: 0 }. Por que o fundo está se movendo após a mudança de cor?
 *
 * Encontre o bug e corrija-o.
 */

import React, { useState } from "react";
import Background from "./Background.js";
import Box from "./Box.js";

const initialPosition = {
  x: 0,
  y: 0,
};

export default function Canvas() {
  const [shape, setShape] = useState({
    color: "orange",
    position: initialPosition,
  });

  function handleMove(dx: number, dy: number) {
    setShape({
      ...shape,
      position: {
        x: shape.position.x + dx,
        y: shape.position.y + dy,
      },
    });
  }

  function handleColorChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setShape({
      ...shape,
      color: e.target.value,
    });
  }

  return (
    <>
      <select value={shape.color} onChange={handleColorChange}>
        <option value="orange">orange</option>
        <option value="lightpink">lightpink</option>
        <option value="aliceblue">aliceblue</option>
      </select>
      <Background position={initialPosition} />
      <Box color={shape.color} position={shape.position} onMove={handleMove}>
        Drag me!
      </Box>
    </>
  );
}
