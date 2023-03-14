/**
 * * INSERINDO EM UM ARRAY
 * 
 *  Às vezes, você pode querer inserir um item em uma posição específica que não seja nem no início nem no final. Para fazer isso, você pode usar a ...sintaxe de distribuição de matriz junto com o slice()método. O slice()método permite cortar uma “fatia” do array. Para inserir um item, você criará uma matriz que espalha a fatia antes do ponto de inserção, depois o novo item e o restante da matriz original.
 * 
 * Neste exemplo, o botão Inserir sempre insere no índice 1:
*/

import { useState } from "react";

let nextId = 3;

const initialArtists = [
  { id: 0, name: "Marta Colvin Andrade" },
  { id: 1, name: "Lamidi Olonade Fakeye" },
  { id: 2, name: "Louise Nevelson" },
];

export default function List4() {
  const [name, setName] = useState("");
  const [artists, setArtists] = useState(initialArtists);

  function handleClick() {
    const insertAt = 1; // Pode ser qualquer índice
    const nextArtists = [
      //Itens antes do ponto de inserção:
      //inseri na posição 0
      ...artists.slice(0, insertAt),
      // New item:
      //novo item inserido na posição 1
      { id: nextId++, name: name },
      //o restante do array e distribuido com os itens a seguir
      // Itens após o ponto de inserção:
      //realiza uma copia de artists a partir do indice insertAt
      ...artists.slice(insertAt),
    ];
    //atualiza state com o novo array
    setArtists(nextArtists);
    setName("");
  }

  return (
    <>
      <h1>Inspiring sculptors:</h1>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={handleClick}>Insert</button>
      <ul>
        {artists.map((artist) => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </>
  );
}