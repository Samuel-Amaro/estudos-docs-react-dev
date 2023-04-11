/**
 * * CORREÇÃO DA FETCH DENTRO DE UM EFEITO
 *
 * Este componente mostra a biografia da pessoa selecionada. Ele carrega a biografia chamando uma função assíncrona fetchBio(person) na montagem e sempre que person muda. Essa função assíncrona retorna um Promise que eventualmente resolve para uma string. Quando a busca é concluída, ele chama setBio para exibir essa string na caixa de seleção.
 *
 * Há um bug neste código. Comece selecionando “Alice”. Em seguida, selecione “Bob” e logo em seguida selecione “Taylor”. Se você fizer isso rápido o suficiente, notará esse bug: Taylor está selecionado, mas o parágrafo abaixo diz “Esta é a biografia de Bob”.
 *
 * Por que isso acontece? Corrija o bug dentro deste efeito.
 */

import { useEffect, useState } from "react";
import "./style2.css";

async function fetchBio(person: string) {
  const delay = person === "Bob" ? 2000 : 200;
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve("This is " + person + "’s bio.");
    }, delay);
  });
}

export default function Page2() {
  const [person, setPerson] = useState("Alice");
  const [bio, setBio] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    setBio(null);
    fetchBio(person).then((result) => {
      if (!ignore) setBio(result);
    });

    return () => {
      ignore = true;
    };
  }, [person]);

  return (
    <>
      <select
        value={person}
        onChange={(e) => {
          setPerson(e.target.value);
        }}
      >
        <option value="Alice">Alice</option>
        <option value="Bob">Bob</option>
        <option value="Taylor">Taylor</option>
      </select>
      <hr />
      <p>
        <i>{bio ?? "Loading..."}</i>
      </p>
    </>
  );
}
