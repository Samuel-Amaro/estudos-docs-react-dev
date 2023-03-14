/**
 * * TRATE O ESTADO COMO SOMENTE LEITURA
 *
 * Em outras palavras, você deve tratar qualquer objeto JavaScript que colocar no estado como somente leitura.
 *
 * Este exemplo contém um objeto no estado para representar a posição atual do ponteiro. O ponto vermelho deve se mover quando você toca ou move o cursor sobre a área de visualização. Mas o ponto fica na posição inicial:
 */

import { useState } from "react";

export default function MovingDot() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  return (
    <div
      onPointerMove={
        //problema com este pedaço de codigo
        //Este código modifica o objeto atribuído position na renderização anterior. Mas sem usar a função de configuração de estado, o React não tem ideia de que o objeto foi alterado. Portanto, o React não faz nada em resposta. É como tentar mudar a ordem depois de já ter comido a refeição. Embora o estado de mutação possa funcionar em alguns casos, não o recomendamos. Você deve tratar o valor do estado ao qual tem acesso em uma renderização como somente leitura.
        /*(e) => {
          position.x = e.clientX;
          position.y = e.clientY;
        }*/
        //Para realmente acionar uma nova renderização neste caso, crie um novo objeto e passe-o para a função de configuração de estado:
        //Com setPosition, você está dizendo ao React:
        //Substituir position por este novo objeto
        //E renderize este componente novamente
        (e) => {
          setPosition({
            x: e.clientX,
            y: e.clientY,
          });
        }
      }
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
