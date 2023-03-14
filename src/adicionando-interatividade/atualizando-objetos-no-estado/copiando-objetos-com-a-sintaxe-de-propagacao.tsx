/**
 * * COPIANDO OBJETOS COM A SINTAXE DE PROPAGAÇÃO
 *
 *  No exemplo anterior, o position objeto é sempre criado a partir da posição atual do cursor. Mas muitas vezes você desejará incluir os dados existentes como parte do novo objeto que está criando. Por exemplo, você pode querer atualizar apenas um campo em um formulário, mas manter os valores anteriores para todos os outros campos.
 *
 * Esses campos de entrada não funcionam porque os onChange manipuladores alteram o estado:
 */

import { useState } from "react";

export default function Form2() {
  const [person, setPerson] = useState({
    firstName: "Barbara",
    lastName: "Hepworth",
    email: "bhepworth@sculpture.com",
  });

  function handleFirstNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    //person.firstName = e.target.value;
    setPerson({
        ...person,
        firstName: e.target.value
    });
  }

  function handleLastNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    //person.lastName = e.target.value;
    setPerson({
      ...person,
      lastName: e.target.value,
    });
  }

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    //person.email = e.target.value;
    setPerson({
      ...person,
      email: e.target.value,
    });
  }

  return (
    <>
      <label>
        First name:
        <input
          type="text"
          name="first-name"
          value={person.firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:
        <input
          type="text"
          name="last-name"
          value={person.lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={person.email}
          onChange={handleEmailChange}
        />
      </label>
      <p>
        {person.firstName} {person.lastName} ({person.email})
      </p>
    </>
  );
}

/**
 * Por exemplo, esta linha muda o estado de uma renderização anterior:
 */

//person.firstName = e.target.value;

/**
 * A maneira confiável de obter o comportamento que você está procurando é criar um novo objeto e passá-lo para setPerson. Mas aqui, você também deseja copiar os dados existentes porque apenas um dos campos foi alterado:
 */

/*setPerson({
  firstName: e.target.value, // New first name from the input
  lastName: person.lastName,
  email: person.email
});*/

/**
 * Você pode usar a sintaxe ... de difusão de objeto para não precisar copiar cada propriedade separadamente. 
 
    setPerson({
  ...person, // Copy the old fields
  firstName: e.target.value // But override this one
});

 * 
 * Agora o formulário funciona!
 * 
 * Observe como você não declarou uma variável de estado separada para cada campo de entrada. Para formulários grandes, manter todos os dados agrupados em um objeto é muito conveniente, desde que você o atualize corretamente!
 * 
 * Observe que a ...sintaxe de propagação é “superficial” – ela copia apenas um nível de profundidade. Isso o torna rápido, mas também significa que, se você quiser atualizar uma propriedade aninhada, precisará usá-la mais de uma vez.
*/
