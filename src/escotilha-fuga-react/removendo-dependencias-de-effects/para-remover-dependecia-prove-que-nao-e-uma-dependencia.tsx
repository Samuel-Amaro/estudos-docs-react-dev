/**
 * * PARA REMOVER UMA DEPENDÊNCIA, PROVE QUE NÃO É UMA DEPENDÊNCIA
 * 
 *  Observe que você não pode “escolher” as dependências do seu Efeito. Todo valor reativo usado pelo código do seu Effect deve ser declarado em sua lista de dependências. A lista de dependências é determinada pelo código circundante:
 * 
    
    const serverUrl = 'https://localhost:1234';

    function ChatRoom({ roomId }) { //este e um valor reativo
    useEffect(() => {
        const connection = createConnection(serverUrl, roomId); // Este efeito lê esse valor reativo
        connection.connect();
        return () => connection.disconnect();
    }, [roomId]); // ✅ Portanto, você deve especificar esse valor reativo como uma dependência do seu efeito
    // ...
    }

 * Os valores reativos incluem props e todas as variáveis ​​e funções declaradas diretamente dentro do seu componente. Como roomId é um valor reativo, você não pode removê-lo da lista de dependências. O linter não permitiria:
 
    const serverUrl = 'https://localhost:1234';

    function ChatRoom({ roomId }) {
    useEffect(() => {
        const connection = createConnection(serverUrl, roomId);
        connection.connect();
        return () => connection.disconnect();
    }, []); // 🔴 React Hook useEffect tem uma dependência ausente: 'roomId'
    // ...
    }

 * E o linter daria certo! Como roomId pode mudar com o tempo, isso introduziria um bug em seu código.
 * 
 * Para remover uma dependência, “prove” ao linter que não precisa ser uma dependência. Por exemplo, você pode sair roomId do seu componente para provar que ele não é reativo e não será alterado nas novas renderizações:
 
    const serverUrl = 'https://localhost:1234';
    const roomId = 'music'; // não e um valor reativo e mais um qualquer

    function ChatRoom() {
    useEffect(() => {
        const connection = createConnection(serverUrl, roomId);
        connection.connect();
        return () => connection.disconnect();
    }, []); // ✅ todas dependências declaradas
    // ...
    }

 * 
 * Agora que roomId não é um valor reativo (e não pode mudar em uma nova renderização), não precisa ser uma dependência:
 * 
 * É por isso que agora você pode especificar uma lista de dependências vazia ( []). Seu efeito realmente não depende mais de nenhum valor reativo, então ele realmente não precisa ser executado novamente quando qualquer um dos adereços ou estado do componente mudar.
*/


import { useEffect, useState } from "react";

const serverUrl = "https://localhost:1234";
const roomId= 'music';

export default function ChatRoom2() {
  //* ao escrever efeito tenho que especificar como iniciar e parar o que desejo que o meu efeito colateral faça
  //efeitos reagem a valores reativos como props e state informardos no array de dependencias
  useEffect(() => {
    //* 1: aqui dentro do efeito deste exemplo não lemos ou usamos valores reativos como props e states
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
    //* incluiu todos os valores reativos (como props e state) que o Effect lê na lista de dependências do seu Effect. Isso garante que seu efeito permaneça sincronizado com os últimos adereços e estado de seu componente.
    //* 2: É por isso que agora você pode especificar uma lista de dependências vazia ( []). Seu efeito realmente não depende mais de nenhum valor reativo, então ele realmente não precisa ser executado novamente quando qualquer um dos adereços ou estado do componente mudar.
  }, []); //✅ todas dependencias declaradas
  return <h1>Welcome to the {roomId} room!</h1>;
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
