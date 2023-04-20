/**
 * * HÁ MAIS DE UMA MANEIRA DE FAZER ISSO
 *
 * Digamos que você queira implementar uma animação fade-in do zero usando a requestAnimationFrame API do navegador. Você pode começar com um efeito que configura um loop de animação. Durante cada quadro da animação, você pode alterar a opacidade do nó DOM que você mantém em um ref até atingir 1. Seu código pode começar assim:
 */

import {
  useState,
  useEffect,
  useRef,
  experimental_useEffectEvent as useEffectEvent,
} from "react";

import "./style2.css";

function Welcome() {
  const ref = useRef<HTMLHeadingElement | null>(null);

  //usando o custom hook criado
  useFadeIn(ref, 1000);

  return (
    <h1 className="welcome" ref={ref}>
      Welcome
    </h1>
  );
}

export default function AppAnimation1() {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(!show)}>{show ? "Remove" : "Show"}</button>
      <hr />
      {show && <Welcome />}
    </>
  );
}

/**
 * Para tornar o componente mais legível, você pode extrair a lógica em um useFadeIn Hook personalizado:
 */

//custom hook
function useFadeIn(
  ref: React.MutableRefObject<HTMLHeadingElement | null>,
  duration: number
) {
  //effect que configura um loop de animação,
  //sincroniza com um side effect de animação imperativa
  useEffect(() => {
    //const duration = 1000;
    const node = ref.current;

    let startTime: number | null = performance.now();
    let frameId: number | null = null;

    function onFrame(now: number) {
      if (startTime === null) return;
      const timePassed = now - startTime;
      const progress = Math.min(timePassed / duration, 1);
      onProgress(progress);
      if (progress < 1) {
        // Ainda temos mais board para pintar
        frameId = requestAnimationFrame(onFrame);
      }
    }

    function onProgress(progress: number) {
      if (node === null) return;
      node.style.opacity = String(progress);
    }

    function start() {
      onProgress(0);
      startTime = performance.now();
      frameId = requestAnimationFrame(onFrame);
    }

    function stop() {
      if (frameId === null) return;
      cancelAnimationFrame(frameId);
      startTime = null;
      frameId = null;
    }

    start();
    return () => stop();
  }, [ref, duration]);
}

/**
 * Você pode manter o useFadeIn código como está, mas também pode refatorá-lo mais. Por exemplo, você pode extrair a lógica para configurar o loop de animação em um Hook useFadeIn personalizado :useAnimationLoop
 */

//refatorando o custom hook
function useFadeIn2(
  ref: React.MutableRefObject<HTMLHeadingElement | null>,
  duration: number
) {
  const [isRunning, setIsRunning] = useState(true);

  useAnimationLoop(isRunning, (timePassed) => {
    const progress = Math.min(timePassed / duration, 1);
    if (ref.current === null) return;
    ref.current.style.opacity = String(progress);
    if (progress === 1) {
      setIsRunning(false);
    }
  });
}

//criando outro custom hook
function useAnimationLoop(
  isRunning: boolean,
  drawFrame: (timePassed: number) => void
) {
  //!OBS: API EXPERIMENTAL DO REACT, AINDA NÃO ESTAVEL EM UMA VERSÃO DO REACT
  //!effect event
  const onFrame = useEffectEvent(drawFrame);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const startTime = performance.now();
    let frameId: number | null = null;

    function tick(now: number) {
      const timePassed = now - startTime;
      onFrame(timePassed);
      frameId = requestAnimationFrame(tick);
    }

    tick(0);

    if (frameId !== null) {
      return () => cancelAnimationFrame(frameId as number);
    }

    return;
  }, [isRunning]);
}

/**
 * No entanto, você não precisava fazer isso. Assim como nas funções normais, em última análise, você decide onde traçar os limites entre as diferentes partes do seu código. Você também pode adotar uma abordagem muito diferente. Em vez de manter a lógica no Effect, você pode mover a maior parte da lógica imperativa dentro de uma classe JavaScript:
 */

export class FadeInAnimation {
  node: HTMLElement;
  duration = 0;
  startTime: number | null = 0;
  frameId: number | null = 0;

  constructor(node: HTMLElement) {
    this.node = node;
  }

  start(duration: number) {
    this.duration = duration;
    this.onProgress(0);
    this.startTime = performance.now();
    this.frameId = requestAnimationFrame(() => this.onFrame());
  }
  onFrame() {
    if (this.startTime === null) return;
    const timePassed = performance.now() - this.startTime;
    const progress = Math.min(timePassed / this.duration, 1);
    this.onProgress(progress);
    if (progress === 1) {
      this.stop();
    } else {
      // We still have more frames to paint
      this.frameId = requestAnimationFrame(() => this.onFrame());
    }
  }
  onProgress(progress: number) {
    this.node.style.opacity = String(progress);
  }
  stop() {
    if (this.frameId === null) return;
    cancelAnimationFrame(this.frameId);
    this.startTime = null;
    this.frameId = null;
    this.duration = 0;
  }
}

//refatorando o custom hook
function useFadeIn3(
  ref: React.MutableRefObject<HTMLHeadingElement | null>,
  duration: number
) {
  useEffect(() => {
    if (ref.current === null) return;
    const animation = new FadeInAnimation(ref.current);
    animation.start(duration);
    return () => {
      animation.stop();
    };
  }, [ref, duration]);
}

/**
 * Os efeitos permitem que você conecte o React a sistemas externos. Quanto mais coordenação entre efeitos for necessária (por exemplo, para encadear várias animações), mais faz sentido extrair essa lógica de efeitos e ganchos completamente como na caixa de areia acima. Então, o código que você extraiu se torna o “sistema externo”. Isso permite que seus efeitos permaneçam simples porque eles só precisam enviar mensagens para o sistema que você moveu para fora do React.
 * 
 * Os exemplos acima assumem que a lógica fade-in precisa ser escrita em JavaScript. No entanto, essa animação de fade-in específica é mais simples e muito mais eficiente de implementar com uma animação CSS simples:
 * 
 * Às vezes, você nem precisa de um Gancho!
*/