/**
 * * EXTRAINDO SEU PRÓPRIO CUSTOM HOOK DE UM COMPONENTE
 *
 * Imagine por um momento que, semelhante a useState e useEffect, houvesse um gancho useOnlineStatus embutido. Então, esses dois componentes podem ser simplificados e você pode remover a duplicação entre eles:
 *
 * Embora não exista um Hook embutido, você mesmo pode escrevê-lo. Declare uma função chamada useOnlineStatus e mova todo o código duplicado dos componentes que você escreveu anteriormente:
 *
 * No final da função, retorne isOnline. Isso permite que seus componentes leiam esse valor:
 */

import { useState, useEffect } from "react";

//escrevendo um custom hook
export function useOnlineStatus() {
  //logica que faz o componente estar sincronizado com a rede(network), avisa quando esta conectado ou não
  //state que informa se esta conectado ou não
  const [isOnline, setIsOnline] = useState(true);
  //effect que se inscreve em eventos globais durante a primeira montagem
  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }
    function handleOffline() {
      setIsOnline(false);
    }
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  //retornamos o state para que os componentes leiam o valor
  return isOnline;
}

function StatusBar2() {
  //usa o custom hook, recebendo o valor atual se esta connectado ou não
  const isOnline = useOnlineStatus();
  return <h1>{isOnline ? "✅ Online" : "❌ Disconnected"}</h1>;
}

function SaveButton2() {
  //usa o custom hook, recebendo o valor atual se esta connectado ou não
  const isOnline = useOnlineStatus();

  function handleSaveClick() {
    console.log("✅ Progress saved");
  }

  return (
    <button disabled={!isOnline} onClick={handleSaveClick}>
      {isOnline ? "Save progress" : "Reconnecting..."}
    </button>
  );
}

export default function AppNetwork() {
  return (
    <>
      <SaveButton2 />
      <StatusBar2 />
    </>
  );
}

/**
 * Agora seus componentes não têm tanta lógica repetitiva. Mais importante, o código dentro deles descreve o que eles querem fazer (usar o status online!) em vez de como fazê-lo (inscrevendo-se nos eventos do navegador).
 * 
 * Ao extrair a lógica em Hooks customizados, você pode ocultar os detalhes complicados de como você lida com algum sistema externo ou uma API do navegador. O código de seus componentes expressa sua intenção, não a implementação.
*/