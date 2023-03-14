/**
 * Em vez disso, crie uma nova matriz que contenha os itens existentes e um novo item no final. Existem várias maneiras de fazer isso, mas a mais fácil é usar a sintaxe ... de distribuição de array :
 */

import { useState } from "react";

let nextId = 0;

type Artirst = {
    id: number;
    name: string;
};

export default function List2() {
  const [name, setName] = useState("");
  const [artists, setArtists] = useState<Artirst[]>([]);

  return (
    <>
      <h1>Inspiring sculptors:</h1>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button
        onClick={() => {
          setName("");
          //temos que tratar o array como imutavel ao armazená-lo no estado
          //para atualizar um array no state temos que criar um novo ou fazer uma copia do existente, e depois definir o estado para usar o novo array
          //adiciona um novo item sempre no final do array
          setArtists(
            //substitui o state
            [
              //com um novo array
              ...artists, //que contém todos os itens antigos
              { id: nextId++, name: name }, //e um novo item no final
            ]
          );
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


/**
 * A sintaxe de distribuição de array também permite que você anexe um item colocando-o antes do original ...artists:
*/

/*

add um novo item no inicio do array

setArtists([
  {id: nextId++, name: name},
  ...artists //Coloque itens antigos no final
])
*/

/**
 * Desta forma, a propagação pode fazer o trabalho de push() adicionar ao final de uma matriz e unshift() adicionar ao início de uma array.
*/