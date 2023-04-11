/**
 * * ADICIONANDO UMA REFS(REFERÊNCIA) AO SEU COMPONENTE
 *
 */

//Você pode adicionar uma referência ao seu componente importando o useRef Hook do React:
import { useRef } from "react";

export default function Counter() {
  //Dentro do seu componente, chame o useRefHook e passe o valor inicial que você deseja referenciar como único argumento.
  //aqui estamos referenciando o valor 0
  //useRef hook retorna um objeto como este
  //{
  //    current: 0, -> o valor que eu passei inicialmente para o ref
  //}
  //ref e um objeto js simples com a current propriedade que podemos ler e modificar
  const ref = useRef<number>(0);

  function handleClick() {
    //posso acessar o valor atual da ref por meio da ref.current propriedade
    //esse valor e mutavel, posso ler e gravar na ref por meio de current propriedade
    //aqui estamos gravando um novo valor de referencia por meio de current
    ref.current = ref.current + 1;
    //aqui estamos lendo um valor de referencia
    alert("You clicked " + ref.current + " times!");
  }

  return <button onClick={handleClick}>Click me!</button>;
}

/**
 * Você pode acessar o valor atual dessa referência por meio da ref.current propriedade. Esse valor é intencionalmente mutável, o que significa que você pode ler e gravar nele. É como um bolso secreto do seu componente que o React não rastreia. (Isso é o que o torna uma “saída de escape” do fluxo de dados unidirecional do React — mais sobre isso abaixo!)
 * 
 * O ref aponta para um número, mas, como state , você pode apontar para qualquer coisa: uma string, um objeto ou até mesmo uma função. Ao contrário do estado, ref é um objeto JavaScript simples com a current propriedade que você pode ler e modificar.
 * 
 * Observe que o componente não é renderizado novamente a cada incremento. Assim como o estado, os refs são retidos pelo React entre as re-renderizações. No entanto, definir o estado renderiza novamente um componente. Mudar um ref não!
*/