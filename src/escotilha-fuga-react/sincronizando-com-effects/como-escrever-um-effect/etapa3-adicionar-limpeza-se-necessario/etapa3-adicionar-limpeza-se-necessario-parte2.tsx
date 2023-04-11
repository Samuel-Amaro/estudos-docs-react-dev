/**
 * Este efeito é executado apenas na montagem, portanto, você pode esperar "✅ Connecting..."que seja impresso uma vez no console. No entanto, se você verificar o console, "✅ Connecting..."será impresso duas vezes. Por que isso acontece?
 * 
 * Imagine que o ChatRoom componente faz parte de um aplicativo maior com muitas telas diferentes. O usuário inicia sua jornada na ChatRoom página. O componente é montado e chamado connection.connect(). Em seguida, imagine que o usuário navegue para outra tela, por exemplo, para a página Configurações. O ChatRoom componente desmonta. Por fim, o usuário clica em Voltar e ChatRoom monta novamente. Isso estabeleceria uma segunda conexão - mas a primeira conexão nunca foi destruída! À medida que o usuário navega pelo aplicativo, as conexões continuam se acumulando.
 * 
 * Bugs como esse são fáceis de perder sem testes manuais extensivos. Para ajudá-lo a localizá-los rapidamente, no desenvolvimento, o React remonta cada componente imediatamente após sua montagem inicial.
 * 
 * Ver o "✅ Connecting..."log duas vezes ajuda a perceber o problema real: seu código não fecha a conexão quando o componente é desmontado.
 * 
 * Para corrigir o problema, retorne uma função de limpeza do seu Efeito:
 * 
 * O React chamará sua função de limpeza toda vez antes que o Effect seja executado novamente e uma última vez quando o componente desmontar (ser removido). Vamos ver o que acontece quando a função de limpeza é implementada:
*/

import { useEffect } from "react";

export default function ChatRoom2() {
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

      //retorna uma function cleanup - limpeza do effect
      //o react chamara esta function toda vez antes que o effect seja executado novamente e uma ultima vez quando o componente desmontar(ser removido)
      return () => {
        //antes de executar o effect novamente desconectamos, fechamos a conexão
        connection.disconnect();
      };
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
 * Este é o comportamento correto no desenvolvimento. Ao remontar seu componente, o React verifica se navegar para longe e para trás não quebraria seu código. Desconectar e conectar novamente é exatamente o que deve acontecer! Quando você implementa bem a limpeza, não deve haver nenhuma diferença visível ao usuário entre executar o Effect uma vez e executá-lo, limpá-lo e executá-lo novamente. Há um par extra de chamada de conectar/desconectar porque o React está sondando seu código em busca de bugs no desenvolvimento. Isso é normal - não tente fazer com que desapareça!
 * 
 * Na produção, você só veria "✅ Connecting..."impresso uma vez. A remontagem de componentes ocorre apenas no desenvolvimento para ajudá-lo a encontrar efeitos que precisam de limpeza. Você pode desativar o Modo estrito para desativar o comportamento de desenvolvimento, mas recomendamos mantê-lo ativado. Isso permite que você encontre muitos bugs como o acima.
 */
