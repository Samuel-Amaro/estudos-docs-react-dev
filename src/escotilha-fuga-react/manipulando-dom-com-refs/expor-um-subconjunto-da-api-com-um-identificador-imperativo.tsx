/**
 * * EXPOR UM SUBCONJUNTO DA API COM UM IDENTIFICADOR IMPERATIVO
 *
 * No exemplo acima, MyInput expõe o elemento de input DOM original. Isso permite que o componente pai chame o focus(). No entanto, isso também permite que o componente pai faça outra coisa, por exemplo, alterar seus estilos CSS. Em casos incomuns, você pode querer restringir a funcionalidade exposta. Você pode fazer isso com useImperativeHandle:
 */

import {
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";

export interface MyInputHandle{
  focus: () => void;
};

//Em vez disso, os componentes que desejam expor seus nós DOM precisam optar por esse comportamento.
//aqui temos um componente que expoe seu no dom
//Um componente pode especificar que “encaminha” sua referência para um de seus filhos. Veja como MyInput usar a forwardRef API:
//declaramos um componente usando forwardRef, isso o habilita a receber o inputRef do componente pai, como o segundo ref argumento que e declarado apos props
// eslint-disable-next-line react/display-name
const MyInputRef = forwardRef<
  MyInputHandle,
  React.ComponentPropsWithoutRef<"input">
>((props, ref) => {
  //declaramos uma ref para o componente
  //essa ref ira referenciar o real elemento dom input original
  //realInputRef contém o no dom de input real
  const realInputRef = useRef<HTMLInputElement | null>(null);
  //useImperativeHandle instrui o react a fornecer seu proprio objeto especial como valor de uma refs para o componente pai <MyInput />
  //em caos incomuns podemos querer restringir a funcionalidae exposta, aqui o normal era a gente expor o dom do componente, so que queremos restringir oque queremos permitir que possam fazer
  //aqui vamos restringir a funcionalidade exposta usando o userImperativeHandle
  useImperativeHandle(ref, () => ({
    // Expõe apenas o foco e nada mais
    focus() {
      if (!realInputRef.current) {
        throw new Error("error");
      }
      realInputRef.current.focus();
    },
  }));
  return <input {...props} ref={realInputRef} />;
});

export function Form3() {
  //declarando uma ref para um componente
  //usando o hook useRef para declarar uma ref dentro do componente
  //o useRef hook retorna um objeto com uma unica propriedade chamada current
  //aqui inputRef dentro do componente pai so vai ter o focus metodo, o ref handle não e o no dom mas o objeto personalizado que você criei dentro da useImperativeHandle chamada
  const inputRef = useRef<MyInputHandle>(null);

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
    <>
      {/*MyInput componente ela mesma passa o ref que recebeu para <input> elemento filho para dentro dela.*/}
      <MyInputRef ref={inputRef} />
      <button onClick={handleClick}>Focus the input</button>
    </>
  );
}

/**
 * Aqui, realInputRef dentro de  MyInput contém o nó DOM de entrada real. No entanto, useImperativeHandle instrui o React a fornecer seu próprio objeto especial como o valor de uma referência para o componente pai. Então inputRef.current dentro do Form componente só vai ter o focus método. Nesse caso, o ref “handle” não é o nó DOM, mas o objeto personalizado que você cria dentro da useImperativeHandle chamada.
*/