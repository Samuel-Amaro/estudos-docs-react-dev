/**
 * * EVITE ESTADO REDUNDANTE
 *
 *  Se você pode calcular algumas informações dos props do componente ou de suas variáveis ​​de estado existentes durante a renderização, não deve colocar essas informações no estado desse componente.
 *
 * Por exemplo, pegue este formulário. Funciona, mas você consegue encontrar algum estado redundante nele?
 */

import React, { useState } from "react";

export default function Form5() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  //const [fullName, setFullName] = useState("");

  function handleFirstNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFirstName(e.target.value);
    //setFullName(e.target.value + " " + lastName);
  }

  function handleLastNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLastName(e.target.value);
    //setFullName(firstName + " " + e.target.value);
  }

  //Aqui, fullName não é uma variável de estado. Em vez disso, é calculado durante a renderização:
  //Como resultado, os manipuladores de alteração não precisam fazer nada de especial para atualizá-lo. Quando você chama setFirstName ou setLastName, você aciona uma nova renderização e, em seguida, a próxima fullName será calculada a partir dos dados atualizados.
  const fullName = firstName + " " + lastName;

  return (
    <>
      <h2>Let’s check you in</h2>
      <label>
        First name: <input value={firstName} onChange={handleFirstNameChange} />
      </label>
      <label>
        Last name: <input value={lastName} onChange={handleLastNameChange} />
      </label>
      <p>
        Your ticket will be issued to: <b>{fullName}</b>
      </p>
    </>
  );
}

/**
 * Este formulário tem três variáveis ​​de estado: firstName, lastNamee fullName. No entanto, fullNameé redundante. Você sempre pode calcular fullNamea partir firstName e lastName durante a renderização, portanto, remova-o do estado.
 * 
 * É assim que você pode fazer:
 * 
 * Como resultado, os manipuladores de alteração não precisam fazer nada de especial para atualizá-lo. Quando você chama setFirstNameou setLastName, você aciona uma nova renderização e, em seguida, a próxima fullName será calculada a partir dos dados atualizados.
 */
