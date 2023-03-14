/**
 * * FAZENDO OUTRAS ALTERAÇÕES EM UM ARRAY
 * 
 *  Existem algumas coisas que você não pode fazer com a sintaxe de propagação e métodos não mutantes como map() e filter() sozinhos. Por exemplo, você pode querer inverter ou classificar uma array. O JavaScript reverse() e sort() os métodos estão alterando o array original, então você não pode usá-los diretamente.
 * 
 * No entanto, você pode copiar a array primeiro e, em seguida, fazer alterações nela.
*/

import { useState } from "react";

let nextId = 3;

const initialList = [
  { id: 0, title: "Big Bellies" },
  { id: 1, title: "Lunar Landscape" },
  { id: 2, title: "Terracotta Army" },
];

export default function List5() {
  const [list, setList] = useState(initialList);

  function handleClick() {
    //cria um copia do array original
    const nextList = [...list];
    //na copia do array podemos usar o metodo de mutação como reverse ou sort ou ate fazer atribuições individuais
    nextList.reverse();
    setList(nextList);
  }

  return (
    <>
      <button onClick={handleClick}>Reverse</button>
      <ul>
        {list.map((artwork) => (
          <li key={artwork.id}>{artwork.title}</li>
        ))}
      </ul>
    </>
  );
}

/**
 * Aqui, você usa a [...list] sintaxe de propagação para criar primeiro uma cópia do array original. Agora que você tem uma cópia, pode usar métodos de mutação como nextList.reverse() ou nextList.sort(), ou até mesmo atribuir itens individuais com nextList[0] = "something".
 * 
 * No entanto, mesmo se você copiar uma matriz, não poderá modificar os itens existentes dentro dela diretamente. Isso ocorre porque a cópia é superficial - o novo array conterá os mesmos itens do original. Portanto, se você modificar um objeto dentro do array copiado, estará alterando o estado existente. Por exemplo, um código como este é um problema.
*/

//const nextList = [...list];
//nextList[0].seen = true; // Problem: mutates list[0]
//setList(nextList);

/**
 * Embora nextList e list sejam duas matrizes diferentes nextList[0] e list[0] apontem para o mesmo objeto. Então, ao mudar nextList[0].seen, você também está mudando list[0].seen. Esta é uma mutação de estado, que você deve evitar! Você pode resolver esse problema de maneira semelhante à atualização de objetos JavaScript aninhados — copiando itens individuais que deseja alterar em vez de modificá-los. Veja como.
*/