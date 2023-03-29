/**
 * * ETAPA 3: ADICIONAR ESTADO AO PAI COMUM
 *
 *  Levantar o estado geralmente altera a natureza do que você está armazenando como estado.
 *
 * Neste caso, apenas um painel deve estar ativo por vez. Isso significa que o Accordion componente pai comum precisa controlar qual painel é o ativo. Em vez de um boolean valor, poderia usar um número como índice do ativo Panel para a variável de estado:
 */

//import { useState } from "react";

//const [activeIndex, setActiveIndex] = useState(0);

/**
 * Quando activeIndex for 0, o primeiro painel está ativo, e quando for 1, é o segundo.
 *
 * Clicar no botão “Mostrar” em qualquer um deles Panel precisa alterar o índice ativo em Accordion. A Panel não pode definir o activeIndex estado diretamente porque é definido dentro do arquivo Accordion. O Accordion componente precisa permitir explicitamente que o Panel componente altere seu estado passando um manipulador de eventos como um suporte:
 *
 * O <button>inside the Panelagora usará o onShowprop como seu manipulador de eventos de clique:
 */

import { useState } from "react";

type PropsPanel = {
  title: string;
  children: React.ReactNode;
  isActive: boolean;
  onShow: () => void;
};

function Panel({ title, children, isActive, onShow}: PropsPanel) {
  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? (
        <p>{children}</p>
      ) : (
        <button onClick={onShow}>Show</button>
      )}
    </section>
  );
}

export default function Accordion3() {
  //elevando o estado (state-up)
  //compartilhamento de estado entre componentes
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <h2>Almaty, Kazakhstan</h2>
      <Panel title="About" isActive={activeIndex === 0} onShow={() => setActiveIndex(0)}>
        With a population of about 2 million, Almaty is Kazakhstans largest
        city. From 1929 to 1997, it was its capital city.
      </Panel>
      <Panel title="Etymology" isActive={activeIndex === 1} onShow={() => setActiveIndex(1)}>
        The name comes from <span lang="kk-KZ">алма</span>, the Kazakh word for
        &quot;apple&ldquo; and is often translated as &quot;full of
        apples&ldquo;. In fact, the region surrounding Almaty is thought to be
        the ancestral home of the apple, and the wild{" "}
        <i lang="la">Malus sieversii</i> is considered a likely candidate for
        the ancestor of the modern domestic apple.
      </Panel>
    </>
  );
}
