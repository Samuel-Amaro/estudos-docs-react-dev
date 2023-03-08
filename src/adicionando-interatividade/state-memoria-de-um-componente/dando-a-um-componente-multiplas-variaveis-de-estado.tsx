import { useState } from "react";
import { sculptureList } from "./data";

/**
 * * DANDO A UM COMPONENTE MÚLTIPLAS VARIÁVEIS DE ESTADO
 *
 * Você pode ter quantas variáveis ​​de estado de quantos tipos quiser em um componente. Este componente possui duas variáveis ​​de estado, um número index e um booleano showMore que é alternado quando você clica em “Mostrar detalhes”:
 */

export default function GalleryWithMultiplyState() {
  //let index = 0;
  //index é uma variavel de estado
  //setIndex e a função setter
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleClick() {
    setIndex(index + 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  const sculpture = sculptureList[index];

  return (
    <>
      <button type="button" onClick={handleClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i>
        by {sculpture.artist}
      </h2>
      <h3>
        ({index + 1} of {sculptureList.length})
      </h3>
      <button type="button" onClick={handleMoreClick}>
        {showMore ? "Hide" : "Show"} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img src={sculpture.url} alt={sculpture.alt} />
    </>
  );
}

/**
 * É uma boa ideia ter várias variáveis ​​de estado se o estado delas não estiver relacionado, como index e showMore neste exemplo. Mas se você achar que costuma alterar duas variáveis ​​de estado juntas, pode ser melhor combiná-las em uma única. Por exemplo, se você tiver um formulário com muitos campos, é mais conveniente ter uma única variável de estado que contenha um objeto do que uma variável de estado por campo. Escolhendo a Estrutura do Estado tem mais dicas sobre isso.
 */
