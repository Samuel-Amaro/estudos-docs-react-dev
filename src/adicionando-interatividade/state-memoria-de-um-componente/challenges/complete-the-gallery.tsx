/**
 * Complete a galeria
 * 
 * Quando você pressiona “Next” na última escultura, o código falha. Corrija a lógica para evitar a falha. Você pode fazer isso adicionando lógica extra ao manipulador de eventos ou desabilitando o botão quando a ação não for possível.
 * 
 * Depois de corrigir a falha, adicione um botão “Anterior” que mostra a escultura anterior. Não deve falhar na primeira escultura.
 */

import { useState } from "react";
import { sculptureList } from "../data";

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick() {
    if (index < sculptureList.length - 1) {
      setIndex(index + 1);
    }
  }

  function handlePreviousClick() {
    if (index > 0) {
      setIndex(index - 1);
    }
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  const sculpture = sculptureList[index];

  return (
    <>
      <button onClick={handleNextClick}>Next</button>
      <button type="button" onClick={handlePreviousClick}>
        Previous
      </button>
      <h2>
        <i>{sculpture.name} </i>
        by {sculpture.artist}
      </h2>
      <h3>
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? "Hide" : "Show"} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img src={sculpture.url} alt={sculpture.alt} />
    </>
  );
}
