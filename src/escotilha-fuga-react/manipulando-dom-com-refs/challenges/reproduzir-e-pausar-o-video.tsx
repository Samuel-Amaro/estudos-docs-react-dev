/**
 * * REPRODUZIR E PAUSAR O VÍDEO
 *
 *  Neste exemplo, o botão alterna uma variável de estado para alternar entre um estado de reprodução e pausa. No entanto, para realmente reproduzir ou pausar o vídeo, alternar o estado não é suficiente. Você também precisa chamar play() e pause() no elemento DOM para o arquivo <video>. Adicione uma referência a ele e faça o botão funcionar.
 *
 * Para um desafio extra, mantenha o botão "Reproduzir" sincronizado com a reprodução do vídeo, mesmo que o usuário clique com o botão direito do mouse no vídeo e o reproduza usando os controles de mídia integrados do navegador. Você pode querer ouvir onPlay e onPause no vídeo para fazer isso.
 */

import { useState, useRef } from "react";

export default function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const refVideo = useRef<HTMLVideoElement>(null);

  function getRef() {
    if (!refVideo.current) throw new Error("Error in ref video");
    return refVideo.current;
  }

  function handleClick() {
    setIsPlaying(!isPlaying);

    if (isPlaying) {
      getRef().pause();
    } else {
      getRef().play();
    }
  }

  return (
    <>
      <button onClick={handleClick}>{isPlaying ? "Pause" : "Play"}</button>
      {/*eslint-disable-next-line jsx-a11y/media-has-caption*/}
      <video
        width="250"
        ref={refVideo}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
          type="video/mp4"
        />
      </video>
    </>
  );
}
