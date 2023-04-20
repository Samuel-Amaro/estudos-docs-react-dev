/**
 * * PASSANDO VALORES REATIVOS ENTRE HOOOKS
 *
 * O código dentro de seus Hooks personalizados será executado novamente durante cada nova renderização de seu componente. É por isso que, assim como os componentes, os Hooks customizados precisam ser puros. Pense no código personalizado dos Hooks como parte do corpo do seu componente!
 *
 * Como os Hooks personalizados são renderizados novamente junto com seu componente, eles sempre recebem os adereços e o estado mais recentes. Para ver o que isso significa, considere este exemplo de sala de bate-papo. Altere a URL do servidor ou a sala de bate-papo:
 * 
 * Quando você altera serverUrl ou roomId, o Efeito “reage” às suas alterações e sincroniza novamente. Você pode dizer pelas mensagens do console que o chat se reconecta toda vez que você altera as dependências do seu efeito.
 * 
 * Agora mova o código do Efeito para um Gancho personalizado:
 * 
 * Isso permite que seu ChatRoom componente chame seu Hook personalizado sem se preocupar com o funcionamento interno:
 * 
 * Isso parece muito mais simples! (Mas faz a mesma coisa.)
 * 
 * Observe que a lógica ainda responde às mudanças de prop e de estado. Tente editar a URL do servidor ou a sala selecionada:
 * 
 * Observe como você está pegando o valor de retorno de um Hook:
 * 
 * e passá-lo como uma entrada para outro Hook:
 * 
 * Toda vez que seu ChatRoom componente é renderizado novamente, ele passa o último roomI de serverUrl para o seu Hook. É por isso que seu Effect se reconecta ao chat sempre que seus valores forem diferentes após uma nova renderização. (Se você já trabalhou com software de processamento de áudio ou vídeo, encadear Hooks como este pode lembrá-lo de encadear efeitos visuais ou de áudio. É como se a saída de “ useState alimentasse” a entrada do useChatRoom.)
 */

import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "./styles.css"

export default function AppChatRoomTheme() {
  const [roomId, setRoomId] = useState("general");
  return (
    <>
      <label>
        Choose the chat room:{" "}
        <select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      <hr />
      <ChatRoom roomId={roomId} />
      <ToastContainer />
    </>
  );
}

//criando um custom hook
export function useChatRoom({serverUrl, roomId} : DataOptions) {
    //este efeect se sincroniza com a UI a cada mudança nas variaveis de dependencia
    useEffect(() => {
      const options = {
        serverUrl: serverUrl,
        roomId: roomId,
      };
      const connection = createConnection(options);
      connection.on("message", (msg) => {
        showNotification("New message: " + msg);
      });
      connection.connect();
      return () => connection.disconnect();
    }, [roomId, serverUrl]);
}

type PropsChatRoom = {
  roomId: string;
};

type DataOptions = {
  serverUrl: string;
  roomId: string;
};

function ChatRoom({ roomId }: PropsChatRoom) {
  const [serverUrl, setServerUrl] = useState("https://localhost:1234");

  //(1) - estamos obtendo o valor de retorno do hook useState proprio do react, e usando para construir um objeto dinamico
  const options = {
    serverUrl: serverUrl,
    roomId: roomId,
  };

  //logica reutilizavel extraida para custom hook
  /*useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId,
    };
    const connection = createConnection(options);
    connection.on("message", (msg) => {
      showNotification("New message: " + msg);
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, serverUrl]);
  */

  //chamando/usando custom hook
  //(2) - e fornecendo como entrada ao custom hook criado por nos
  //(3) - passa o ultimo valor de roomId e serverUrl para o custom hook
  //(4) - e como se a saida do hook do useState integrado proprio do react alimentasse a entrada do custom hook criado por nos 
  useChatRoom(options);

  return (
    <>
      <label>
        Server URL:
        <input
          value={serverUrl}
          onChange={(e) => setServerUrl(e.target.value)}
        />
      </label>
      <h1>Welcome to the {roomId} room!</h1>
    </>
  );
}

function createConnection({ serverUrl, roomId }: DataOptions) {
  // A real implementation would actually connect to the server
  if (typeof serverUrl !== "string") {
    throw Error("Expected serverUrl to be a string. Received: " + serverUrl);
  }
  if (typeof roomId !== "string") {
    throw Error("Expected roomId to be a string. Received: " + roomId);
  }
  let intervalId = 0;
  let messageCallback: ((msg: string) => void) | null;
  return {
    connect() {
      console.log(
        '✅ Connecting to "' + roomId + '" room at ' + serverUrl + "..."
      );
      clearInterval(intervalId);
      intervalId = setInterval(() => {
        if (messageCallback) {
          if (Math.random() > 0.5) {
            messageCallback("hey");
          } else {
            messageCallback("lol");
          }
        }
      }, 3000);
    },
    disconnect() {
      clearInterval(intervalId);
      messageCallback = null;
      console.log(
        '❌ Disconnected from "' + roomId + '" room at ' + serverUrl + ""
      );
    },
    on(event: string, callback: (msg: string) => void) {
      if (messageCallback) {
        throw Error("Cannot add the handler twice.");
      }
      if (event !== "message") {
        throw Error('Only "message" event is supported.');
      }
      messageCallback = callback;
    },
  };
}

function showNotification(message: string, theme = "dark") {
  toast(`${message}`, {
    /*duration: 2000,
    gravity: "top",*/
    autoClose: 2000,
    position: "top-right",
    style: {
      background: theme === "dark" ? "black" : "white",
      color: theme === "dark" ? "white" : "black",
    },
  });
}
