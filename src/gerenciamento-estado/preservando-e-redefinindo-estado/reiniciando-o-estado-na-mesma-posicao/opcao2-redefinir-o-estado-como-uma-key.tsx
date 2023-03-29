/**
 * * OPÇÃO 2: REDEFINIR O ESTADO COMO UMA KEY
 *
 * Há também outra maneira mais genérica de redefinir o estado de um componente.
 *
 * Você pode ter visto keys ao renderizar listas. As chaves não são apenas para listas! Você pode usar chaves para fazer o React distinguir entre quaisquer componentes. Por padrão, o React usa a ordem dentro do pai (“primeiro contador”, “segundo contador”) para discernir entre os componentes. Mas as chaves permitem que você diga ao React que este não é apenas um primeiro contador ou um segundo contador, mas um contador específico - por exemplo, o contador de Taylor . Dessa forma, o React conhecerá o contador de Taylor onde quer que ele apareça na árvore!
 *
 * Neste exemplo, os dois <Counter />s não compartilham o estado, embora apareçam no mesmo lugar no JSX:
 */

import { Counter3 } from "./reiniciando-o-estado-na-mesma-posicao";
import { useState } from "react";

export default function Scoreboard3() {
  const [isPlayerA, setIsPlayerA] = useState(true);
  return (
    <div>
      {isPlayerA ? (
        <Counter3 person="Taylor" key="Taylor" />
      ) : (
        <Counter3 person="Sarah" key="Sarah" />
      )}
      <button
        onClick={() => {
          setIsPlayerA(!isPlayerA);
        }}
      >
        Next player!
      </button>
    </div>
  );
}

/**
 * Alternar entre Taylor e Sarah não preserva o estado. Isso ocorre porque você deu a eles diferentes keys:
 * 
 * Especificar a key diz ao React para usar o key próprio como parte da posição, em vez de sua ordem dentro do pai. É por isso que, mesmo que você os renderize no mesmo lugar no JSX, o React os vê como dois contadores diferentes e, portanto, eles nunca compartilharão o estado. Cada vez que um contador aparece na tela, seu estado é criado. Cada vez que é removido, seu estado é destruído. Alternar entre eles redefine seu estado repetidamente.
 * 
 * * OBSERVAÇÃO
 * 
 * Lembre-se de que as chaves não são globalmente exclusivas. Eles apenas especificam a posição dentro do pai .
*/