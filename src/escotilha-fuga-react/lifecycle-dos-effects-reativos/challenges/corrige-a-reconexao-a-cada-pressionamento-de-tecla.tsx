/**
 * * CORRIGE A RECONEXÃO A CADA PRESSIONAMENTO DE TECLA
 *
 *  Neste exemplo, o ChatRoom componente se conecta à sala de bate-papo quando o componente é montado, desconectado quando é desmontado e reconectado quando você seleciona uma sala de bate-papo diferente. Esse comportamento está correto, então você precisa mantê-lo funcionando.
 *
 * No entanto, há um problema. Sempre que você digita na entrada da caixa de mensagem na parte inferior, ChatRoom também se reconecta ao bate-papo. (Você pode perceber isso limpando o console e digitando na entrada.) Corrija o problema para que isso não aconteça.
 */

import { useEffect, useState } from "react";
import "./style.css";

const serverUrl = "https://localhost:1234";

type PropsChatRoom = {
  roomId: string;
};

function ChatRoom1({ roomId }: PropsChatRoom) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);

  return (
    <>
      <h1>Welcome to the {roomId} room!</h1>
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
    </>
  );
}

export default function AppChatRoom() {
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
      <ChatRoom1 roomId={roomId} />
    </>
  );
}

function createConnection(serverUrl: string, roomId: string) {
  // Uma implementação real realmente se conectaria ao servidor
  return {
    connect() {
      console.log(
        '✅ Connecting to "' + roomId + '" room at ' + serverUrl + "..."
      );
    },
    disconnect() {
      console.log('❌ Disconnected from "' + roomId + '" room at ' + serverUrl);
    },
  };
}
