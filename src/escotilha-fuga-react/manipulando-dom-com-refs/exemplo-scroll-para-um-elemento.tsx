/**
 * * EXEMPLO: SCROLL PARA UM ELEMENTO
 *
 * Você pode ter mais de uma única referência em um componente. Neste exemplo, há um carrossel de três imagens. Cada botão centraliza uma imagem chamando o scrollIntoView() método do navegador no nó DOM correspondente:
 */

//acessando varios nos dom gerenciado pelo react, para aplicar scroll

import React, { useRef } from "react";
//importando o hook useRef
import "./style.css";

export default function CatFriends() {
  //aqui temos mais de uma unica ref em um componente
  //usando o hook useRef para declarar varias refs dentro do componente
  //o useRef hook retorna um objeto com uma unica propriedade chamada current
  const firstCatRef = useRef<HTMLImageElement | null>(null);
  const secondCatRef = useRef<HTMLImageElement | null>(null);
  const thirdCatRef = useRef<HTMLImageElement | null>(null);

  function getRef(ref: React.MutableRefObject<HTMLImageElement | null>) {
    //lendo o no DOM de <img> por meio da ref paramentro
    //inicialmente ref.current sera null
    if (!ref.current) {
      throw new Error("Error in ref image");
    }
    //retorna a referencia ao no dom img correspondente informado por paramentro
    return ref.current;
  }

  function handleScrollToFirstCat() {
    //apos ler o no DOM, chamamos scrollIntoView() método do navegador no nó DOM correspondente.
    getRef(firstCatRef).scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  function handleScrollToSecondCat() {
    getRef(secondCatRef).scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  function handleScrollToThirdCat() {
    getRef(thirdCatRef).scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  return (
    <>
      <nav>
        <button onClick={handleScrollToFirstCat}>Tom</button>
        <button onClick={handleScrollToSecondCat}>Maru</button>
        <button onClick={handleScrollToThirdCat}>Jellylorum</button>
      </nav>
      <div>
        <ul>
          <li>
            {/*
                //passamos a ref declarada para o no DOM por meio do atributo ref 
                //quando o react cria um no dom para o <img />, o react colocara uma referencia a esse no em uma ref correspondente declara no inicio do componente
                //isso diz ao react para colocar o img no dom em um ref.current declarado correspondete
            */}
            <img
              src="https://placekitten.com/g/200/200"
              alt="Tom"
              ref={firstCatRef}
            />
          </li>
          <li>
            <img
              src="https://placekitten.com/g/300/200"
              alt="Maru"
              ref={secondCatRef}
            />
          </li>
          <li>
            <img
              src="https://placekitten.com/g/250/200"
              alt="Jellylorum"
              ref={thirdCatRef}
            />
          </li>
        </ul>
      </div>
    </>
  );
}
