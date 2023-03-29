/**
 * * EVITE A DUPLICAÇÃO DE ESTADO
 * 
 *  Este componente de lista de menu permite que você escolha um único lanche de viagem entre vários:
*/

import React, { useState } from "react";

const initialItems = [
  { title: "pretzels", id: 0 },
  { title: "crispy seaweed", id: 1 },
  { title: "granola bar", id: 2 },
];

export default function Menu() {
  const [items, setItems] = useState(initialItems);
  const [selectedId, setSelectedId] = useState(0);

  const selectedItem = items.find((item) => {
    return item.id === selectedId;
  });


  function handleItemChange(id: number, e: React.ChangeEvent<HTMLInputElement>) {
    setItems(
        items.map((item) => {
            if(item.id === id) {
                return {
                    ...item,
                    title: e.target.value,
                };
            }
            return item;
        })
    );
  }

  return (
    <>
      <h2>Whats your travel snack?</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.title}{" "}
            <input 
                type="text"
                name="item"
                value={item.title}
                onChange={(e) => {
                    handleItemChange(item.id, e);
                }}
            />
            <button
              onClick={() => {
                setSelectedId(item.id);
              }}
            >
              Choose
            </button>
          </li>
        ))}
      </ul>
      <p>You picked {selectedItem?.title}.</p>
    </>
  );
}

/**
 * Atualmente, ele armazena o item selecionado como um objeto na selectedItemvariável de estado. No entanto, isso não é ótimo: o conteúdo do selectedItemé o mesmo objeto de um dos itens dentro da itemslista. Isso significa que as informações sobre o próprio item são duplicadas em dois lugares.
 * 
 * Por que isso é um problema? Vamos tornar cada item editável:
 * 
 * Observe como se você clicar primeiro em “Escolher” em um item e depois editá-lo, a entrada é atualizada, mas o rótulo na parte inferior não reflete as edições. Isso ocorre porque você duplicou o estado e esqueceu de atualizar selectedItem.
 * 
 * Embora você também possa atualizar selectedItem, uma correção mais fácil é remover a duplicação. Neste exemplo, em vez de um selectedItemobjeto (que cria uma duplicação com objetos dentro de items), você mantém o selectedIdestado in e, em seguida , obtém o selectedItempesquisando na itemsmatriz um item com esse ID:
 * 
 * (Como alternativa, você pode manter o índice selecionado no estado.)
 * 
 * O estado costumava ser duplicado assim:
 * 
    * items = [{ id: 0, title: 'pretzels'}, ...]
    * 
    * selectedItem = {id: 0, title: 'pretzels'} 
    * 
 * Mas depois da alteração fica assim: 
 * 
    * items = [{ id: 0, title: 'pretzels'}, ...]
    * 
    * selectedId = 0 
    *
 * A duplicação acabou e você mantém apenas o estado essencial!
 * 
 *  Agora, se você editar o item selecionado , a mensagem abaixo será atualizada imediatamente. Isso ocorre porque setItemsaciona uma nova renderização e items.find(...)localizaria o item com o título atualizado. Você não precisava manter o item selecionado no estado, porque apenas o ID selecionado é essencial. O restante pode ser calculado durante a renderização.
*/