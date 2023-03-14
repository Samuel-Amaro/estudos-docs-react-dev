/**
 * * ATUALIZANDO OBJETOS DENTRO DE ARRAYS
 *
 *  Os objetos não estão realmente localizados “dentro” de arrays. Eles podem parecer estar “dentro” no código, mas cada objeto em uma matriz é um valor separado, para o qual a matriz “aponta”. É por isso que você precisa ter cuidado ao alterar campos aninhados como list[0]. A lista de arte de outra pessoa pode apontar para o mesmo elemento da matriz!
 *
 * Ao atualizar o estado aninhado, você precisa criar cópias do ponto em que deseja atualizar e até o nível superior. Vamos ver como isso funciona.
 *
 * Neste exemplo, duas listas de ilustrações separadas têm o mesmo estado inicial. Eles deveriam estar isolados, mas por causa de uma mutação, seu estado é acidentalmente compartilhado e marcar uma caixa em uma lista afeta a outra lista:
 */

import { useState } from "react";

const nextId = 3;

type List = {
  id: number;
  title: string;
  seen: boolean;
};

const initialList = [
  { id: 0, title: "Big Bellies", seen: false },
  { id: 1, title: "Lunar Landscape", seen: false },
  { id: 2, title: "Terracotta Army", seen: true },
];

export default function BucketList() {
  const [myList, setMyList] = useState(initialList);
  const [yourList, setYourList] = useState(initialList);

  function handleToggleMyList(artworkId: number, nextSeen: boolean) {
    setMyList(
        myList.map(artwork => {
            if(artwork.id === artworkId) {
                //cria um novo objeto com alterações
                return {
                    ...artwork, seen: nextSeen
                };
            }else{
                //sem alterações
                return artwork;
            }
        })
    );
  }

  function handleToggleYourList(artworkId: number, nextSeen: boolean) {
    setYourList(
      yourList.map((artwork) => {
        if (artwork.id === artworkId) {
          //cria um novo objeto com alterações
          return {
            ...artwork,
            seen: nextSeen,
          };
        } else {
          //sem alterações
          return artwork;
        }
      })
    );
  }

  return (
    <>
      <h1>Art Bucket List</h1>
      <h2>My list of art to see:</h2>
      <ItemList artworks={myList} onToggle={handleToggleMyList} />
      <h2>Your list of art to see:</h2>
      <ItemList artworks={yourList} onToggle={handleToggleYourList} />
    </>
  );
}

type PropsItemList = {
  artworks: List[];
  onToggle: (artworkId: number, nextSeen: boolean) => void;
};

function ItemList({ artworks, onToggle }: PropsItemList) {
  return (
    <ul>
      {artworks.map((artwork) => (
        <li key={artwork.id}>
          <label>
            <input
              type="checkbox"
              checked={artwork.seen}
              onChange={(e) => {
                onToggle(artwork.id, e.target.checked);
              }}
            />
            {artwork.title}
          </label>
        </li>
      ))}
    </ul>
  );
}

/**
 * O problema está no código assim:
*/

//const myNextList = [...myList];
//const artwork = myNextList.find((a) => a.id === artworkId);
//artwork.seen = nextSeen; // Problem: mutates an existing item
//setMyList(myNextList);

/**
 * Embora a myNextListmatriz em si seja nova, os itens em si são os mesmos da myListmatriz original. Portanto, alterar artwork.seenaltera o item de arte original . Esse item de arte também está em yourArtworks, o que causa o bug. Bugs como esse podem ser difíceis de pensar, mas felizmente eles desaparecem se você evitar o estado de mutação.
 * 
 * Você pode usar map para substituir um item antigo por sua versão atualizada sem mutação.
*/

/*setMyList(myList.map(artwork => {
  if (artwork.id === artworkId) {
    // Create a *new* object with changes
    return { ...artwork, seen: nextSeen };
  } else {
    // No changes
    return artwork;
  }
});*/

/**
 * Em geral, você só deve modificar objetos que acabou de criar. Se você estivesse inserindo uma nova arte, poderia alterá-la, mas se estiver lidando com algo que já está no estado, precisará fazer uma cópia.
*/