/**
 * * CORRIGIR UMA NOTIFICAÇÃO ATRASADA
 *
 *  Quando você entra em uma sala de bate-papo, esse componente mostra uma notificação. No entanto, ele não mostra a notificação imediatamente. Em vez disso, a notificação é atrasada artificialmente em dois segundos para que o usuário tenha a chance de olhar ao redor da IU.
 *
 * Isso quase funciona, mas há um bug. Tente alterar o menu suspenso de “geral” para “viagem” e depois para “música” muito rapidamente. Se você fizer isso rápido o suficiente, verá duas notificações (como esperado!), Mas ambas dirão “ Bem-vindo à música”.
 *
 * Corrija-o para que, ao mudar de “geral” para “viagem” e depois para “música” muito rapidamente, você veja duas notificações, a primeira sendo “Bem-vindo à viagem” e a segunda “Bem-vindo à música”. (Para um desafio adicional, supondo que você já tenha feito as notificações mostrarem as salas corretas, altere o código para que apenas a última notificação seja exibida.)
 */

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "../style.css";
import { useEffect, useState } from "react";
import { experimental_useEffectEvent as useEffectEvent } from "react";

const serverUrl = "https://localhost:1234";

type PropsChatRoom = {
  roomId: string;
  theme: string;
};

function ChatRoom({ roomId, theme }: PropsChatRoom) {
  const onConnected = useEffectEvent((roomId: string) => {
    showNotification("Welcome to " + roomId, theme);
  });

  useEffect(() => {
    let ignore = false;
    const connection = createConnection(serverUrl, roomId);
    connection.on("connected", () => {
      setTimeout(() => {
        if (!ignore) onConnected(roomId);
      }, 2000);
      showNotification("Welcome to " + roomId, theme);
    });
    connection.connect();
    return () => {
      connection.disconnect();
      ignore = true;
    };
  }, [roomId]);

  return <h1>Welcome to the {roomId} room!</h1>;
}

export default function AppChat3() {
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
