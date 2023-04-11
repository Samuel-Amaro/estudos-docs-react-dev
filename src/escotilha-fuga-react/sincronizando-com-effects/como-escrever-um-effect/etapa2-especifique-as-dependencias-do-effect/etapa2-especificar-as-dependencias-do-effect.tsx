/**
 * * ETAPA 2: ESPECIFIQUE AS DEPENDÊNCIAS DO EFFECT
 *
 * Por padrão, os efeitos são executados após cada renderização. Muitas vezes, isso não é o que você deseja:
 *
 * Às vezes, é lento. A sincronização com um sistema externo nem sempre é instantânea, portanto, você pode pular a execução, a menos que seja necessário. Por exemplo, você não deseja se reconectar ao servidor de bate-papo a cada pressionamento de tecla.
 *
 * Às vezes, é errado. Por exemplo, você não deseja acionar uma animação de fade-in de componente a cada pressionamento de tecla. A animação só deve ser reproduzida uma vez quando o componente aparecer pela primeira vez.
 *
 * Para demonstrar o problema, aqui está o exemplo anterior com algumas console.log chamadas e uma entrada de texto que atualiza o estado do componente pai. Observe como a digitação faz com que o Efeito seja executado novamente:
 */

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
function VideoPlayer({ src, isPlaying }: PropsVideoPlayer) {
  //declaramos uma ref para obter uma referencia para o <video> no dom
  const ref = useRef<HTMLVideoElement | null>(null);

  function getRef() {
    //lendo valor de uma ref
    if (!ref.current) {
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
        console.log("chamando video.play()");
        getRef().play();
      } else {
        console.log("chamando video.pause()");
        getRef().pause();
      }
    },
    //podemos dizer ao react para ignorar a reexecução desncessaria do effect especificando uma array de dependencias como o segundo argumento para a useEffect chaamda
    //Comece adicionando um [] array vazio
    //o codigo aqui dentro do effect depende do prop isPlaying para decidir oque fazer, mas essa dependencia não foi explicitamente declarada,
    //adicionamos a isPlaying prop a array de dependencia
    //especificar isPlaying como a array de dependencia diz ao react que ele deve pular a reexecução do seu Effect se isPlaying for o mesmo que durante a renderização anterior
    [isPlaying]
  );

  // eslint-disable-next-line jsx-a11y/media-has-caption
  return <video ref={ref} src={src} loop playsInline />;
}

export default function AppVideoPlayer3() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [text, setText] = useState("");

  //a cada nova definição ou atualização de estado, aciona uma nova renderização que executa um effect, apos a renderização
  return (
    <>
      <input value={text} onChange={(e) => setText(e.target.value)} />
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
 * Você pode dizer ao React para ignorar a reexecução desnecessária do Effect especificando uma array de dependências como o segundo argumento para a useEffect chamada. Comece adicionando um []array vazio ao exemplo acima na linha 14:
 *
 * O problema é que o código dentro do seu Effect depende do prop isPlaying para decidir o que fazer, mas essa dependência não foi explicitamente declarada. Para corrigir esse problema, adicione isPlaying à matriz de dependência:
 * 
 * Agora todas as dependências estão declaradas, então não há erro. Especificar [isPlaying]como a matriz de dependência diz ao React que ele deve pular a reexecução do seu Effect se isPlayingfor o mesmo que durante a renderização anterior. Com essa alteração, digitar na entrada não faz com que o efeito seja executado novamente, mas pressionar Reproduzir/Pausar faz:
 * 
 * A matriz de dependência pode conter várias dependências. O React só pulará a reexecução do Effect se todas as dependências que você especificar tiverem exatamente os mesmos valores que tinham durante a renderização anterior. O React compara os valores de dependência usando a Object.is comparação. Veja a useEffect referência para detalhes.
 * 
 * Observe que você não pode “escolher” suas dependências. Você receberá um erro lint se as dependências especificadas não corresponderem ao que o React espera com base no código dentro do seu Effect. Isso ajuda a detectar muitos bugs em seu código. Se você não quiser que algum código seja executado novamente, edite o próprio código do Effect para não “precisar” dessa dependência.
 * 
 * ! ARMADILHA
 * 
 * ! Os comportamentos sem o array de dependências e com um array de dependências vazio [] são diferentes:
 */

//!useEffect(() => {
  //!Isso é executado após cada renderização
//!});

//!useEffect(() => {
  //!Isso é executado apenas na montagem (quando o componente aparece)
//!}, []);

//!useEffect(() => {
  //!Isso é executado na montagem *e também* se a ou b foram alterados desde a última renderização..;
//!}, [a, b]);

/**
 * Vamos dar uma olhada no que significa "montar" na próxima etapa 
*/