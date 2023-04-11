/**
 * * ACESSANDO OS NÓS DOM DE OUTRO COMPONENTE
 *
 * Quando você coloca uma referência em um componente integrado que gera um elemento do navegador como <input />, o React definirá a current propriedade dessa referência para o nó DOM correspondente (como o real <input /> no navegador).
 *
 * No entanto, se você tentar colocar uma referência em seu próprio componente, como <MyInput />, por padrão, obterá null. Aqui está um exemplo demonstrando isso. Observe como clicar no botão não focaliza a entrada:
 */

//importando o hook useRef
import React, { forwardRef, useRef } from "react";

function MyInput(props: React.ComponentPropsWithoutRef<"input">) {
  return <input {...props} />;
}

export default function MyForm() {
  //declarando uma ref para um componente
  //usando o hook useRef para declarar uma ref dentro do componente
  //o useRef hook retorna um objeto com uma unica propriedade chamada current
  const inputRef = useRef(null);

  function getRef() {
    //lendo o itemsRef.current por meio da ref paramentro
    //inicialmente ref.current sera null
    if (!inputRef.current) {
      // Inicialize o array no primeiro uso.
      throw new Error("Error input componente");
    }
    //retorna uma ref para o componente
    return inputRef.current;
  }

  function handleClick() {
    //lendo o ref
    getRef().focus();
  }

  return (
    //fornecendo um ref para o componente por meio do atributo ref
    //No entanto, se você tentar colocar uma referência em seu próprio componente, como <MyInput />, por padrão, obterá null
    <>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>Focus the input</button>
    </>
  );
}

/**
 * Para ajudá-lo a perceber o problema, o React também imprime um erro no console:
 * 
 * Isso acontece porque, por padrão, o React não permite que um componente acesse os nós DOM de outros componentes. Nem mesmo para seus próprios filhos! Isso é intencional. Refs são uma saída de emergência que deve ser usada com moderação. A manipulação manual dos nós DOM de outro componente torna seu código ainda mais frágil.
 * 
 * Em vez disso, os componentes que desejam expor seus nós DOM precisam optar por esse comportamento. Um componente pode especificar que “encaminha” sua referência para um de seus filhos. Veja como MyInput usar a forwardRef API:
 * 
 * É assim que funciona:
 * 
    * <MyInput ref={inputRef} />diz ao React para colocar o nó DOM correspondente em inputRef.current. No entanto, cabe ao MyInput componente optar por isso - por padrão, não.
    * 
    * O MyInput componente é declarado usando forwardRef. Isso o habilita a receber o inputRef de cima como o segundo ref argumento que é declarado após props.
    * 
    * MyInput ela mesma passa o ref que recebeu para <input> dentro dela.
*/

//Em vez disso, os componentes que desejam expor seus nós DOM precisam optar por esse comportamento. 
//aqui temos um componente que expoe seu no dom
//Um componente pode especificar que “encaminha” sua referência para um de seus filhos. Veja como MyInput usar a forwardRef API:
//declaramos um componente usando forwardRef, isso o habilita a receber o inputRef do componente pai, como o segundo ref argumento que e declarado apos props
// eslint-disable-next-line react/display-name
const MyInputRef = forwardRef(
  (props: React.ComponentPropsWithoutRef<"input">, ref: React.ForwardedRef<HTMLInputElement>) => {
    return <input {...props} ref={ref} />;
  }
);

export function Form2() {
    const inputRef = useRef<HTMLInputElement | null>(null);

    function getRef() {
      //lendo o itemsRef.current por meio da ref paramentro
      //inicialmente ref.current sera null
      if (!inputRef.current) {
        // Inicialize o array no primeiro uso.
        throw new Error("Error input componente");
      }
      //retorna uma ref para o componente
      return inputRef.current;
    }

    function handleClick() {
      getRef().focus();
    }

    return (
      <>
        {/*MyInput componente ela mesma passa o ref que recebeu para <input> elemento filho para dentro dela.*/}
        <MyInputRef ref={inputRef} />
        <button onClick={handleClick}>Focus the input</button>
      </>
    );
}

/**
 * Em sistemas de design, é um padrão comum para componentes de baixo nível, como botões, entradas e assim por diante, encaminhar suas referências para seus nós DOM. Por outro lado, componentes de alto nível como formulários, listas ou seções de página geralmente não expõem seus nós DOM para evitar dependências acidentais na estrutura DOM.
*/