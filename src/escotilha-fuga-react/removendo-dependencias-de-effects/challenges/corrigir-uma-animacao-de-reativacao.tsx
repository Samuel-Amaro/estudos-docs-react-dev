/**
 * * CORRIGIR UMA ANIMAÇÃO DE REATIVAÇÃO
 *
 *  Neste exemplo, quando você pressiona “Mostrar”, uma mensagem de boas-vindas aparece gradualmente. A animação leva um segundo. Ao pressionar “Remover”, a mensagem de boas-vindas desaparece imediatamente. A lógica da animação fade-in é implementada no animation.jsarquivo como um loop de animação JavaScript simples . Você não precisa mudar essa lógica. Você pode tratá-lo como uma biblioteca de terceiros. Seu efeito cria uma instância de FadeInAnimationpara o nó DOM e, em seguida, chama start(duration)ou stop()para controlar a animação. O durationé controlado por um controle deslizante. Ajuste o controle deslizante e veja como a animação muda.
 *
 * Este código já funciona, mas há algo que você deseja alterar. Atualmente, quando você move o controle deslizante que controla a durationvariável de estado, ele reativa a animação. Mude o comportamento para que o Efeito não “reage” à durationvariável. Quando você pressiona “Mostrar”, o Efeito deve usar o atual durationno controle deslizante. No entanto, mover o controle deslizante em si não deve reativar a animação.
 */

import { useState, useEffect, useRef } from "react";
import { experimental_useEffectEvent as useEffectEvent } from "react";
import { FadeInAnimation } from "./animation";

type PropsDuration = {
  duration: number;
};

function Welcome({ duration }: PropsDuration) {
  const ref = useRef<HTMLHeadingElement | null>(null);

  //!OBSE: API EXPERIMENTAL DO REACT, AINDA ANÃO ESTA EM UMA VERSÃO ESTAVEL PARA USO NO REACT
  const onAnimation = useEffectEvent((animation: FadeInAnimation) => {
    animation.start(duration);
  });

  useEffect(() => {
    const animation = new FadeInAnimation(ref.current as HTMLHeadElement);
    onAnimation(animation);
    return () => {
      animation.stop();
    };
  }, []);

  return (
    <h1
      ref={ref}
      style={{
        opacity: 0,
        color: "white",
        padding: 50,
        textAlign: "center",
        fontSize: 50,
        backgroundImage:
          "radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)",
      }}
    >
      Welcome
    </h1>
  );
}

export default function App() {
  const [duration, setDuration] = useState(1000);
  const [show, setShow] = useState(false);

  return (
    <>
      <label>
        <input
          type="range"
          min="100"
          max="3000"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        />
        <br />
        Fade in duration: {duration} ms
      </label>
      <button onClick={() => setShow(!show)}>{show ? "Remove" : "Show"}</button>
      <hr />
      {show && <Welcome duration={duration} />}
    </>
  );
}
