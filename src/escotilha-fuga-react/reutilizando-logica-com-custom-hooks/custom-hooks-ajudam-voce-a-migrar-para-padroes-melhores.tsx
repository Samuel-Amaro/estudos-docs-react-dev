/**
 * * CUSTOM HOOKS AJUDAM VOCÊ A MIGRAR PARA PADRÕES MELHORES
 *
 * Os efeitos são uma “saída de escape” : você os usa quando precisa “sair do React” e quando não há uma solução integrada melhor para o seu caso de uso. Com o tempo, o objetivo da equipe do React é reduzir ao mínimo o número de Effects em seu aplicativo, fornecendo soluções mais específicas para problemas mais específicos. Envolver seus efeitos em ganchos personalizados torna mais fácil atualizar seu código quando essas soluções estiverem disponíveis.
 *
 * Voltemos a este exemplo:
 */

import { useState, useEffect, useSyncExternalStore } from "react";

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
  const isOnline = useOnlineStatus2();
  return <h1>{isOnline ? "✅ Online" : "❌ Disconnected"}</h1>;
}

function SaveButton2() {
  //usa o custom hook, recebendo o valor atual se esta connectado ou não
  const isOnline = useOnlineStatus2();

  function handleSaveClick() {
    console.log("✅ Progress saved");
  }

  return (
    <button disabled={!isOnline} onClick={handleSaveClick}>
      {isOnline ? "Save progress" : "Reconnecting..."}
    </button>
  );
}

export default function AppNetwork2() {
  return (
    <>
      <SaveButton2 />
      <StatusBar2 />
    </>
  );
}

/**
 * No exemplo acima, useOnlineStatus é implementado com um par de useState e useEffect. No entanto, esta não é a melhor solução possível. Há uma série de casos extremos que não considera. Por exemplo, ele assume que quando o componente é montado, isOnline já está true, mas isso pode estar errado se a rede já estiver offline. Você pode usar a navigator.onLine API do navegador para verificar isso, mas usá-la diretamente não funcionaria no servidor para gerar o HTML inicial. Resumindo, esse código poderia ser melhorado.
 *
 * Felizmente, o React 18 inclui uma API dedicada chamada useSyncExternalStore que cuida de todos esses problemas para você. Aqui está como seu useOnlineStatus Hook foi reescrito para aproveitar esta nova API:
 */

function subscribe(callback: () => void) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

//reescrevendo o custom hook para atender todos os casos, para ser um caso de uso real
export function useOnlineStatus2() {
  return useSyncExternalStore(
    subscribe,
    () => navigator.onLine,
    () => true
  );
}

/**
 * Observe como você não precisou alterar nenhum dos componentes para fazer essa migração:
 * 
 * Esta é outra razão pela qual o agrupamento de Efeitos em Ganchos personalizados costuma ser benéfico:
 * 
    * Você torna o fluxo de dados de e para seus efeitos muito explícito.
    * 
    * Você permite que seus componentes se concentrem na intenção e não na implementação exata de seus efeitos.
    * 
    * Quando o React adiciona novos recursos, você pode remover esses efeitos sem alterar nenhum de seus componentes.
    * 
 * Semelhante a um sistema de design, você pode achar útil começar a extrair idiomas comuns dos componentes de seu aplicativo em Hooks personalizados. Isso manterá o código de seus componentes focado na intenção e permitirá que você evite escrever Efeitos brutos com muita frequência. Muitos Hooks personalizados excelentes são mantidos pela comunidade React.
*/