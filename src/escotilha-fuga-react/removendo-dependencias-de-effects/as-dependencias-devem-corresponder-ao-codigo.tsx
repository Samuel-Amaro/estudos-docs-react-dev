/**
 * * AS DEPENDÊNCIAS DEVEM CORRESPONDER AO CÓDIGO
 *
 * Ao escrever um efeito, você primeiro especifica como iniciar e parar o que deseja que seu efeito faça:
 *
 * Então, se você deixar as dependências do Effect vazias ( []), o linter irá sugerir as dependências corretas:
 * 
 * Efeitos “reagem” a valores reativos. Como roomId é um valor reativo (pode mudar devido a uma nova renderização), o linter verifica se você o especificou como uma dependência. Se roomId receber um valor diferente, o React irá sincronizar novamente seu Efeito. Isso garante que o chat permaneça conectado à sala selecionada e “reage” ao menu suspenso:
 */

import { useEffect, useState } from "react";

const serverUrl = "https://localhost:1234";

type PropsChatRoom = {
  roomId: string;
};

function ChatRoom({ roomId }: PropsChatRoom) {
  //* ao escrever efeito tenho que especificar como iniciar e parar o que desejo que o meu efeito colateral faça
  //efeitos reagem a valores reativos como props e state informardos no array de dependencias
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
    //* incluiu todos os valores reativos (como props e state) que o Effect lê na lista de dependências do seu Effect. Isso garante que seu efeito permaneça sincronizado com os últimos adereços e estado de seu componente.
    //*roomId é um valor reativo (pode mudar devido a uma nova renderização)
  }, [roomId]); //✅ todas dependencias declaradas
  return <h1>Welcome to the {roomId} room!</h1>;
}

export default function App1() {
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
    </>
  );
}

function createConnection(serverUrl: string, roomId: string) {
  // A implementação real realmente se conectaria ao servidor
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
