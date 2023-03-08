import React from "react";

/**
 * * LENDO ADEREÇOS(PROPS) EM MANIPULADORES DE EVENTOS
 * 
 * Como os manipuladores de eventos são declarados dentro de um componente, eles têm acesso às props do componente. Aqui está um botão que, quando clicado, mostra um alerta com seu message suporte:
*/

type PropsAlertButton = {
    message: string;
    children: React.ReactNode;
};

function AlertButton({message, children}: PropsAlertButton) {
    //lendo os props do componente em manipuladores de eventos
    return (
        //usando uma arrow function para definir uma manipulador de eventos inline
        <button type="button" onClick={() => alert(message)}>
            {children}
        </button>
    );
}

export default function Toolbar() {
    return (
      <div>
        <AlertButton message="Playing!">Play Movie</AlertButton>
        <AlertButton message="Uploading!">Upload Image</AlertButton>
      </div>
    );
}

/**
 * Isso permite que esses dois botões mostrem mensagens diferentes. Tente alterar as mensagens passadas para eles.
*/