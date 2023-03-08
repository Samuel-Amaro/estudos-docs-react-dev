import React from "react";

/**
 * * NOMEANDO ADEREÇOS(PROPS) DO MANIPULADOR DE EVENTOS 
 * 
 * Componentes integrados como <button> e <div> suportam apenas nomes de eventos do navegador como onClick. No entanto, quando você está construindo seus próprios componentes, você pode nomear seus suportes de manipulador de eventos da maneira que desejar.
 * 
 * Por convenção, as props do manipulador de eventos devem começar com on, seguido por uma letra maiúscula.
 * 
 * Por exemplo, o prop Button do componente onClick poderia ter sido chamado onSmash:
*/

type TypePropsButton = {
  onSmash: () => void;
  children: React.ReactNode;
};

function Button({ onSmash, children }: TypePropsButton) {
  //define onSmash prop como o manipulador do evento
  //aciona essa prop quando o evento for acionado
  return (
    <button type="button" onClick={onSmash}>
      {children}
    </button>
  );
}

export default function App() {
  return (
    <div>
      <Button onSmash={() => alert("Playing!")}> Play Movie</Button>
      <Button onSmash={() => alert("Uploading!")}>Upload Image</Button>
    </div>
  );
}

/**
 * Neste exemplo, <button onClick={onSmash}>mostra que o navegador <button>(minúsculas) ainda precisa de um prop chamado onClick, mas o nome do prop recebido pelo seu Button componente customizado fica a seu critério!
 * 
 * Quando seu componente oferece suporte a várias interações, você pode nomear props do manipulador de eventos para conceitos específicos do aplicativo. Por exemplo, este Toolbar componente recebe onPlayMovie e onUploadImage manipuladores de eventos:
*/