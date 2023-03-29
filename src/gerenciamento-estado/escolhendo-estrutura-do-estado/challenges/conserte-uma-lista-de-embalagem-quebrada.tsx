/**
 * * CONSERTE UMA LISTA DE EMBALAGEM QUEBRADA
 * 
 *  Esta lista de embalagem tem um rodapé que mostra quantos itens estão embalados e quantos itens existem no total. Parece funcionar no começo, mas é buggy. Por exemplo, se você marcar um item como embalado e excluí-lo, o contador não será atualizado corretamente. Fixe o contador para que esteja sempre correto.
*/

import { useState } from "react";
import AddItem from "./AddItem.js";
import PackingList from "./PackingList.js";

let nextId = 3;

export type DataItem = {
    id: number;
    title: string;
    packed: boolean;
};

const initialItems = [
  { id: 0, title: "Warm socks", packed: true },
  { id: 1, title: "Travel journal", packed: false },
  { id: 2, title: "Watercolors", packed: false },
];

export default function TravelPlan() {
  const [items, setItems] = useState(initialItems);
  //const [total, setTotal] = useState(3);
  //const [packed, setPacked] = useState(1);

  function handleAddItem(title: string) {
   // setTotal(total + 1);
    setItems([
      ...items,
      {
        id: nextId++,
        title: title,
        packed: false,
      },
    ]);
  }

  function handleChangeItem(nextItem: DataItem) {
    /*if (nextItem.packed) {
      setPacked(packed + 1);
    } else {
      setPacked(packed - 1);
    }*/
    setItems(
      items.map((item) => {
        if (item.id === nextItem.id) {
          return nextItem;
        } else {
          return item;
        }
      })
    );
  }

  function handleDeleteItem(itemId: number) {
    //setTotal(total - 1);
    setItems(items.filter((item) => item.id !== itemId));
    //setPacked(packed - 1);
  }

  const packed = items.reduce((accumulator, currentValue) => {
    if(currentValue.packed) {
        return accumulator+ 1;
    }
    return accumulator;
  }, 0);

  return (
    <>
      <AddItem onAddItem={handleAddItem} />
      <PackingList
        items={items}
        onChangeItem={handleChangeItem}
        onDeleteItem={handleDeleteItem}
      />
      <hr />
      <b>
        {packed} out of {items.length} packed!
      </b>
    </>
  );
}