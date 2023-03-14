/**
 * * TRANSFORMANDO UMA ARRAY
 *
 * Se você quiser alterar alguns ou todos os itens do array, você pode usar map() para criar um novo array. A função para a qual você passará map pode decidir o que fazer com cada item, com base em seus dados ou em seu índice (ou ambos).
 *
 * Neste exemplo, uma array contém as coordenadas de dois círculos e um quadrado. Quando você pressiona o botão, ele move apenas os círculos para baixo em 50 pixels. Ele faz isso produzindo uma nova matriz de dados usando map():
 */

import { useState } from "react";

const initialShapes = [
  { id: 0, type: "circle", x: 50, y: 100 },
  { id: 1, type: "square", x: 150, y: 100 },
  { id: 2, type: "circle", x: 250, y: 100 },
];

export default function ShapeEditor() {
  const [shapes, setShapes] = useState(initialShapes);

  function handleClick() {
    //Se você quiser alterar alguns ou todos os itens do array, você pode usar map() para criar um novo array. A função para a qual você passará map pode decidir o que fazer com cada item, com base em seus dados ou em seu índice (ou ambos).
    const nextShapes = shapes.map((shape) => {
      if (shape.type === "square") {
        // sem alteração
        return shape;
      } else {
        //transforma o circle
        // retorna um novo circulo 50px abaixo
        return {
          ...shape,
          y: shape.y + 50,
        };
      }
    });
    // re-renderiza com um novo array
    setShapes(nextShapes);
  }

  return (
    <>
      <button onClick={handleClick}>Move circles down!</button>
      {shapes.map((shape) => (
        <div
          key={shape.id}
          style={{
            background: "purple",
            position: "absolute",
            left: shape.x,
            top: shape.y,
            borderRadius: shape.type === "circle" ? "50%" : "",
            width: 20,
            height: 20,
          }}
        />
      ))}
    </>
  );
}
