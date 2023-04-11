/**
 * * EXEMPLO: CONSTRUIR UM CRONÔMETRO
 * 
 *  Você pode combinar refs e state em um único componente. Por exemplo, vamos fazer um cronômetro que o usuário pode iniciar ou parar pressionando um botão. Para exibir quanto tempo se passou desde que o usuário pressionou “Iniciar”, você precisará acompanhar quando o botão Iniciar foi pressionado e qual é a hora atual. Essas informações são usadas para renderização, portanto, você as manterá no estado:
 * 
 * Quando o usuário pressionar “Iniciar”, você usar á setInterval para atualizar a hora a cada 10 milissegundos:
*/

import { useRef, useState } from "react";

export default function Stopwatch() {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [now, setNow] = useState<number | null>(null);
  //aqui estamos referenciando o id do interval, para quando for necessario cancelar o intervalor existente
  const intervalRef = useRef<number | null>(null);

  function getIdInterval() {
    //aqui estamos lendo o atual valor referencia na refs, por meio da propriedade current
    if (intervalRef.current === null) {
      return undefined;
    }
    return intervalRef.current;
  }

  function handleStart() {
    // inicia contagem
    setStartTime(Date.now());
    setNow(Date.now());

    clearInterval(getIdInterval());

    //aqui estamos gravando uma novo valor de referencia por meio de current propriedade
    intervalRef.current = setInterval(() => {
      // Atualize a hora atual a cada 10 ms.
      setNow(Date.now());
    }, 10);
  }

  function handleStop() {
    clearInterval(getIdInterval());
  }

  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
  }

  return (
    <>
      <h1>Time passed: {secondsPassed.toFixed(3)}</h1>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
    </>
  );
}

/**
 * Quando o botão “Stop” é pressionado, você precisa cancelar o intervalo existente para que ele pare de atualizar a now variável de estado. Você pode fazer isso chamando clearInterval, mas precisa fornecer a ID do intervalo que foi retornada anteriormente pela setInterval chamada quando o usuário pressionou Iniciar. Você precisa manter o ID do intervalo em algum lugar. Como o ID do intervalo não é usado para renderização, você pode mantê-lo em uma referência:
 * 
 * Quando uma informação é usada para renderização, mantenha-a no estado. Quando uma informação é necessária apenas para manipuladores de eventos e alterá-la não requer uma nova renderização, usar uma ref pode ser mais eficiente.
*/