/**
 * A razão pela qual este código não está correto é que ele tenta fazer algo com o nó DOM durante a renderização. No React, a renderização deve ser um cálculo puro de JSX e não deve conter efeitos colaterais como modificar o DOM.
 *  
 * Além disso, quando VideoPlayer é chamado pela primeira vez, seu DOM ainda não existe! Ainda não há um nó DOM para chamar play() ou pause() ativar, porque o React não sabe qual DOM criar até que você retorne o JSX.
 * 
 * A solução aqui é envolver o efeito colateral com useEffect para removê-lo do cálculo de renderização:
 * 
 * Ao envolver a atualização do DOM em um efeito, você permite que o React atualize a tela primeiro. Então seu Efeito é executado.
 * 
 * Quando seu VideoPlayer componente for renderizado (na primeira vez ou se for renderizado novamente), algumas coisas acontecerão. Primeiro, o React atualizará a tela, garantindo que a <video> tag esteja no DOM com as props corretas. Então o React executará seu Efeito. Por fim, seu Effect chamará play() ou pause() dependendo do valor de isPlaying.
 * 
 * Pressione Reproduzir/Pausar várias vezes e veja como o reprodutor de vídeo permanece sincronizado com o isPlaying valor:
*/

//ETAPA1: DECLARAR UM EFFECT

//importamos o useEffect hook do react
import { useState, useRef, useEffect } from "react";

type PropsVideoPlayer = {
    isPlaying: boolean;
    src: string;
};

//quando o componente videoPlayer for renderizado na primeria vez ou se for renderizado novamente
//algumas coisas acontecerão
//primeiro o react atualizara a tela, garantindo que a <video> tag esteja no dom com as props corretas
//Então o React executará seu Efeito. Por fim, seu Effect chamará play() ou pause() dependendo do valor de isPlaying.
function VideoPlayer({ src, isPlaying } : PropsVideoPlayer) {
  //declaramos uma ref para obter uma referencia para o <video> no dom
  const ref = useRef<HTMLVideoElement | null>(null);

  function getRef() {
    //lendo valor de uma ref
    if(!ref.current) {
        throw new Error("Error in ref video");
    }
    return ref.current;
  }

  //chamamos o hook no nivel superior do componente e colocamos algum codigo dentro do seu efeito
  //Toda vez que seu componente for renderizado, o React atualizará a tela e executará o código dentro do useEffect.
  //aqui e um exemplo de um effect para sincronizar com um sistema externo
  useEffect(
    //efeito - effect
    () => {
      //O código aqui será executado após *cada* renderização
      //aqui dentro especificamos o nosso side effect(efeito colateral)
      //o nosso efeito colateral aqui e modificar o dom, durante a renderização
      //o sitema externo neste exemplo que a gente sincronizou com o state react foi a API  media do browser
      if (isPlaying) {
        getRef().play(); 
      } else {
        getRef().pause(); 
      }
    }
  );

  // eslint-disable-next-line jsx-a11y/media-has-caption
  return <video ref={ref} src={src} loop playsInline />;
}

export default function AppVideoPlayer2() {
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

/**
 * Neste exemplo, o “sistema externo” que você sincronizou com o estado React foi a API de mídia do navegador. Você pode usar uma abordagem semelhante para agrupar código legado não React (como plug-ins jQuery) em componentes React declarativos.
 * 
 * Observe que controlar um reprodutor de vídeo é muito mais complexo na prática. A chamada play()pode falhar, o usuário pode reproduzir ou pausar usando os controles integrados do navegador e assim por diante. Este exemplo é muito simplificado e incompleto.
 * 
 * !ARMADILHA
 * 
 * !Por padrão, os efeitos são executados após cada renderização. É por isso que um código como este produzirá um loop infinito:
*/

//const [count, setCount] = useState(0);
//useEffect(() => {
//  setCount(count + 1);
//});

/**
 * !Os efeitos são executados como resultado da renderização. A configuração do estado aciona a renderização. Definir o estado imediatamente em um efeito é como conectar uma tomada elétrica a si mesma. O Effect é executado, define o estado, o que causa uma nova renderização, que faz com que o Effect seja executado, define o estado novamente, isso causa outra nova renderização e assim por diante. 
 * 
 * !Os efeitos geralmente devem sincronizar seus componentes com um sistema externo . Se não houver um sistema externo e você quiser apenas ajustar algum estado com base em outro estado, talvez não precise de um efeito.
*/