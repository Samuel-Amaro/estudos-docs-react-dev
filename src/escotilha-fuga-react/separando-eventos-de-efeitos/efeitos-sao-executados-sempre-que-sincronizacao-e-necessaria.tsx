/**
 * * OS EFEITOS SÃO EXECUTADOS SEMPRE QUE A SINCRONIZAÇÃO É NECESSÁRIA
 * 
 *  Lembre-se de que você também precisa manter o componente conectado à sala de chat. Onde vai esse código?
 * 
 * O motivo para executar esse código não é uma interação específica. Não importa por que ou como o usuário navegou até a tela da sala de bate-papo. Agora que eles estão olhando para ele e podem interagir com ele, o componente precisa permanecer conectado ao servidor de bate-papo selecionado. Mesmo que o componente da sala de bate-papo seja a tela inicial do seu aplicativo e o usuário não tenha realizado nenhuma interação, você ainda precisará se conectar . É por isso que é um Efeito:
 * 
 * Com este código, você pode ter certeza de que sempre haverá uma conexão ativa com o servidor de bate-papo selecionado no momento, independentemente das interações específicas realizadas pelo usuário. Se o usuário apenas abriu seu aplicativo, selecionou uma sala diferente ou navegou para outra tela e voltou, seu Effect garante que o componente permanecerá sincronizado com a sala selecionada no momento e será reconectado sempre que necessário.
*/

import { useState, useEffect } from "react";

const serverUrl = "https://localhost:1234";

type PropsChatRoom = {
    roomId: string;
};

function ChatRoom({ roomId } : PropsChatRoom) {
  const [message, setMessage] = useState("");

  //este effect sincroniza com o componente para se manter conectado ao server em uma determinada sala
  //effect e necesseario sempre que a sincronização é necessaria
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);

  //manipulador de eventro são executados em resposta a interações especificas, como clicar
  function handleSendClick() {
    sendMessage(message);
  }

  return (
    <>
      <h1>Welcome to the {roomId} room!</h1>
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={handleSendClick}>Send</button>
    </>
  );
}

export default function App() {
  const [roomId, setRoomId] = useState("general");
  const [show, setShow] = useState(false);
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
      <button onClick={() => setShow(!show)}>
        {show ? "Close chat" : "Open chat"}
      </button>
      {show && <hr />}
      {show && <ChatRoom roomId={roomId} />}
    </>
  );
}


function sendMessage(message: string) {
  console.log("🔵 You sent: " + message);
}

function createConnection(serverUrl: string, roomId: string) {
  // implementação real do mundo atual realmente conectaria em um servidor
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