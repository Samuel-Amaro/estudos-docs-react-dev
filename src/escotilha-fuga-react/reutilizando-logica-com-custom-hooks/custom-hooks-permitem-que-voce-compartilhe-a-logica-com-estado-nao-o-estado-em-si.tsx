/**
 * * CUSTOM HOOKS PERMITEM QUE VOCÊ COMPARTILHE A LÓGICA COM ESTADO, NÃO O ESTADO EM SI
 *
 * No exemplo anterior, quando você ligava e desligava a rede, ambos os componentes eram atualizados juntos. No entanto, é errado pensar que uma única isOnlinevariável de estado é compartilhada entre eles.
 *
 * Estas são duas variáveis ​​de estado e efeitos completamente independentes! Acontece que eles têm o mesmo valor ao mesmo tempo porque você os sincronizou com o mesmo valor externo (independentemente de a rede estar ligada).
 *
 * Para melhor ilustrar isso, precisaremos de um exemplo diferente. Considere este Form componente:
 */

import { useState } from "react";

export default function FormApp() {
  //usando o custom hook criado, duas vezes, o custom hook compartilha a logica com o estado, não o estado em si, aqui temos dois pedaços de estado para cada input, que são sincronizados e atualizados de forma independente
  //aqui e como se estivessemos declarando duas variaveis de estado separadas
  const firstNameProps = useFormInput("Mary");
  const lastNameProps = useFormInput("Poppins");

  /*
  //codigo usado antes de usar custom hoook
  const [firstName, setFirstName] = useState("Mary");
  const [lastName, setLastName] = useState("Poppins");

  function handleFirstNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFirstName(e.target.value);
  }

  function handleLastNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLastName(e.target.value);
  }*/

  return (
    <>
      <label>
        First name:
        <input {...firstNameProps} />
      </label>
      <label>
        Last name:
        <input {...lastNameProps} />
      </label>
      <p>
        <b>
          Good morning, {firstNameProps.value} {lastNameProps.value}.
        </b>
      </p>
    </>
  );
}

/**
 * Existe alguma lógica repetitiva para cada campo de formulário:
 *
 * Há um pedaço de estado ( firstName e lastName).
 *
 * Há um manipulador de alterações ( handleFirstNameChange e handleLastNameChange).
 *
 * Há uma parte do JSX que especifica os atributos value e onChange para essa entrada.
 *
 * Você pode extrair a lógica repetitiva neste useFormInputHook customizado:
 */

//custom hook
export function useFormInput(initialValue: string) {
  //pedaço de estado
  const [value, setValue] = useState(initialValue);

  //manipulador de alterações, de evento
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  //valores que precisam ser informados ao JSX
  const inputProps = {
    value: value,
    onChange: handleChange,
  };

  return inputProps;
}

/**
 * Observe que ele declara apenas uma variável de estado chamada value.
 *
 * No entanto, o Form componente chama useFormInput duas vezes:
 *
 * É por isso que funciona como declarar duas variáveis ​​de estado separadas!
 *
 * Ganchos personalizados permitem que você compartilhe a lógica com estado , mas não o próprio estado. Cada chamada para um Hook é completamente independente de todas as outras chamadas para o mesmo Hook. É por isso que os dois sandboxes acima são completamente equivalentes. Se desejar, volte para cima e compare-os. O comportamento antes e depois de extrair um Hook customizado é idêntico.
 *
 * Quando você precisar compartilhar o próprio estado entre vários componentes, levante-o e passe-o para baixo.
 */
