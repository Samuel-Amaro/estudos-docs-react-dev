/**
 * * DECLARANDO UM EVENTO DE EFEITO
 *
 *  !Em construção: Esta seção descreve uma API experimental que ainda não foi lançada em uma versão estável do React.
 *
 * Use um Gancho especial chamado useEffectEvent para extrair essa lógica não reativa do seu Efeito:
 * 
 * Aqui, onConnected é chamado de Evento de Efeito. Faz parte da lógica do Effect, mas se comporta muito mais como um manipulador de eventos. A lógica dentro dele não é reativa e sempre “vê” os valores mais recentes de seus props e state.
 * 
 * Agora você pode chamar o onConnectedEffect Event de dentro do seu Effect:
 * 
 * Isso resolve o problema. Observe que você teve que remover onConnected da lista de dependências do seu efeito. Eventos de efeito não são reativos e devem ser omitidos das dependências.
 * 
 * Você pode pensar nos eventos de efeito como sendo muito semelhantes aos manipuladores de eventos. A principal diferença é que os manipuladores de eventos são executados em resposta às interações do usuário, enquanto os eventos de efeito são acionados por você a partir de efeitos. Os eventos de efeito permitem “quebrar a cadeia” entre a reatividade dos efeitos e o código que não deve ser reativo.
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

function ChatRoom({ roomId, theme }: PropsChatRoom) {
  //effect e reativo, a cada mudança de roomId e theme variaveis de dependencias ele sincroniza novamente se conectando a um server fake, e sincronizando uma notificação, mas a um incomodo aqui
  //preciamos separar essa logica não reativo do efeito reativo ao seu redor
  //so precisamos mostrar a notifiication quando o usuario conecta em uma nova sala, ao mudar theme variavel de dependencia não precisa mostrar, arrumar aqui

  //Use um Gancho especial chamado useEffectEvent para extrair essa lógica não reativa do seu Efeito:
  //aqui onConnected e um evento de efeito
  //faz parte da logica do effect mas se comporta como um manipulador de eventos a logica dentro dele não e reativa e sempre vê os valores mais recentes de seus props e state
  //!OBS: API EXPERIMENTAL DO REACT AINDA NÃO LANÇADA EM UMA VERSÃO ESTÁVEL DO REACT
  const onConnected = useEffectEvent(() => {
    showNotification("Connected!", theme);
  });

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on("connected", () => {
      onConnected();
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);

  return <h1>Welcome to the {roomId} room!</h1>;
}

export default function AppChatRoomToastEffectEvent() {
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
