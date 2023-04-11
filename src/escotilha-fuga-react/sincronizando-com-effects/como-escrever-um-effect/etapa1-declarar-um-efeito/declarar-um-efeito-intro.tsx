/**
 * * ETAPA 1: DECLARAR UM EFEITO
 * 
 *  Para declarar um Effect em seu componente, importe o useEffect Hook do React:
*/

//import { useEffect } from 'react';

/**
 * Em seguida, chame-o no nível superior do seu componente e coloque algum código dentro do seu Efeito:
*/

//function MyComponent() {
//    useEffect(
        //aqui e o effect a callback que especifica um side effect  
//      () => {
          //O código aqui será executado após *cada* 
          //renderização
//      }
//     );
//    return <div />;
//}

/**
 * Toda vez que seu componente for renderizado, o React atualizará a tela e executará o código dentro do useEffect. Em outras palavras, useEffect “atrasa” a execução de um trecho de código até que a renderização seja refletida na tela.
 * 
 * Vamos ver como você pode usar um efeito para sincronizar com um sistema externo. Considere um <VideoPlayer> componente React. Seria bom controlar se está tocando ou pausando passando um isPlaying prop para ele:
*/

//<VideoPlayer isPlaying={isPlaying} />;

/**
 * Seu componente personalizado  VideoPlayer renderiza a tag <video>  de navegador integrada:
*/

/*
function VideoPlayer({ src, isPlaying }) {
  // TODO: do something with isPlaying
  return <video src={src} />;
}
*/

/**
 * No entanto, a <video> tag do navegador não possui um isPlaying prop. A única maneira de controlá-lo é chamar manualmente os métodos play() e pause() no elemento DOM. Você precisa sincronizar o valor de isPlaying prop, que informa se o vídeo deve estar sendo reproduzido no momento, com chamadas como play() e pause().
 * 
 * Precisamos primeiro obter uma referência para o <video> nó DOM.
 * 
 * Você pode ficar tentado a tentar chamar play() ou pause() durante a renderização, mas isso não é correto:
*/

import { useState, useRef, useEffect } from "react";

type PropsVideoPlayer = {
    isPlaying: boolean;
    src: string;
};

function VideoPlayer({ src, isPlaying } : PropsVideoPlayer) {
  //declaramos uma ref para obter uma referencia para o <video> no dom
  const ref = useRef<HTMLVideoElement | null>(null);

  function getRef() {
    //lendo valor de uma ref
    if (!ref.current) {
      throw new Error("Error in ref video");
    }
    return ref.current;
  }

  //chama os metodos de reprodução e pausa durante a renderização do componente
  //este codigo abaixo esta errado, ele tenta fazer algo com o no DOM durante a renderização
  //no react a renderização deve ser um calculo puro de JSX e não deve conter efeitos colaterais como modificar o dom
  if (isPlaying) {
    getRef().play(); // Chamá-los durante a renderização não é permitido.
  } else {
    getRef().pause(); //Além disso, isso trava.
  }

  // eslint-disable-next-line jsx-a11y/media-has-caption
  return <video ref={ref} src={src} loop playsInline />;
}

export default function AppVideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? "Pause" : "Play"}
      </button>
      <VideoPlayer
        isPlaying={isPlaying}
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      />
    </>
  );
}
