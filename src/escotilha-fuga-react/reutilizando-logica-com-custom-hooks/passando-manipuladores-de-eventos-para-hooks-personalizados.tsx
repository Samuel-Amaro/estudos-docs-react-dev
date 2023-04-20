/**
 * * PASSANDO MANIPULADORES DE EVENTOS PARA HOOKS PERSONALIZADOS
 *
 * !EM CONSTRUÇÃO: Esta seção descreve uma API experimental que ainda não foi lançada em uma versão estável do React.
 *
 * À medida que você começa a usar useChatRoom em mais componentes, talvez queira permitir que os componentes personalizem seu comportamento. Por exemplo, atualmente, a lógica do que fazer quando uma mensagem chega é codificada dentro do Hook:
 *
 * Digamos que você queira mover essa lógica de volta ao seu componente:
 *
 * Para fazer isso funcionar, altere seu Hook personalizado para usar onReceiveMessage como uma de suas opções nomeadas:
 *
 * Isso funcionará, mas há mais uma melhoria que você pode fazer quando seu Hook personalizado aceitar manipuladores de eventos.
 *
 * Adicionar uma dependência onReceiveMessagenão é ideal porque fará com que o chat seja reconectado toda vez que o componente for renderizado novamente. Envolva este manipulador de eventos em um evento de efeito para removê-lo das dependências:
 *
 * Agora o bate-papo não será reconectado toda vez que o ChatRoom componente for renderizado novamente. Aqui está uma demonstração totalmente funcional de passar um manipulador de eventos para um Hook personalizado com o qual você pode brincar:
 *
 * Observe como você não precisa mais saber como useChatRoom funciona para usá-lo. Você poderia adicioná-lo a qualquer outro componente, passar quaisquer outras opções e funcionaria da mesma maneira. Esse é o poder dos Hooks personalizados.
 */

import {
  useEffect,
  useState,
  experimental_useEffectEvent as useEffectEvent,
} from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "./styles.css";

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

//criando um custom hook, que aceita que os componentes que usarem ele personalizem seu comportamento, especificando uma manipulador de eventos para definir a forma como a mensagem e recebida
export function useChatRoom(
  { serverUrl, roomId }: DataOptions,
  onReceiveMessage: (msg: string) => void
) {
    //envolver o manipualdor de eventos em um evento de efeito para removelo das variaveis de dependencias do efeito para evitar re-renderizações desnecessarias e reconexão de chat a todo momento
  const onMessage = useEffectEvent(onReceiveMessage);

  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId,
    };
    const connection = createConnection(options);
    connection.on("message", (msg) => {
      onMessage(msg);
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

  const options = {
    serverUrl: serverUrl,
    roomId: roomId,
  };

  //function que personaliza o comportamento do custom hook
  function onReceiveMessage(msg: string) {
    showNotification("New message: " + msg);
  }

  //chamando/usando custom hook, que aceita manipuladores de eventos para personaliza o comportamento do custom hook, passamos uma manipulador de eventos para o custom hook
  useChatRoom(options, onReceiveMessage);

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
