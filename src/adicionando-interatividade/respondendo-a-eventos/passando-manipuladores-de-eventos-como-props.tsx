import React from "react";

/**
 * * PASSANDO MANIPULADORES DE EVENTOS COMO PROPS
 * 
 * Freqüentemente, você desejará que o componente pai especifique o manipulador de eventos de um filho. Considere os botões: dependendo de onde você está usando um Button componente, você pode querer executar uma função diferente - talvez um reproduza um filme e outro faça upload de uma imagem.
 * 
 * Para fazer isso, passe um prop que o componente recebe de seu pai como o manipulador de eventos da seguinte forma:
*/

type TypePropsButton = {
    onClick: () => void;
    children: React.ReactNode; 
};

function Button({onClick, children}: TypePropsButton) {
    //define onClick prop como o manipulador do evento
    //aciona essa prop quando o evento for acionado
    return(
        <button type="button" onClick={onClick}>{children}</button>
    );
}

type TypePropsPlayButton = {
    movieName: string;
};

function PlayButton({movieName} : TypePropsPlayButton) {

    //definindo esta function defininda no componente pai como manipulador de eventos do componente filho Button 
    //especificando o manipulador de eventos de um componnete filho
    function handlePlayClick() {
        alert(`Playing ${movieName}!`);
    }

    return (
      <Button onClick={handlePlayClick}>Play &quot;{movieName}&ldquo;</Button>
    );
}

function UploadButton() {
    return (
        //definie um manipulador de eventos inline no componente pai para o componente filho
        <Button onClick={() => alert('Uploading!')}>
            Upload Image
        </Button>
    );
}

export default function Toolbar() {
    return (
        <div>
            <PlayButton movieName="Kiki's Delivery Service"/>
            <UploadButton />
        </div>
    );
}

/**
 * Aqui, o Toolbar componente renderiza a PlayButton e um UploadButton:
 * 
    * PlayButton passa handlePlayClick como onClick escora para Button dentro. 
    * 
    * UploadButton passa () => alert('Uploading!') como onClick escora para Button dentro.
    * 
 * Por fim, seu Buttoncomponente aceita uma prop chamada onClick. Ele passa esse suporte diretamente para o navegador integrado <button>com onClick={onClick}. Isso diz ao React para chamar a função passada ao clicar. 
 * 
 * Se você usar um sistema de design , é comum que componentes como botões contenham estilo, mas não especifiquem o comportamento. Em vez disso, os componentes gostam PlayButton e UploadButton passarão os manipuladores de eventos.
*/