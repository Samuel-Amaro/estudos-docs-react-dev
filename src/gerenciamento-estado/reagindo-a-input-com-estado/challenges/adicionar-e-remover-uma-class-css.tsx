/**
 * * ADICIONAR E REMOVER UMA CLASS CSS
 *
 *  Faça com que clicar na imagem remova a background--active classe CSS do exterior <div>, mas adicione a picture--active classe ao arquivo <img>. Clicar no plano de fundo novamente deve restaurar as classes CSS originais.
 *
 * Visualmente, você deve esperar que clicar na imagem remova o fundo roxo e destaque a borda da imagem. Clicar fora da imagem destaca o plano de fundo, mas remove o destaque da borda da imagem.
 */

import { useState } from "react";
import "./test1.css";

export default function Picture() {
  const [isClickedImg, setIsClickedImg] = useState(false);
  return (
    <div
      className={isClickedImg ? "background" : "background background--active"}
      onPointerDown={() => {
        setIsClickedImg(false);
      }}
    >
      <img
        className={isClickedImg ? "picture picture--active" : "picture"}
        alt="Rainbow houses in Kampung Pelangi, Indonesia"
        src="https://images.pexels.com/photos/960919/pexels-photo-960919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        onPointerDown={(e) => {
          e.stopPropagation();
          setIsClickedImg(true);
        }}
      />
    </div>
  );
}
