import { useState } from "react";
import { sculptureList } from "./data";

/**
 * * ADICIONANDO UMA VARIÁVEL DE ESTADO
 * 
 * Para adicionar uma variável de estado, importe useState do React na parte superior do arquivo:
*/

export default function GalleryWithState() {
  //let index = 0;
  //index é uma variavel de estado
  //setIndex e a função setter
  //A sintaxe [e ] aqui é chamada de desestruturação de array e permite que você leia valores de um array. A matriz retornada por useState sempre tem exatamente dois itens.
  const [index, setIndex] = useState(0);

  function handleClick() {
    setIndex(index + 1);
  }

  let sculpture = sculptureList[index];

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
      <img src={sculpture.url} alt={sculpture.alt} />
      <p>{sculpture.description}</p>
    </>
  );
}