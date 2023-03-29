/**
 * * ESTADO RELACIONADO AO GRUPO
 * 
 * Às vezes, você pode não ter certeza entre usar uma única ou várias variáveis ​​de estado.
 * 
 * Você deveria fazer isso?
*/

//const [x, setX] = useState(0);
//const [y, setY] = useState(0);

/**
 * Ou isto?
*/

//const [position, setPosition] = useState({ x: 0, y: 0 });

/**
 * Tecnicamente, você pode usar qualquer uma dessas abordagens. Mas se duas variáveis ​​de estado sempre mudam juntas, pode ser uma boa ideia unificá-las em uma única variável de estado. Então você não vai esquecer de mantê-los sempre sincronizados, como neste exemplo onde mover o cursor atualiza ambas as coordenadas do ponto vermelho:
*/

import { useState } from "react";

export default function MovingDot() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });
  return (
    <div
      onPointerMove={(e) => {
        setPosition({
          x: e.clientX,
          y: e.clientY,
        });
      }}
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div
        style={{
          position: "absolute",
          backgroundColor: "red",
          borderRadius: "50%",
          transform: `translate(${position.x}px, ${position.y}px)`,
          left: -10,
          top: -10,
          width: 20,
          height: 20,
        }}
      />
    </div>
  );
}

/**
 * Outro caso em que você agrupará dados em um objeto ou array é quando não sabe quantos pedaços diferentes de estado precisará. Por exemplo, é útil quando você tem um formulário onde o usuário pode adicionar campos personalizados.
 * 
 * * Armadilha
 * 
 * Se sua variável de estado for um objeto, lembre-se de que você não pode atualizar apenas um campo sem copiar explicitamente os outros campos. Por exemplo, você não pode fazer setPosition({ x: 100 })no exemplo acima porque não teria a ypropriedade de jeito nenhum! Em vez disso, se você quiser definir xsozinho, você deve fazer setPosition({ ...position, x: 100 }), ou dividi-los em duas variáveis ​​de estado e fazer setX(100).
*/