/**
 * * ROLAR UM CARROSEL DE IMAGENS
 *
 * Este carrossel de imagens possui um botão “Avançar” que alterna a imagem ativa. Faça a galeria rolar horizontalmente para a imagem ativa ao clicar. Você vai querer chamar scrollIntoView() o nó DOM da imagem ativa.
 */

import { useRef, useState } from "react";
import "./style.css";
import { flushSync } from "react-dom";

export default function CatFriendsChalenge() {
  const [index, setIndex] = useState(0);
  const refImgs = useRef<HTMLLIElement[] | null>(null);

  function getRefs() {
    if (!refImgs.current) {
      refImgs.current = [];
    }
    return refImgs.current;
  }

  function scrollToId(index: number) {
    const arr = getRefs();
    console.log(index);
    arr[index].scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  return (
    <>
      <nav>
        <button
          onClick={() => {
            flushSync(() => {
              if (index < catList.length - 1) {
                setIndex(index + 1);
              } else {
                setIndex(0);
              }
            });
            scrollToId(index);
          }}
        >
          Next
        </button>
      </nav>
      <div>
        <ul>
          {catList.map((cat, i) => (
            <li
              key={i}
              ref={(node) => {
                const refs = getRefs();
                if (node) {
                  refs[i] = node;
                } else {
                  refs.splice(i, 1);
                }
              }}
            >
              <img
                className={index === i ? "active" : ""}
                src={cat.imageUrl}
                alt={"Cat #" + i}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

type DataCat = {
  imageUrl: string;
};

const catList: DataCat[] = [];

for (let i = 0; i < 10; i++) {
  catList.push({
    imageUrl: "https://placekitten.com/250/200?image=" + i,
  });
}
