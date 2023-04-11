/**
 * * FOCAR EM UM CAMPO CONDICIONALMENTE
 *
 *  Este formulário renderiza dois <MyInput /> componentes.
 *
 * Pressione “Mostrar formulário” e observe que o segundo campo fica focado automaticamente. Isso ocorre porque ambos os <MyInput />componentes tentam focar o campo interno. Quando você chama focus() dois campos de entrada seguidos, o último sempre “ganha”.
 *
 * Digamos que você queira focar o primeiro campo. O primeiro MyInput componente agora recebe um shouldFocus prop booleano definido como true. Mude a lógica para que focus() só seja chamado se o shouldFocus prop recebido por My Input for true.
 *
 * Para verificar sua solução, pressione “Mostrar formulário” e “Ocultar formulário” repetidamente. Quando o formulário aparecer, apenas a primeira entrada deve ser focada. Isso ocorre porque o componente pai renderiza a primeira entrada com shouldFocus={true}e a segunda entrada com shouldFocus={false}. Verifique também se ambas as entradas ainda funcionam e se você pode digitar em ambas.
 */

import { useEffect, useRef, useState } from "react";

interface PropsMyInput extends React.ComponentPropsWithoutRef<"input"> {
  shouldFocus: boolean;
}

function MyInput(props: PropsMyInput) {
  const { shouldFocus, ...rest } = props;

  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (shouldFocus) ref.current?.focus();
  }, [shouldFocus]);

  return <input {...rest} ref={ref} />;
}

export default function Form2() {
  const [show, setShow] = useState(false);
  const [firstName, setFirstName] = useState("Taylor");
  const [lastName, setLastName] = useState("Swift");
  const [upper, setUpper] = useState(false);
  const name = firstName + " " + lastName;
  return (
    <>
      <button onClick={() => setShow((s) => !s)}>
        {show ? "Hide" : "Show"} form
      </button>
      <br />
      <hr />
      {show && (
        <>
          <label htmlFor="first-name">
            Enter your first name:
            <MyInput
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              shouldFocus={true}
              id="first-name"
            />
          </label>
          <label htmlFor="last-name">
            Enter your last name:
            <MyInput
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              shouldFocus={false}
              id="last-name"
            />
          </label>
          <p>
            Hello, <b>{upper ? name.toUpperCase() : name}</b>
          </p>
        </>
      )}
    </>
  );
}
