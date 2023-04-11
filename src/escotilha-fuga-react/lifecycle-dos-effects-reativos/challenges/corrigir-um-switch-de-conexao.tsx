/**
 * * CORRIGIR UM SWITCH DE CONEXÃO
 *
 *  Neste exemplo, o serviço de chat chat.js expõe duas APIs diferentes: createEncryptedConnection e createUnencryptedConnection. O App componente raiz permite que o usuário escolha se deseja usar criptografia ou não e, em seguida, passa o método API correspondente para o ChatRoomcomponente filho como createConnectionprop.
 *
 * Observe que, inicialmente, os logs do console informam que a conexão não está criptografada. Tente ativar a caixa de seleção: nada acontecerá. No entanto, se você alterar a sala selecionada depois disso, o bate-papo será reconectado e ativará a criptografia (como você verá nas mensagens do console). Isso é um bug. Corrija o bug para que alternar a caixa de seleção também faça com que o bate-papo seja reconectado.
 */

import { useEffect, useState } from "react";
import "./style3.css";

export default function AppChatRoom3() {
  const [roomId, setRoomId] = useState("general");
  const [isEncrypted, setIsEncrypted] = useState(false);
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
          checked={isEncrypted}
          onChange={(e) => setIsEncrypted(e.target.checked)}
        />
        Enable encryption
      </label>
      <hr />
      <ChatRoom
        roomId={roomId}
        createConnection={
          isEncrypted ? createEncryptedConnection : createUnencryptedConnection
        }
      />
    </>
  );
}

type PropsChatRoom = {
  roomId: string;
  createConnection: (roomId: string) => {
    connect: () => void;
    disconnect: () => void;
  };
};

function ChatRoom({ roomId, createConnection }: PropsChatRoom) {
  useEffect(() => {
    const connection = createConnection(roomId);
    connection.connect();
    return () => connection.disconnect();
  }, [createConnection, roomId]);
  return <h1>Welcome to the {roomId} room!</h1>;
}

function createEncryptedConnection(roomId: string) {
  // Uma implementação real realmente se conectaria ao servidor
  return {
    connect() {
      console.log('✅ 🔐 Connecting to "' + roomId + "... (encrypted)");
    },
    disconnect() {
      console.log('❌ 🔐 Disconnected from "' + roomId + '" room (encrypted)');
    },
  };
}

function createUnencryptedConnection(roomId: string) {
  // Uma implementação real realmente se conectaria ao servidor
  return {
    connect() {
      console.log('✅ Connecting to "' + roomId + "... (unencrypted)");
    },
    disconnect() {
      console.log('❌ Disconnected from "' + roomId + '" room (unencrypted)');
    },
  };
}
