import React from "react";

/**
 * * PREVENÇÃO DO COMPORTAMENTO PADRÃO
 * 
 * Alguns eventos do navegador têm comportamento padrão associado a eles. Por exemplo, um <form>evento submit, que acontece quando um botão dentro dele é clicado, irá recarregar a página inteira por padrão:
*/

export default function Signup() {
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            alert('Submitting!')
        }}>
            <input type="text"/>
            <button type="button">Send</button>
        </form>
    );
}

/**
 * Você pode chamar e.preventDefault() o objeto de evento para impedir que isso aconteça:
 * 
 * Não confunda e.stopPropagation() e e.preventDefault(). Ambos são úteis, mas não estão relacionados:
 * 
    *  e.stopPropagation() impede que os manipuladores de eventos anexados às tags acima sejam disparados.
    * 
    * e.preventDefault() impede o comportamento padrão do navegador para os poucos eventos que o possuem.
*/