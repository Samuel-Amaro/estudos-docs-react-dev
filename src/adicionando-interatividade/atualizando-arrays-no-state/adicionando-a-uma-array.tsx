/**
 * * ADICIONANDO A UMA ARRAY
 *
 * push() irá transformar um array, o que você não quer:
 */

import { useState } from "react";

let nextId = 0;

type Artirst = {
    id: number;
    name: string;
};

export default function List() {
  const [name, setName] = useState("");
  const [artists, setArtists] = useState<Artirst[]>([]);

  return (
    <>
      <h1>Inspiring sculptors:</h1>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button
        onClick={() => {
          setName("");
          //push() irá transformar um array, o que você não quer:
          //esta mutando o array no state, isso não e permitido, temos que tratar o array como imutavel ao armazená-lo no estado
          //para atualizar um array no state temos que criar um novo ou fazer uma copia do existente, e depois definir o estado para usar o novo array
          artists.push({
            id: nextId++,
            name: name,
          });
        }}
      >
        Add
      </button>
      <ul>
        {artists.map((artist) => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </>
  );
}

