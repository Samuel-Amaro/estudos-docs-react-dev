import React from "react";

/**
 * Neste exemplo, <button onClick={onSmash}>mostra que o navegador <button>(minúsculas) ainda precisa de um prop chamado onClick, mas o nome do prop recebido pelo seu Button componente customizado fica a seu critério!
 *
 * Quando seu componente oferece suporte a várias interações, você pode nomear props do manipulador de eventos para conceitos específicos do aplicativo. Por exemplo, este Toolbar componente recebe onPlayMovie e onUploadImage manipuladores de eventos:
 */

type TypePropsButton = {
  onClick: () => void;
  children: React.ReactNode;
};

function Button({ onClick, children }: TypePropsButton) {
  //define onSmash prop como o manipulador do evento
  //aciona essa prop quando o evento for acionado
  return (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  );
}

type TypePropsToolbar = {
  onPlayMovie: () => void;
  onUploadImage: () => void;
};

function Toolbar({ onPlayMovie, onUploadImage }: TypePropsToolbar) {
  return (
    <div>
      <Button onClick={onPlayMovie}>Play Movie</Button>
      <Button onClick={onUploadImage}>Upload Image</Button>
    </div>
  );
}

export default function AppToolbar() {
  return (
    //para prop passada para o componente especificamos como valor manipuladores de eventos inline, passamos manipuladores de veentos inline definindos no componente pai, para manipular eventos no componente filho
    <Toolbar
      onPlayMovie={() => alert("Playing!")}
      onUploadImage={() => alert("Uploading!")}
    />
  );
}

/**
 * Observe como o Appcomponente não precisa saber o que Toolbar fará com onPlayMovieou onUploadImage. Esse é um detalhe de implementação do Toolbar. Aqui, Toolbaros passa como onClickmanipuladores para seus Buttons, mas também pode acioná-los posteriormente em um atalho de teclado. Nomear adereços após interações específicas do aplicativo, como, onPlayMovie oferece flexibilidade para alterar como eles são usados ​​posteriormente.
 */
