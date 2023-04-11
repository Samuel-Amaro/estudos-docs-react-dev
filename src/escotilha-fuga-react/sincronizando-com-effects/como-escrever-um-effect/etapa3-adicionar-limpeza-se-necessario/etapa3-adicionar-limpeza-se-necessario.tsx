/**
 * * ETAPA 3: ADICIONAR LIMPEZA(cleanup) SE NECESSARIO
 *
 * Considere um exemplo diferente. Você está escrevendo um ChatRoom componente que precisa se conectar ao servidor de chat quando ele aparecer. Você recebe uma createConnection() API que retorna um objeto com métodos connect() e disconnect(). Como você mantém o componente conectado enquanto ele é exibido para o usuário?
 *
 * Comece escrevendo a lógica do Efeito:
 */

//useEffect(() => {
//  const connection = createConnection();
//  connection.connect();
//});

/**
 * Seria lento conectar-se ao chat após cada renderização, então você adiciona a matriz de dependência:
 */

//useEffect(() => {
//  const connection = createConnection();
//  connection.connect();
//}, []);

/**
 * O código dentro do Effect não usa nenhum props ou estado, então sua matriz de dependência é [](vazia). Isso diz ao React para executar esse código apenas quando o componente “montar”, ou seja, aparecer na tela pela primeira vez.
 *
 * Vamos tentar rodar este código:
 */

import { useEffect } from "react";

export default function ChatRoom() {
  //chamamos o hook no nivel superior do componente e colocamos algum codigo dentro do seu efeito
  //Toda vez que seu componente for renderizado, o React atualizará a tela e executará o código dentro do useEffect.
  //aqui e um exemplo de um effect para sincronizar com um sistema externo
  useEffect(
    //efeito - effect
    () => {
      //esse effect especificado aqui sera executado apenas na montagem, quando aparecer na tela pela primeira vez
      //aqui dentro especificamos o nosso side effect(efeito colateral)
      //nosso efeito colateral aqui e se concetar ao servidor de chat quando ele aparecer
      const connection = createConnection();
      connection.connect();
    },
    //aqui e onde podemos dizer ao react para ignorar a reexecução desnecessario do effect, especificando uma array de dependencias como segundo argumento para a useEffect chamada
    //O código dentro do Effect não usa nenhum props ou estado, então sua matriz de dependência é [](vazia). Isso diz ao React para executar esse código apenas quando o componente “montar”, ou seja, aparecer na tela pela primeira vez.
    []
  );
  return <h1>Welcome to the chat!</h1>;
}

function createConnection() {
  // Uma implementação real realmente se conectaria ao servidor
  return {
    connect() {
      console.log("✅ Connecting...");
    },
    disconnect() {
      console.log("❌ Disconnected.");
    },
  };
}

/**
 * Este efeito é executado apenas na montagem, portanto, você pode esperar "✅ Connecting..." que seja impresso uma vez no console. No entanto, se você verificar o console, "✅ Connecting..."será impresso duas vezes. Por que isso acontece?
 * Este efeito é executado apenas na montagem, portanto, você pode esperar "✅ Connecting..." que seja impresso uma vez no console. No entanto, se você verificar o console, "✅ Connecting..."será impresso duas vezes. Por que isso acontece?
 * 
 * 
 */
