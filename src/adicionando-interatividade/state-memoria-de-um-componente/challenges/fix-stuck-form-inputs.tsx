import { useState } from "react";

/**
 * * Corrigir entradas de formulário travadas
 *
 * Quando você digita nos campos de entrada, nada aparece. É como se os valores de entrada estivessem “presos” com strings vazias. O valuedo primeiro <input>é definido para sempre corresponder à firstNamevariável e o valuedo segundo <input>é definido para sempre corresponder à lastNamevariável. Isto está certo. Ambas as entradas possuem onChangemanipuladores de eventos, que tentam atualizar as variáveis ​​com base na última entrada do usuário ( e.target.value). No entanto, as variáveis ​​não parecem “lembrar” seus valores entre as novas renderizações. Corrija isso usando variáveis ​​de estado.
 *
 * @returns
 */

export default function Form() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  function handleFirstNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFirstName(e.target.value);
  }

  function handleLastNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLastName(e.target.value);
  }

  function handleReset() {
    setFirstName("");
    setLastName("");
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        placeholder="First name"
        value={firstName}
        onChange={handleFirstNameChange}
      />
      <input
        placeholder="Last name"
        value={lastName}
        onChange={handleLastNameChange}
      />
      <h1>
        Hi, {firstName} {lastName}
      </h1>
      <button onClick={handleReset}>Reset</button>
    </form>
  );
}
