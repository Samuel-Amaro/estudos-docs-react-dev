import React from "react";

/**
 * * PROPAGAÇÃO DE EVENTOS 
 * 
 * Os manipuladores de eventos também capturarão eventos de qualquer filho que seu componente possa ter. Dizemos que um evento “borbulha” ou “se propaga” na árvore: começa onde o evento aconteceu e depois sobe na árvore.
 * 
 * Este <div> contém dois botões. Tanto o <div> como cada botão têm seus próprios onClick manipuladores. Quais manipuladores você acha que serão acionados quando você clicar em um botão?
*/

export default function Toolbar() {
    return (
        //adiciona manipuladores de eventos inline, usando arrow function, para que quando o evento for acionado o manipular responder, chamando a alert function
        <div className="Toolbar" onClick={() => {
            alert('You clicked on the toolbar!');
        }}>
            <button onClick={() => alert('Playing!')}>
                Play Movie
            </button>
            <button onClick={() => alert('Uploading!')}>
                Upload Image
            </button>
        </div>
    );
}

/**
 * Se você clicar em qualquer um dos botões, ele onClick será executado primeiro, seguido pelo <div> pai onClick. Então, duas mensagens aparecerão. Se você clicar na própria barra de ferramentas, apenas a do pai <div> será onClick executada.
 * 
 * Armadilha: Todos os eventos se propagam no React, exceto onScroll, que só funciona na tag JSX à qual você o anexa.
*/