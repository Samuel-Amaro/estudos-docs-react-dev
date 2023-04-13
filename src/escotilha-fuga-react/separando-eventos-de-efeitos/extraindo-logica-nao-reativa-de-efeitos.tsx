/**
 * * EXTRAINDO LÓGICA NÃO REATIVA DE EFEITOS
 *
 *  As coisas ficam mais complicadas quando você quer misturar lógica reativa com lógica não reativa.
 *
 * Por exemplo, imagine que você deseja mostrar uma notificação quando o usuário se conectar ao chat. Você lê o tema atual (escuro ou claro) dos adereços para poder mostrar a notificação na cor correta:
 *
 * No entanto, theme é um valor reativo (pode mudar como resultado da re-renderização), e todo valor reativo lido por um Effect deve ser declarado como sua dependência. Agora você deve especificar theme como uma dependência do seu efeito:
 * 
 * Quando as roomId alterações, o bate-papo é reconectado como seria de esperar. Mas como theme também é uma dependência, o chat também se reconecta toda vez que você alterna entre o tema escuro e o claro. Isso não é ótimo!
 * 
 * Em outras palavras, você não quer que esta linha seja reativa, mesmo estando dentro de um Effect (que é reativo):
 * 
 * Você precisa de uma maneira de separar essa lógica não reativa do Efeito reativo ao seu redor.
 */

import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "./style.css";

const serverUrl = "https://localhost:1234";

type PropsChatRoom = {
  roomId: string;
  theme: string;
};

function ChatRoom({ roomId, theme } : PropsChatRoom) {
  //effect e reativo, a cada mudança de roomId e theme variaveis de dependencias ele sincroniza novamente se conectando a um server fake, e sincronizando uma notificação, mas a um incomodo aqui
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on("connected", () => {
      //mas esta linha não pode ser reativa
      //preciamos separar essa logica não reativo do efeito reativo ao seu redor
      //so precisamos mostrar a notifiication quando o usuario conecta em uma nova sala, ao mudar theme variavel de dependencia não precisa mostrar, arrumar aqui
      showNotification("Connected!", theme);
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, theme]);

  return <h1>Welcome to the {roomId} room!</h1>;
}

export default function AppChatRoomToast() {
  const [roomId, setRoomId] = useState("general");
  const [isDark, setIsDark] = useState(false);
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
      <label>
        <input
          type="checkbox"
          checked={isDark}
          onChange={(e) => setIsDark(e.target.checked)}
        />
        Use dark theme
      </label>
      <hr />
      <ChatRoom roomId={roomId} theme={isDark ? "dark" : "light"} />
      <ToastContainer />
    </>
  );
}

function createConnection(serverUrl: string, roomId: string) {
  // uma implementação real realmente se conectaria a um servidor
  let connectedCallback: undefined | (() => void) = undefined;
  let timeout: number | undefined = undefined;
  return {
    connect() {
      timeout = setTimeout(() => {
        if (connectedCallback) {
          connectedCallback();
        }
      }, 100);
    },
    on(event: string, callback: () => void) {
      if (connectedCallback) {
        throw Error("Cannot add the handler twice.");
      }
      if (event !== "connected") {
        throw Error('Only "connected" event is supported.');
      }
      connectedCallback = callback;
    },
    disconnect() {
      clearTimeout(timeout);
    },
  };
}

function showNotification(message: string, theme: string) {
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
