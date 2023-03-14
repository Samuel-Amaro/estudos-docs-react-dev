/**
 * * ATUALIZAÇÕES DE LOTE DE ESTADO REACT
 *  
 * Você pode esperar que clicar no botão “+3” incrementará o contador três vezes porque ele chama setNumber(number + 1) três vezes:
*/

import { useState } from "react";

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button
        onClick={() => {
          // Definir o estado apenas o altera para a próxima renderização.
          setNumber(number + 1);
          setNumber(number + 1);
          setNumber(number + 1);
        }}
      >
        +3
      </button>
    </>
  );
}

/**
 * No entanto, como você deve se lembrar da seção anterior, os valores de estado de cada renderização são fixos , portanto, o valor de number dentro do manipulador de eventos da primeira renderização é sempre 0, não importa quantas vezes você chame setNumber(1)
 * 
 * Mas há um outro fator em ação aqui para discutir. O React espera até que todo o código nos manipuladores de eventos seja executado antes de processar suas atualizações de estado. É por isso que a re-renderização só acontece depois de todas essas setNumber() chamadas.
 * 
 * Isso pode lembrá-lo de um garçom anotando um pedido no restaurante. Um garçom não corre para a cozinha ao mencionar seu primeiro prato! Em vez disso, eles permitem que você termine seu pedido, faça alterações nele e até receba pedidos de outras pessoas na mesa.
 * 
 * Isso permite que você atualize várias variáveis ​​de estado, mesmo de vários componentes, sem acionar muitos renderizadores. Mas isso também significa que a interface do usuário não será atualizada até que o manipulador de eventos e qualquer código nele sejam concluídos. Esse comportamento, também conhecido como lote, faz com que seu aplicativo React seja executado muito mais rápido. Também evita lidar com renderizações “inacabadas” confusas, onde apenas algumas das variáveis ​​foram atualizadas.
 * 
 * O React não agrupa vários eventos intencionais, como cliques - cada clique é tratado separadamente. Tenha certeza de que o React só faz lotes quando geralmente é seguro fazê-lo. Isso garante que, por exemplo, se o primeiro clique no botão desativar um formulário, o segundo clique não o enviará novamente.
*/