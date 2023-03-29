/**
 * * FILTRANDO UMA LISTA
 *
 * Neste exemplo, o SearchBar possui seu próprio queryestado que controla a entrada de texto. Seu FilterableListcomponente pai exibe uma Listlista de itens, mas não leva em consideração a consulta de pesquisa.
 *
 * Use a filterItems(foods, query)função para filtrar a lista de acordo com a consulta de pesquisa. Para testar suas alterações, verifique se digitar “s” na entrada filtra a lista para “Sushi”, “Shish kebab” e “Dim sum”.
 *
 * Observe que filterItems já está implementado e importado para que você não precise escrevê-lo sozinho!
 */

import { useState } from "react";
import { foods, filterItems } from "./data.js";

export interface DataFood {
  id: number;
  name: string;
  description: string;
}

export default function FilterableList() {
  const [query, setQuery] = useState("");

  function handleOnChangeSearchBar(query: string) {
    setQuery(query);
  }

  return (
    <>
      <SearchBar query={query} onChange={handleOnChangeSearchBar}/>
      <hr />
      <List items={filterItems(foods, query)} />
    </>
  );
}

type PropsSearchBar = {
    query: string;
    onChange: (query: string) => void;
};

function SearchBar({query, onChange} : PropsSearchBar) {
  return (
    <label>
      Search: <input value={query} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

type PropsList = {
  items: DataFood[];
};

function List({ items }: PropsList) {
  return (
    <table>
      <tbody>
        {items.map((food) => (
          <tr key={food.id}>
            <td>{food.name}</td>
            <td>{food.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
