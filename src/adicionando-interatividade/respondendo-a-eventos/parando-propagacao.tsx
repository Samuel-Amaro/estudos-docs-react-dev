import React from "react";

/**
 * * PARANDO A PROPAGAÇÃO
 *
 *  Os manipuladores de eventos recebem um objeto de evento como seu único argumento. Por convenção, costuma ser chamado de e, que significa “evento”. Você pode usar este objeto para ler informações sobre o evento.
 *
 * Esse objeto de evento também permite interromper a propagação. Se você deseja evitar que um evento atinja os componentes pais, você precisa chamar e.stopPropagation() como este Button componente faz:
 */

type TypePropsButton = {
  onClick: () => void;
  children: React.ReactNode;
};

function Button({ onClick, children }: TypePropsButton) {
  //define onSmash prop como o manipulador do evento
  //aciona essa prop quando o evento for acionado
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {children}
    </button>
  );
}

export default function Toolbar() {
  return (
    <div>
      <Button onClick={() => alert("Playing!")}>Play Movie</Button>
      <Button onClick={() => alert("Uploading!")}>Upload Image</Button>
    </div>
  );
}

/**
 * Ao clicar em um botão:
 * 
    *  React chama o onClick manipulador passado para <button>.
    * 
    * Esse manipulador, definido em Button, faz o seguinte:
    * 
        *  Chama e.stopPropagation(), impedindo que o evento borbulhe ainda mais.
        * 
        * Chama a onClick função, que é uma propriedade passada do Toolbar componente.
        * 
    * Essa função, definida no Toolbar componente, exibe o próprio alerta do botão.  
    * 
    * Como a propagação foi interrompida, o manipulador <div> do pai não é executado.onClick
    * 
 * Como resultado de e.stopPropagation(), clicar nos botões agora mostra apenas um único alerta (do <button>) em vez de dois deles (do <button>e da barra de ferramentas pai <div>). Clicar em um botão não é a mesma coisa que clicar na barra de ferramentas circundante, portanto, interromper a propagação faz sentido para essa interface do usuário. 
*/