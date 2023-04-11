/**
 * * EXEMPLO: FOCANDO UMA INPUT DE TEXTO
 * 
 * Neste exemplo, clicar no botão focalizará a input:
*/

//acessando um no dom gerenciado pelo react, para aplicar focus

//importando o hook useRef
import { useRef } from "react";

export default function Form() {
  //usando o hook useRef para declarar uma ref dentro do componente
  //o useRef hook retorna um objeto com uma unica propriedade chamada current
  const inputRef = useRef<HTMLInputElement | null>(null);

  function getRef() {
    //lendo o no DOM de <input> por meio da inputRef.current, logo depois chamando o focus() para o no
    //inicialmente inputRef.current sera null
    if(!inputRef.current) {
        throw new Error("Error in ref input");
    }
    return inputRef.current;
  }

  function handleClick() {
    getRef().focus();
  }

  return (
    //passamos a ref declarada para o no DOM por meio do atributo ref 
    //quando o react cria um no dom para o <input>, o react colocara uma referencia a esse no em inputRef.current
    //isso diz ao react para colocar o input no dom em inputRef.current
    <>
      <input ref={inputRef} />
      <button onClick={handleClick}>Focus the input</button>
    </>
  );
}

/**
 * Para implementar isso:
 * 
    *  Declare inputRef com o useRef Gancho.
    * 
    * Passe como <input ref={inputRef}>. Isso diz ao React para colocar este <input> nó DOM em inputRef.current.
    * 
    * Na handleClick função, leia o nó DOM de entrada inputRef.currente chame- focus() o com inputRef.current.focus().
    * 
    * Passe o handleClick manipulador de eventos para <button> com onClick.
    * 
 * Embora a manipulação de DOM seja o caso de uso mais comum para refs, o useRef Hook pode ser usado para armazenar outras coisas fora do React, como IDs de timer. Da mesma forma que o estado, os refs permanecem entre as renderizações. As referências são como variáveis ​​de estado que não acionam novas renderizações quando você as define
*/