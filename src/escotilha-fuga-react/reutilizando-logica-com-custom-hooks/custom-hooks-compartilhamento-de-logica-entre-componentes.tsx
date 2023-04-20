/**
 * * CUSTOM HOOKS: COMPARTILHAMENTO DE LÓGICA ENTRE COMPONENTES
 *
 *  Imagine que você está desenvolvendo um aplicativo que depende muito da rede (como a maioria dos aplicativos). Você deseja avisar o usuário se sua conexão de rede foi acidentalmente desligada enquanto ele estava usando seu aplicativo. Como você faria isso? Parece que você precisará de duas coisas em seu componente:
 *
 * Um pedaço de estado que rastreia se a rede está online.
 *
 * Um efeito que se inscreve nos eventos globais online e offline e atualiza esse estado.
 *
 * Isso manterá seu componente sincronizado com o status da rede. Você pode começar com algo assim:
 *
 * Tente ligar e desligar sua rede e observe como isso StatusBar é atualizado em resposta às suas ações.
 */

import { useState, useEffect } from "react";

export default function StatusBar() {
  /*logica que faz o componente estar sincronizado com a rede, avisa quando esta conectado ou não*/
  const [isOnline, setIsOnline] = useState(true);
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
  /*--------*/

  return <h1>{isOnline ? "✅ Online" : "❌ Disconnected"}</h1>;
}

/**
 * Agora imagine que você também queira usar a mesma lógica em um componente diferente. Você deseja implementar um botão Salvar que ficará desativado e mostrará “Reconectando…” em vez de “Salvar” enquanto a rede estiver desligada.
 *
 * Para começar, você pode copiar e colar o isOnline estado e o efeito em SaveButton:
 */

export function SaveButton() {
  /*mesma logica utilizada no componente statusBar esta sendo utilizada aqui*/
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
  /*---------*/

  function handleSaveClick() {
    console.log("✅ Progress saved");
  }

  return (
    <button disabled={!isOnline} onClick={handleSaveClick}>
      {isOnline ? "Save progress" : "Reconnecting..."}
    </button>
  );
}

/**
 * Esses dois componentes funcionam bem, mas a duplicação da lógica entre eles é lamentável. Parece que, embora tenham aparência visual diferente, você deseja reutilizar a lógica entre eles.
 */
