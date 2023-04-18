/**
 * * CORRIGIR UM BATE-PAPO RECONECTADO
 *
 *  Neste exemplo, toda vez que você pressiona “Alternar tema”, o chat é reconectado. Por que isso acontece? Corrija o erro para que o bate-papo seja reconectado apenas quando você editar a URL do servidor ou escolher uma sala de bate-papo diferente.
 *
 * Trate chat.js como uma biblioteca externa de terceiros: você pode consultá-la para verificar sua API, mas não a edite.
 */

import { useEffect, useState } from "react";

type DataOptions = {
  serverUrl: string;
  roomId: string;
};

export default function AppChat2() {
  const [isDark, setIsDark] = useState(false);
  const [roomId, setRoomId] = useState("general");
  const [serverUrl, setServerUrl] = useState("https://localhost:1234");

  const options = {
    serverUrl: serverUrl,
    roomId: roomId,
  };

  return (
    <div className={isDark ? "dark" : "light"}>
      <button onClick={() => setIsDark(!isDark)}>Toggle theme</button>
      <label>
        Server URL:{" "}
        <input
          value={serverUrl}
          onChange={(e) => setServerUrl(e.target.value)}
        />
      </label>
      <label>
        Choose the chat room:{" "}
        <select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      <hr />
      <ChatRoom options={options} />
    </div>
  );
}

type PropsChatRoom = {
  options: DataOptions;
};

function ChatRoom({ options }: PropsChatRoom) {
  const {serverUrl, roomId} = options;
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, [serverUrl, roomId]);

  return <h1>Welcome to the {options.roomId} room!</h1>;
}

function createConnection(serverUrl: string, roomId: string) {
  // A real implementation would actually connect to the server
  if (typeof serverUrl !== "string") {
    throw Error("Expected serverUrl to be a string. Received: " + serverUrl);
  }
  if (typeof roomId !== "string") {
    throw Error("Expected roomId to be a string. Received: " + roomId);
  }
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
